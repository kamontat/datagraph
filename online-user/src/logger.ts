import debug from "debug";

export class _Logger {
  public static get ROOT_NAMESPACE() {
    return "onuser";
  }

  public static get NAMESPACE_SEPERATOR() {
    return ":";
  }

  private namespace: string;

  private _debug?: debug.Debugger;
  private _info?: debug.Debugger;
  private _warn?: debug.Debugger;
  private _error?: debug.Debugger;

  constructor(...namespaces: string[]) {
    this.namespace = [_Logger.ROOT_NAMESPACE].concat(...namespaces).join(_Logger.NAMESPACE_SEPERATOR);
  }

  debug(format: any, ...msg: any[]) {
    if (!this._debug) {
      this._debug = debug(this.namespace.concat(_Logger.NAMESPACE_SEPERATOR, "debug"));
      this._debug.log = console.debug.bind(console);
    }

    this._debug(format, ...msg);
  }

  info(format: any, ...msg: any[]) {
    if (!this._info) {
      this._info = debug(this.namespace.concat(_Logger.NAMESPACE_SEPERATOR, "info"));
      this._info.log = console.info.bind(console);
    }

    this._info(format, ...msg);
  }

  warn(format: any, ...msg: any[]) {
    if (!this._warn) {
      this._warn = debug(this.namespace.concat(_Logger.NAMESPACE_SEPERATOR, "warn"));
      this._warn.log = console.warn.bind(console);
    }

    this._warn(format, ...msg);
  }

  error(format: any, ...msg: any[]) {
    if (!this._error) {
      this._error = debug(this.namespace.concat(_Logger.NAMESPACE_SEPERATOR, "error"));
      this._error.log = console.error.bind(console);
    }

    this._error(format, ...msg);
  }
}

export default class Logger {
  public static namespace(...name: string[]) {
    return new _Logger(...name);
  }

  public static enableAll() {
    debug.enable(`${_Logger.ROOT_NAMESPACE}${_Logger.NAMESPACE_SEPERATOR}*`);
  }
}
