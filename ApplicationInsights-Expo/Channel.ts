import { Config } from "./Config";
import { FlushOptions } from "./index";
import { Contracts } from "./ports";

export class Channel {
  private readonly config: Config;

  public constructor(config: Config) {
    this.config = config;
  }

  /**
   * Immediately send all queued envelopes to service endpoint.
   */
  // tslint:disable-next-line:prefer-function-over-method
  public flush(options: FlushOptions): void {
    // @todo FIXME
  }

  /**
   * Add a telemetry item to the send buffer
   */
  // tslint:disable-next-line:prefer-function-over-method
  public send(envelope: Contracts.Envelope): void {
    // @todo FIXME
  }
}
