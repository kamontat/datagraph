import client, { Metric } from "prom-client";
import Logger from "./logger";

const logger = Logger.namespace("prometheus");

interface PrometheusObject {
  [key: string]: Metric;
}

export default class Prometheus<T extends PrometheusObject> {
  public static Counter(options: client.CounterConfiguration) {
    logger.debug(`create new Counter of ${options.name}`);
    return new client.Counter(options);
  }

  public static Gauge(options: client.GaugeConfiguration) {
    logger.debug(`create new Gauge of ${options.name}`);
    return new client.Gauge(options);
  }

  private _register: client.Registry;

  constructor(private _statistic: T) {
    this._register = new client.Registry();
  }

  public label(labels: { [key: string]: any }) {
    this._register.setDefaultLabels(labels);
  }

  public get<K extends keyof T>(name: K): T[K] {
    return this._statistic[name];
  }

  public register() {
    Object.keys(this._statistic).map(k => {
      logger.debug(`register ${k} to prom register instance`);
      this._register.registerMetric(this.get(k));
    });
  }

  public applyDefault() {
    return client.collectDefaultMetrics({ register: this._register });
  }

  public merge(register: client.Registry) {
    this._register = client.Registry.merge([this._register, register]);
  }

  public get contentType(): string {
    return this._register.contentType;
  }

  public export(): string {
    return this._register.metrics();
  }
}
