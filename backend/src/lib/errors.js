/** An error whose message is safe to show to the user. */
export class AppError extends Error {
  constructor(status, message, code) {
    super(message)
    this.status = status
    this.code = code
  }
}

export const badRequest = (message) => new AppError(400, message)
export const unauthorized = (message) => new AppError(401, message, 'UNAUTHORIZED')
export const forbidden = (message, code) => new AppError(403, message, code)
export const notFound = (message) => new AppError(404, message)
export const conflict = (message) => new AppError(409, message)
