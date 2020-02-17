import http from "http";

export default class Server {
  private instance: http.Server;

  constructor(listener: http.RequestListener) {
    this.instance = http.createServer(listener);
  }

  start(host: string, port: number): Promise<{ host: string; port: number }> {
    return new Promise(res => {
      this.instance.listen(port, host, () => {
        res({ host, port });
      });
    });
  }

  stop(): Promise<Error | undefined> {
    return new Promise<Error | undefined>((res, rej) => {
      this.instance.close(e => (e ? rej(e) : res()));
    });
  }
}
