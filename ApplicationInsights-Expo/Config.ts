/**
 * The config for the TelemetryClient.
 */
export class Config {
  /** A list of domains to exclude from cross-component header injection */
  public correlationHeaderExcludedDomains: string[];

  /** The id for cross-component correlation. READ ONLY. */
  public correlationId: string;

  /** The time to wait before retrying to retrieve the id for cross-component correlation (Default 30000) */
  public correlationIdRetryIntervalMs: number;

  /** A flag indicating if telemetry transmission is disabled (Default false) */
  public disableAppInsights: boolean;

  /** The ingestion endpoint to send telemetry payloads to */
  public endpointUrl: string;

  /** An identifier for your Application Insights resource */
  public instrumentationKey: string;

  /** The maximum amount of time to wait for a payload to reach maxBatchSize (Default 15000) */
  public maxBatchIntervalMs: number;

  /** The maximum number of telemetry items to include in a payload to the ingestion endpoint (Default 250) */
  public maxBatchSize: number;

  /** The percentage of telemetry items tracked that should be transmitted (Default 100) */
  public samplingPercentage: number;
}
