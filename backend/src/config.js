// All settings come from environment variables. See .env.example.

import { randomBytes } from 'node:crypto'

// Outside production a missing secret is replaced by a random one, so logins
// simply end when the server restarts.
const developmentSecret = randomBytes(48).toString('hex')

const list = (text) =>
  text
    .split(',')
    .map((item) => item.trim().replace(/\/+$/, ''))
    .filter(Boolean)

export function getConfig(env = process.env) {
  const isProduction = env.NODE_ENV === 'production'
  return {
    isProduction,
    isTest: env.NODE_ENV === 'test',
    port: Number(env.PORT) || 5000,
    mongodbUri: env.MONGODB_URI?.trim() ?? '',
    jwtSecret: env.JWT_SECRET || (isProduction ? '' : developmentSecret),
    jwtExpiresIn: env.JWT_EXPIRES_IN?.trim() || '7d',
    corsOrigins: list(env.CORS_ORIGIN ?? (isProduction ? '' : 'http://localhost:5173')),
  }
}

/** Settings without which the API cannot work. */
export function configProblems(config = getConfig()) {
  const problems = []
  if (!config.mongodbUri) problems.push('MONGODB_URI is not set.')
  if (config.jwtSecret.length < 32) problems.push('JWT_SECRET must be at least 32 characters.')
  return problems
}
