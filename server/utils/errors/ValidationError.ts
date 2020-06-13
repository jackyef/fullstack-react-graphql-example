interface ValidationErrorOpts {
  code: number;
  friendlyMessage: string;
  missingField?: string;
}

export class ValidationError extends Error {
  constructor(opts: ValidationErrorOpts, ...params: any[]) {
    super(...params);

    const { code, friendlyMessage, missingField } = opts;
    
    this.code = code;
    this.friendlyMessage = friendlyMessage; // will be used to send down as response
    this.missingField = missingField;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError);
    }

    this.name = 'ValidationError';
  }

  public code: number;
  public friendlyMessage: string;
  public missingField?: string;
}