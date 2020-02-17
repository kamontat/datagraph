import https from "https";

export default class Request {
  constructor(private options: https.RequestOptions) {}

  make(): Promise<any> {
    return new Promise((resolve, reject) => {
      https
        .get(this.options, res => {
          let data = "";

          // A chunk of data has been recieved.
          res.on("data", chunk => {
            data += chunk;
          });

          // The whole response has been received. Print out the result.
          res.on("end", () => {
            resolve(data);
          });
        })
        .on("error", err => reject(err));
    });
  }
}
