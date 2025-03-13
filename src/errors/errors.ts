export class BaseError extends Error {
  public readonly context?: string;
  constructor(message: string, options: { cause?: Error; context?: string } = {}) {
    const { cause, context } = options;

    super(message, { cause });

    this.name = this.constructor.name;
    this.context = context;
  }
}

export class NetworkError extends BaseError {
  public readonly httpCode: number;
  constructor(
    message: string,
    options: { cause?: Error; context?: string } = {},
    httpCode: number
  ) {
    super(message, options);
    this.httpCode = httpCode;
  }
}
