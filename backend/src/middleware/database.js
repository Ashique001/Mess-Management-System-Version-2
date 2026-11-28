import { configProblems, getConfig } from '../config.js'
import { connectDb } from '../db.js'
import { AppError } from '../lib/errors.js'

/** Makes sure the settings are complete and the database is connected. */
export async function requireDatabase(req, res, next) {
  const config = getConfig()
  const problems = configProblems(config)
  if (problems.length) {
    console.error(`Server is not configured: ${problems.join(' ')}`)
    throw new AppError(503, 'The server is not configured yet.', 'NOT_CONFIGURED')
  }
  try {
    await connectDb(config.mongodbUri)
  } catch (error) {
    console.error('Database connection failed:', error.message)
    throw new AppError(503, 'The database is not reachable. Please try again.', 'DATABASE_DOWN')
  }
  next()
}
