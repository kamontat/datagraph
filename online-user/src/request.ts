import Logger from "./logger";
import https from "https";
import { Serialization } from "./utils";

export default class Request extends Serialization {
  constructor(private options: https.RequestOptions) {
    super("Request", Logger.namespace("request"));

    this.logger.debug("  with %o", options);
  }

  make(): Promise<any> {
    return new Promise((resolve, reject) => {
      const req = https.request(this.options, res => {
        this.logger.debug(`information: code=${res.statusCode} msg=${res.statusMessage}`);

        const { statusCode } = res;
        // const contentType = res.headers["content-type"];

        let error;
        if (statusCode !== 200) {
          error = new Error("Request Failed.\n" + `Status Code: ${statusCode}`);
        }

        if (error) {
          this.logger.error(error.message);
          // Consume response data to free up memory
          res.resume();

          return reject(error);
        }

        res.setEncoding("utf8");
        let data = "";

        res.on("error", err => {
          this.logger.debug(`received error response, logging to console`);
          this.logger.error("Error: %O", err);

          return reject(err);
        });

        // A chunk of data has been recieved.
        res.on("data", chunk => {
          this.logger.debug(`received new data chunk, add to data object`);
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        res.on("end", () => {
          this.logger.debug(`received all response, running Promise resolve`);

          return resolve(data);
        });

        res.on("close", () => this.logger.debug("connection closed"));
        res.on("readable", () => this.logger.debug("receive readable events"));
      });

      req.on("error", e => {
        this.logger.error(e);
      });

      req.end();
    });
  }
}
