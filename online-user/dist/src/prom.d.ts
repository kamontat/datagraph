/// <reference types="node" />
import client, { Metric } from "prom-client";
interface PrometheusObject {
    [key: string]: Metric;
}
export default class Prometheus<T extends PrometheusObject> {
    private _statistic;
    static Counter(options: client.CounterConfiguration): client.Counter;
    static Gauge(options: client.GaugeConfiguration): client.Gauge;
    private _register;
    constructor(_statistic: T);
    label(labels: {
        [key: string]: any;
    }): void;
    get<K extends keyof T>(name: K): T[K];
    register(): void;
    applyDefault(): NodeJS.Timeout;
    merge(register: client.Registry): void;
    get contentType(): string;
    export(): string;
}
export {};
//# sourceMappingURL=prom.d.ts.map