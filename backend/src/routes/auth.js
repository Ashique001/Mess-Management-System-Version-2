import { Router } from 'express'
import { z } from 'zod'
import { getConfig } from '../config.js'
import { AppError, badRequest, forbidden } from '../lib/errors.js'
import { hashPassword, verifyPassword } from '../lib/passwords.js'
import { signToken } from '../lib/tokens.js'
import { email, newPassword, optionalText, requiredText, validate } from '../lib/validate.js'
import { sessionView } from '../lib/views.js'
import { authenticate } from '../middleware/auth.js'
import { rateLimit } from '../middleware/rateLimit.js'
import { Mess } from '../models/Mess.js'
import { User } from '../models/User.js'
import { createMessWithAdmin } from '../services/accounts.js'

const registerSchema = z.object({
  messName: requiredText('the mess name', 100),
  address: optionalText('address', 200),
  phone: optionalText('phone number', 20),
  name: requiredText('your name', 100),
  email,
  password: newPassword,
})

const loginSchema = z.object({
  email,
  password: z.string({ error: 'Please enter your password.' }).min(1, 'Please enter your password.'),
})

const changePasswordSchema = z.object({
  currentPassword: z.string({ error: 'Please enter your current password.' }),
  newPassword,
})

const signupLimit = rateLimit({ name: 'signup', max: 5, windowMinutes: 60 })
const loginLimitByVisitor = rateLimit({ name: 'login-ip', max: 50, windowMinutes: 15 })
const loginLimitByAccount = rateLimit({
  name: 'login-account',
  max: 10,
  windowMinutes: 15,
  keyOf: (req) => `${req.ip}:${String(req.body?.email).trim().toLowerCase().slice(0, 254)}`,
})
const passwordLimit = rateLimit({
  name: 'password',
  max: 10,
  windowMinutes: 15,
  keyOf: (req) => String(req.user._id),
})

const startSession = (res, user, mess, status = 200) =>
  res.status(status).json({ token: signToken(user), ...sessionView(user, mess) })

export const authRouter = Router()

/** A new mess signs itself up. Its creator becomes the mess admin. */
authRouter.post('/register', signupLimit, async (req, res) => {
  const input = validate(registerSchema, req.body)
  const status = getConfig().signupAutoApprove ? 'active' : 'pending'
  const { mess, user } = await createMessWithAdmin(
    { name: input.messName, address: input.address, phone: input.phone, status },
    { name: input.name, email: input.email, password: input.password },
  )
  startSession(res, user, mess, 201)
})

authRouter.post('/login', loginLimitByVisitor, loginLimitByAccount, async (req, res) => {
  const input = validate(loginSchema, req.body)
  const user = await User.findOne({ email: input.email }).select('+passwordHash')
  if (!(await verifyPassword(input.password, user?.passwordHash))) {
    throw new AppError(401, 'Email or password is incorrect.', 'INVALID_LOGIN')
  }
  if (!user.active) throw forbidden('This account has been disabled.', 'ACCOUNT_DISABLED')

  user.lastLoginAt = new Date()
  await user.save()
  const mess = user.messId ? await Mess.findById(user.messId) : null
  startSession(res, user, mess)
})

authRouter.get('/me', authenticate, (req, res) => {
  res.json(sessionView(req.user, req.mess))
})

/** Changes the password and ends every other login of this user. */
authRouter.post('/change-password', authenticate, passwordLimit, async (req, res) => {
  const input = validate(changePasswordSchema, req.body)
  const user = await User.findById(req.user._id).select('+passwordHash')
  if (!(await verifyPassword(input.currentPassword, user.passwordHash))) {
    throw badRequest('Your current password is incorrect.')
  }
  if (input.currentPassword === input.newPassword) {
    throw badRequest('Please choose a different password.')
  }
  user.passwordHash = await hashPassword(input.newPassword)
  user.tokenVersion += 1
  await user.save()
  startSession(res, user, req.mess)
})
