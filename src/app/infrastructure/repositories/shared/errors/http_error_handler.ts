import { BadRequestError } from './../../../../domain/errors/bad_request_error';
import { ServerError } from './../../../../domain/errors/server_error';
import { UnauthorizedError } from './../../../../domain/errors/unauthorized_error';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

interface UnknownHttpErrorWithMessage {
  message: string;
  statusCode: HttpStatusCode;
}

export class HttpErrorHandler {
  static handle(httpError: unknown): never {
    const hasMessage = 'message' in (httpError as any);
    const hasStatusCode = 'statusCode' in (httpError as any);

    if (httpError instanceof HttpErrorResponse) {
      const error = this.mapHttpError(httpError.status, httpError.error.message);

      throw error;
    }

    if (hasMessage && hasStatusCode) {
      const errorWithMessage = httpError as UnknownHttpErrorWithMessage;

      const error = this.mapHttpError(errorWithMessage.statusCode, errorWithMessage.message);

      throw error;
    }

    throw httpError;
  }

  private static mapHttpError(statusCode: HttpStatusCode, message?: string): Error {
    switch(statusCode) {
      case HttpStatusCode.Unauthorized:
        return new UnauthorizedError(message);
      case HttpStatusCode.BadRequest:
        return new BadRequestError(message);
      default:
        return new ServerError(message);
    }
  }
}
