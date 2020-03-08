import Request from "./request";
import Server from "./server";
import Logger, { _Logger } from "./logger";
import { T, O } from "./utils";
import Prometheus from "./prom";
import Parser from "./parser";

const pjson = require("../package.json");

// Logger.enableAll();

const logger = Logger.namespace("server");
logger.debug("Starting application...");
logger.debug(JSON.stringify(pjson));

interface RequestData {
  host: string;
  path: string;
  auth: {
    username: string;
    password: string;
  };
}

const production: RequestData = {
  host: O.ption(process.env.PAYMENTPLUS_HOST).getOrElse("paymentplus.heroapp.dev"),
  path: O.ption(process.env.PAYMENTPLUS_PATH).getOrElse("/api/online-users/?format=json"),
  auth: {
    username: O.ption(process.env.PAYMENTPLUS_AUTH_USERNAME).getOrElse("admin"),
    password: O.ption(process.env.PAYMENTPLUS_AUTH_PASSWORD).getOrElse("admin")
  }
};

const staging: RequestData = {
  host: O.ption(process.env.PAYMENTPLUS_STAGING_HOST).getOrElse("paymentplus.heroapp.dev"),
  path: O.ption(process.env.PAYMENTPLUS_STAGING_PATH).getOrElse("/api/online-users/?format=json"),
  auth: {
    username: O.ption(process.env.PAYMENTPLUS_STAGING_AUTH_USERNAME).getOrElse("admin"),
    password: O.ption(process.env.PAYMENTPLUS_STAGING_AUTH_PASSWORD).getOrElse("admin")
  }
};

const host = O.ption(process.env.HOST).getOrElse("0.0.0.0");
const port = T.ry(() => parseInt(O.ption(process.env.PORT).getOrElse(""))).getOrElse(1234);

const prom = new Prometheus({
  paymentplus_online_user: Prometheus.Gauge({
    name: "paymentplus_online_user_count",
    help: "currently online user in paymentplus",
    labelNames: ["env"]
  }),
  paymentplus_error: Prometheus.Gauge({
    name: "paymentplus_system_failure",
    help: "paymentplus system failure",
    labelNames: ["env"]
  })
});

const timeout = prom.applyDefault();
prom.label({ appversion: pjson.version, appname: pjson.name });
prom.register();

const server = new Server((req, res) => {
  if (req.url !== "/metrics" && req.url !== "/") {
    logger.warn(`Seem someone called ${req.url} path`);
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end(`Not found`);
    return;
  }

  const request = new Request({
    hostname: `${production.host}`,
    path: `${production.path}`,
    auth: `${production.auth.username}:${production.auth.password}`
  });

  const requestStaging = new Request({
    hostname: `${staging.host}`,
    path: `${staging.path}`,
    auth: `${staging.auth.username}:${staging.auth.password}`
  });

  const prodPromise = request.make();
  const stagPromise = requestStaging.make();

  return Promise.all([prodPromise, stagPromise])
    .then(values => {
      const prod = values[0];
      const stag = values[1];

      T.ry(() => {
        const parser = new Parser(logger);

        const production = parser.parse(prod, "paymentplus production");
        const staging = parser.parse(stag, "paymentplus staging");

        prom.get("paymentplus_online_user").set({ env: "production" }, production.user.count, new Date());
        prom.get("paymentplus_error").set({ env: "production" }, production.status ? 0 : 1, new Date());

        prom.get("paymentplus_online_user").set({ env: "staging" }, staging.user.count, new Date());
        prom.get("paymentplus_error").set({ env: "staging" }, staging.status ? 0 : 1, new Date());

        res.writeHead(200, { "Content-Type": prom.contentType });
        res.end(prom.export());
      }).catch(() => {
        res.writeHead(200, { "Content-Type": prom.contentType });
        res.end(prom.export());
      });
    })
    .catch(e => {
      logger.error(e);
      res.writeHead(200, { "Content-Type": prom.contentType });
      res.end(prom.export());
    });
});

server.start(host, port).then(({ host, port }) => {
  logger.info(`Start application at http://${host}:${port}`);
});

process.on("SIGINT", function() {
  logger.debug("Stoping application...");

  clearInterval(timeout);
  server
    .stop()
    .then(() => {
      logger.info("Stop application");
      process.exit(0);
    })
    .catch(e => {
      logger.error(e);
      process.exit(1);
    });
});
