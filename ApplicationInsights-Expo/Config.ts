/**
 * The config for the TelemetryClient.
 */
export class Config {
  /** A list of domains to exclude from cross-component header injection. */
  public correlationHeaderExcludedDomains: string[];

  /** The id for cross-component correlation. */
  public readonly correlationId: string;

  /** The time to wait before retrying to retrieve the id for cross-component correlation. */
  public correlationIdRetryIntervalMs: number = 30000;

  /** A flag indicating if telemetry transmission is disable. */
  public disableAppInsights: boolean = false;

  /** The ingestion endpoint to send telemetry payloads to. */
  public endpointUrl: string;

  /** An identifier for your Application Insights resource. */
  public instrumentationKey: string;

  /** The maximum amount of time to wait for a payload to reach maxBatchSize. */
  public maxBatchIntervalMs: number = 15000;

  /** The maximum number of telemetry items to include in a payload to the ingestion endpoint. */
  public maxBatchSize: number = 250;

  /** The percentage of telemetry items tracked that should be transmitted. */
  public samplingPercentage: number = 100;
}
