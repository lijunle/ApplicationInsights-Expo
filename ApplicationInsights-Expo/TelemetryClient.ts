import { Channel } from "./Channel";
import { Config } from "./Config";
import { Context, Contracts, FlushOptions, Logging } from "./ports";
import * as Util from "./Util";

// tslint:disable-next-line:no-any
export type TelemetryProcessor = (envelope: Contracts.Envelope, contextObjects?: { [name: string]: any }) => boolean;

/**
 * Application Insights telemetry client provides interface to track telemetry items, register telemetry initializers
 * and manually trigger immediate sending (flushing)
 */
export class TelemetryClient {
  /** Custom properties to be included with all events. */
  public readonly commonProperties: { [key: string]: string };

  /** Config for advanced scenarios. */
  public readonly config: Config;

  /** The context for TelemetryClient. */
  public readonly context: Context;

  private readonly channel: Channel;

  /** The telemetry processors. */
  private telemetryProcessors: TelemetryProcessor[] = [];

  /**
   * Constructs a new client of the client.
   * @param instrumentationKey The instrumentation key to use. It will read from environment variable if not specified.
   */
  public constructor(instrumentationKey?: string) {
    this.config = new Config();
    this.commonProperties = {};
    this.channel = new Channel(this.config);
  }

  /**
   * Adds telemetry processor to the collection. Telemetry processors will be called one by one before telemetry item is
   * pushed for sending and in the order they were added.
   * @param telemetryProcessor A function takes Envelope, and optional context object and returns boolean.
   */
  public addTelemetryProcessor(telemetryProcessor: TelemetryProcessor): void {
    this.telemetryProcessors.push(telemetryProcessor);
  }

  /**
   * Removes all telemetry processors.
   */
  public clearTelemetryProcessors(): void {
    this.telemetryProcessors = [];
  }

  /**
   * Immediately send all queued telemetry.
   * @param options Flush options, including indicator whether app is crashing and callback
   */
  public flush(options?: FlushOptions): void {
    this.channel.flush(options || { isAppCrashing: false, callback: undefined });
  }

  /**
   * Generic track method for all telemetry types.
   * @param data The telemetry to send.
   * @param telemetryType Specify the type of telemetry you are tracking from the list of Contracts.DataTypes.
   */
  // tslint:disable-next-line:prefer-function-over-method
  public track(telemetry: Contracts.Telemetry, telemetryType: Contracts.TelemetryType): void {
    if (telemetry && Contracts.telemetryTypeToBaseType(telemetryType)) {
      /* @todo FIXME
      const envelope: Contracts.Envelope = EnvelopeFactory.createEnvelope(
        telemetry, telemetryType, this.commonProperties, this.context, this.config);

      // Set time on the envelope if it was set on the telemetry item
      if (telemetry.time) {
        envelope.time = telemetry.time.toISOString();
      }

      let accepted = this.runTelemetryProcessors(envelope, telemetry.contextObjects);

      // Ideally we would have a central place for "internal" telemetry processors and users can configure which ones
      // are in use. This will do for now. Otherwise clearTelemetryProcessors() would be problematic.
      accepted = accepted && TelemetryProcessors.samplingTelemetryProcessor(
        envelope,
        { correlationContext: CorrelationContextManager.getCurrentContext() }
      );

      if (accepted) {
        this.channel.send(envelope);
      }
      */
    } else {
      Logging.warn("track() requires telemetry object and telemetryType to be specified.");
    }
  }

  /**
   * Log a dependency. Note that the default client will attempt to collect dependencies automatically so only use this
   * for dependencies that aren't automatically captured or if you've disabled automatic dependency collection.
   * @param telemetry Object encapsulating tracking option.
   */
  public trackDependency(telemetry: Contracts.DependencyTelemetry): void {
    if (telemetry && !telemetry.target && telemetry.data) {
      telemetry.target = Util.getHostname(telemetry.data);
    }

    this.track(telemetry, Contracts.TelemetryType.Dependency);
  }

  /**
   * Log a user action or other occurrence.
   * @param telemetry Object encapsulating tracking options.
   */
  public trackEvent(telemetry: Contracts.EventTelemetry): void {
    this.track(telemetry, Contracts.TelemetryType.Event);
  }

  /**
   * Log an exception.
   * @param telemetry Object encapsulating tracking options.
   */
  public trackException(telemetry: Contracts.ExceptionTelemetry): void {
    if (telemetry && telemetry.exception && !Util.isError(telemetry.exception)) {
      telemetry.exception = new Error(telemetry.exception.toString());
    }

    this.track(telemetry, Contracts.TelemetryType.Exception);
  }

  /**
   * Log a numeric value that is not associated with a specific event. Typically used to send regular reports of
   * performance indicators. To send a single measurement, use just the first two parameters. If you take measurements
   * very frequently, you can reduce the telemetry bandwidth by aggregating multiple measurements and sending the
   * resulting average at intervals.
   * @param telemetry Object encapsulating tracking options.
   */
  public trackMetric(telemetry: Contracts.MetricTelemetry): void {
    this.track(telemetry, Contracts.TelemetryType.Metric);
  }

  /**
   * Log a request. Note that the default client will attempt to collect HTTP requests automatically so only use this
   * for requests that aren't automatically captured or if you've disabled automatic request collection.
   * @param telemetry Object encapsulating tracking options.
   */
  public trackRequest(telemetry: Contracts.RequestTelemetry): void {
    this.track(telemetry, Contracts.TelemetryType.Request);
  }

  /**
   * Log a trace message.
   * @param telemetry Object encapsulating tracking options.
   */
  public trackTrace(telemetry: Contracts.TraceTelemetry): void {
    this.track(telemetry, Contracts.TelemetryType.Trace);
  }
}
