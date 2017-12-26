import { Config } from "./Config";
import { Contracts } from "./ports";

export interface IServiceResponseError {
  /**
   * The index in the original payload of the item.
   */
  index: number;

  /**
   * The error message.
   */
  message: string;

  // tslint:disable:max-line-length
  /**
   * The item specific HTTP Response status code.
   * @see https://github.com/Microsoft/ApplicationInsights-Home/blob/master/EndpointSpecs/ENDPOINT-PROTOCOL.md#response-status-codes
   */
  statusCode: number;
  // tslint:enable:max-line-length
}

export interface IServiceResponse {
  /**
   * List of errors for items which were not accepted
   */
  errors: IServiceResponseError[];

  /**
   * Number of items successfully accepted by the service.
   */
  itemsAccepted: number;

  /**
   * Number of items received by the service.
   */
  itemsReceived: number;
}

export class Sender {
  /**
   * The amount of time the SDK will wait between re-sending cached data. This buffer is to avoid any throttling from
   * the service side.
   */
  public resendInterval: number = 60 * 1000; // tslint:disable-line:no-magic-numbers

  private readonly config: Config;

  public constructor(config: Config) {
    this.config = config;
  }

  /**
   * Send the envelope to the service endpoint.
   */
  // tslint:disable-next-line:prefer-function-over-method
  public send(envelopes: Contracts.Envelope[], callback?: (response: string) => void): void {
    // @todo FIXME
  }
}
