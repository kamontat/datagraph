import Request from "./request";
import Server from "./server";
import Logger, { _Logger } from "./logger";
import { T, O } from "./utils";
import Prometheus from "./prom";

const pjson = require("../package.json");

// Logger.enableAll();

const logger = Logger.namespace("server");
logger.debug("Starting application...");
logger.debug(JSON.stringify(pjson));

const paymentplus_host = O.ption(process.env.PAYMENTPLUS_HOST).getOrElse("paymentplus.heroapp.dev");
const paymentplus_path = O.ption(process.env.PAYMENTPLUS_PATH).getOrElse("/api/online-users/?format=json");
const paymentplus_auth_username = O.ption(process.env.PAYMENTPLUS_AUTH_USERNAME).getOrElse("admin");
const paymentplus_auth_password = O.ption(process.env.PAYMENTPLUS_AUTH_PASSWORD).getOrElse("password");

const host = O.ption(process.env.HOST).getOrElse("0.0.0.0");
const port = T.ry(() => parseInt(O.ption(process.env.PORT).getOrElse(""))).getOrElse(1234);

const prom = new Prometheus({
  paymentplus_online_user: Prometheus.Gauge({
    name: "paymentplus_online_user_count",
    help: "currently online user in paymentplus"
  }),
  paymentplus_error: Prometheus.Gauge({
    name: "paymentplus_system_failure",
    help: "paymentplus system failure"
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
    hostname: `${paymentplus_host}`,
    path: `${paymentplus_path}`,
    auth: `${paymentplus_auth_username}:${paymentplus_auth_password}`
  });

  request.make().then(data => {
    T.ry(() => {
      const trycatch = T.ry(() => JSON.parse(data));
      const response: { count: number } = trycatch.getOrElse({ count: 0 });
      const error = trycatch.failed() ? 1 : 0;

      if (error === 1) logger.error("received error report from paymentplus service");

      prom.get("paymentplus_online_user").set(response.count, new Date());
      prom.get("paymentplus_error").set(error, new Date());

      res.writeHead(200, { "Content-Type": prom.contentType });
      res.end(prom.export());
    }).catch(() => {
      res.writeHead(200, { "Content-Type": prom.contentType });
      res.end(prom.export());
    });
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
