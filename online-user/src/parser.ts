import { T } from "./utils";
import { _Logger } from "./logger";

export interface PaymentPlusParserResponse {
  status: boolean;
  user: {
    count: number;
  };
}

export default class PaymentPlusParser {
  constructor(private logger: _Logger) {}

  parse(data: any, name: string): PaymentPlusParserResponse {
    this.logger.debug(`${name} raw response is ${data}`);

    const trycatch = T.ry(() => JSON.parse(data));
    const response: { count: number; detail?: string } = trycatch.getOrElse({ count: 0 });
    const error = trycatch.failed();

    if (error) this.logger.error(`cannot parse data from ${name}`);
    else this.logger.debug(`${name} current data is %o`, response);

    if (response.detail) {
      this.logger.error(`${name} response contains error: ${response.detail}`);
      response.count = 0;
    }

    return {
      status: !error,
      user: {
        count: response.count
      }
    };
  }
}
