/// <reference types="node" />
import https from "https";
import { Serialization } from "./utils";
export default class Request extends Serialization {
    private options;
    constructor(options: https.RequestOptions);
    make(): Promise<any>;
}
//# sourceMappingURL=request.d.ts.map