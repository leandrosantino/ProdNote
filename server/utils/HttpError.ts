import { logger } from './logger'
const errorCodes = {
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_SUPPORTED: 405,
  TIMEOUT: 408,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
}

interface HttpErrorInfo {
  code: keyof typeof errorCodes,
  message?: string
}

export class HttpError extends Error {
  public readonly httpStatus: number;
  public readonly code: string;

  constructor(info: HttpErrorInfo) {
    super(info.message ?? info.code)
    this.code = info.code
    this.httpStatus = errorCodes[info.code]

    logger.error(`${this.code}_${this.httpStatus} ${this.message}`)
  }
}
