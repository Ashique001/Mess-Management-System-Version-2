import { AppError } from '../lib/errors.js'

export function notFoundHandler(req) {
  throw new AppError(404, `No such address: ${req.method} ${req.path}`)
}

/** What to tell the client about an error, or null if it is unexpected. */
function describe(error) {
  if (error instanceof AppError) {
    return { status: error.status, message: error.message, code: error.code }
  }
  if (error.type === 'entity.parse.failed') {
    return { status: 400, message: 'The request body is not valid JSON.' }
  }
  if (error.type === 'entity.too.large') {
    return { status: 413, message: 'The request is too large.' }
  }
  if (error.code === 11000) {
    return { status: 409, message: 'This record already exists.' }
  }
  if (error.name === 'CastError' || error.name === 'ValidationError') {
    return { status: 400, message: 'Some of the information is not valid.' }
  }
  if (error.status >= 400 && error.status < 500) {
    return { status: error.status, message: 'The request could not be processed.' }
  }
  return null
}

// Express recognises an error handler by its four arguments.
// eslint-disable-next-line no-unused-vars
export function errorHandler(error, req, res, next) {
  const known = describe(error)
  if (!known) console.error(`${req.method} ${req.path} failed:`, error)
  const { status, message, code } = known ?? {
    status: 500,
    message: 'Something went wrong. Please try again.',
  }
  res.status(status).json({ error: { message, code } })
}
