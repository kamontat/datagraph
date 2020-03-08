import Logger, { _Logger } from "./logger";
import uuid from "uuid";

const _logger = Logger.namespace("utils");

export class Serialization {
  private __uuid: string;

  constructor(private __name: string = "Serialization", protected logger: _Logger = _logger) {
    this.__uuid = uuid.v4().slice(0, 8);

    this.logger = Logger.append(logger, this.__uuid);

    this.logger.debug(`create ${__name} instance...`);
  }

  protected get name() {
    return this.__name;
  }

  protected get uuid() {
    return this.__uuid;
  }
}

export class O<T> extends Serialization {
  public static ption<T>(t: T | undefined) {
    return new O<T>(t);
  }

  constructor(private t: T | undefined) {
    super("Option");
    this.logger.debug(`  create option with ${t}`);
  }

  getOrElse(t: T): T {
    if (this.t === undefined) {
      this.logger.debug(`is 'undefined' so falling back to default (${t})`);
      return t;
    } else if (this.t === null) {
      this.logger.debug(`${this.name} is 'null' so falling back to default (${t})`);
      return t;
    } else if (typeof this.t === "number" && isNaN(this.t as any)) {
      this.logger.debug(`${this.name} is 'NaN' so falling back to default (${t})`);
      return t;
    } else {
      this.logger.debug(`${this.name} is exist`);
      return this.t;
    }
  }
}

type Fn<R> = () => R;

export class T<R> extends Serialization {
  public static ry<R>(fn: Fn<R | undefined>) {
    return new T<R>(fn);
  }

  private _returnData?: R;
  private _failed: boolean;

  constructor(private fn: Fn<R | undefined>) {
    super("Try");
    this.logger.debug(`  create try catch object`);

    this._failed = false; // default value
  }

  private __process(r?: R) {
    if (this._returnData) return;

    try {
      const result = this.fn();
      this.logger.debug(`is successful run`);
      this._returnData = result;
      this._failed = false;
    } catch (e) {
      this._failed = true;
      this.logger.warn(`catching some error\n %O`, e);
      this._returnData = r;
    }
  }

  failed(): boolean {
    this.__process();
    return this._failed;
  }

  getOrElse(r: R): R {
    this.__process(r);
    return O.ption(this._returnData).getOrElse(r);
  }

  catch(fn: Fn<R>) {
    this.__process();
    if (this._failed) return fn();
    else return this._returnData as R;
  }
}
