import { _Logger } from "./logger";
export interface PaymentPlusParserResponse {
    status: boolean;
    user: {
        count: number;
    };
}
export default class PaymentPlusParser {
    private logger;
    constructor(logger: _Logger);
    parse(data: any, name: string): PaymentPlusParserResponse;
}
//# sourceMappingURL=parser.d.ts.map