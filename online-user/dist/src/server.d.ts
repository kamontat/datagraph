/// <reference types="node" />
import http from "http";
export default class Server {
    private instance;
    constructor(listener: http.RequestListener);
    start(host: string, port: number): Promise<{
        host: string;
        port: number;
    }>;
    stop(): Promise<Error | undefined>;
}
//# sourceMappingURL=server.d.ts.map