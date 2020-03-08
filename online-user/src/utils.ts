import Logger from "./logger";
import uuid from "uuid";

const logger = Logger.namespace("utils");

export class Serialization {
  private __uuid: string;

  constructor(private __name: string = "Serialization") {
    this.__uuid = uuid.v4().slice(0, 8);
    logger.debug(`create ${__name}[${this.__uuid}] instance...`);
  }

  protected get object() {
    return `${this.name}[${this.uuid}]`;
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
    logger.debug(`  create option with ${t}`);
  }

  getOrElse(t: T): T {
    if (this.t === undefined) {
      logger.debug(`${this.object} is 'undefined' so falling back to default (${t})`);
      return t;
    } else if (this.t === null) {
      logger.debug(`${this.object} is 'null' so falling back to default (${t})`);
      return t;
    } else if (typeof this.t === "number" && isNaN(this.t as any)) {
      logger.debug(`${this.object} is 'NaN' so falling back to default (${t})`);
      return t;
    } else {
      logger.debug(`${this.object} is exist`);
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
    logger.debug(`  create try catch object`);

    this._failed = false; // default value
  }

  private __process(r?: R) {
    if (this._returnData) return;

    try {
      const result = this.fn();
      logger.debug(`${this.object} is successful run`);
      this._returnData = result;
      this._failed = false;
    } catch (e) {
      this._failed = true;
      logger.warn(`${this.object} catching some error\n %O`, e);
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
