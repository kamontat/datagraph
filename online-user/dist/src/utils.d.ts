import { _Logger } from "./logger";
export declare class Serialization {
    private __name;
    protected logger: _Logger;
    private __uuid;
    constructor(__name?: string, logger?: _Logger);
    protected get name(): string;
    protected get uuid(): string;
}
export declare class O<T> extends Serialization {
    private t;
    static ption<T>(t: T | undefined): O<T>;
    constructor(t: T | undefined);
    getOrElse(t: T): T;
}
declare type Fn<R> = () => R;
export declare class T<R> extends Serialization {
    private fn;
    static ry<R>(fn: Fn<R | undefined>): T<R>;
    private _returnData?;
    private _failed;
    constructor(fn: Fn<R | undefined>);
    private __process;
    failed(): boolean;
    getOrElse(r: R): R;
    catch(fn: Fn<R>): R;
}
export {};
//# sourceMappingURL=utils.d.ts.map