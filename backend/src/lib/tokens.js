import jwt from 'jsonwebtoken'
import { getConfig } from '../config.js'

const ALGORITHM = 'HS256'

export function signToken(user) {
  const { jwtSecret, jwtExpiresIn } = getConfig()
  return jwt.sign({ v: user.tokenVersion }, jwtSecret, {
    algorithm: ALGORITHM,
    expiresIn: jwtExpiresIn,
    subject: String(user._id),
  })
}

export const verifyToken = (token) =>
  jwt.verify(token, getConfig().jwtSecret, { algorithms: [ALGORITHM] })
