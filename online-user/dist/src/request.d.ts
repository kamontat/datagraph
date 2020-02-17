/// <reference types="node" />
import https from "https";
export default class Request {
    private options;
    constructor(options: https.RequestOptions);
    make(): Promise<any>;
}
//# sourceMappingURL=request.d.ts.map