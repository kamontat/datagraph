export declare class _Logger {
    static get ROOT_NAMESPACE(): string;
    static get NAMESPACE_SEPERATOR(): string;
    private _namespace;
    private _fullNamespace;
    private _debug?;
    private _info?;
    private _warn?;
    private _error?;
    constructor(...namespaces: string[]);
    get namespace(): string;
    get fullNamespace(): string;
    debug(format: any, ...msg: any[]): void;
    info(format: any, ...msg: any[]): void;
    warn(format: any, ...msg: any[]): void;
    error(format: any, ...msg: any[]): void;
}
export default class Logger {
    static namespace(...name: string[]): _Logger;
    static append(logger: _Logger, ...name: string[]): _Logger;
    static enableAll(): void;
}
//# sourceMappingURL=logger.d.ts.map