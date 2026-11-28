import { afterEach, describe, expect, it, vi } from 'vitest'
import { Mess } from '../src/models/Mess.js'
import { User } from '../src/models/User.js'
import { ensureSuperAdmin } from '../src/services/accounts.js'
import { api, makeMess, makeSuperAdmin, PASSWORD } from './helpers.js'
import { useTestDatabase } from './setup.js'

useTestDatabase()

afterEach(() => {
  vi.unstubAllEnvs()
  vi.restoreAllMocks()
})

const signup = {
  messName: 'Green House',
  name: 'Rahim',
  email: 'Rahim@Test.Example',
  password: PASSWORD,
}

describe('register', () => {
  it('creates a pending mess and its admin', async () => {
    const response = await api().post('/auth/register').send(signup)
    expect(response.status).toBe(201)
    expect(response.body.token).toBeTruthy()
    expect(response.body.user).toMatchObject({ email: 'rahim@test.example', role: 'admin' })
    expect(response.body.mess).toMatchObject({ name: 'Green House', status: 'pending' })
    expect(response.body.user.passwordHash).toBeUndefined()
  })

  it('approves at once when configured to', async () => {
    vi.stubEnv('SIGNUP_AUTO_APPROVE', 'true')
    const response = await api().post('/auth/register').send(signup)
    expect(response.body.mess.status).toBe('active')
  })

  it('refuses a used email and leaves no empty mess behind', async () => {
    await api().post('/auth/register').send(signup)
    const response = await api()
      .post('/auth/register')
      .send({ ...signup, messName: 'Other' })
    expect(response.status).toBe(409)
    expect(await Mess.countDocuments()).toBe(1)
  })

  it('ignores attempts to choose a role or status', async () => {
    const response = await api()
      .post('/auth/register')
      .send({ ...signup, role: 'superadmin', status: 'active' })
    expect(response.body.user.role).toBe('admin')
    expect(response.body.mess.status).toBe('pending')
  })

  it.each([
    [{ messName: ' ' }, 'mess name'],
    [{ email: 'nope' }, 'valid email'],
    [{ password: 'short' }, '8 characters'],
  ])('rejects %o', async (change, message) => {
    const response = await api()
      .post('/auth/register')
      .send({ ...signup, ...change })
    expect(response.status).toBe(400)
    expect(response.body.error.message).toContain(message)
  })

  it('limits repeated sign ups from one address', async () => {
    const statuses = []
    for (let i = 0; i < 6; i += 1) {
      const response = await api()
        .post('/auth/register')
        .send({ ...signup, email: `person${i}@test.example` })
      statuses.push(response.status)
    }
    expect(statuses).toEqual([201, 201, 201, 201, 201, 429])
  })
})

describe('login', () => {
  it('returns a token that works', async () => {
    const { user } = await makeMess()
    const login = await api().post('/auth/login').send({ email: user.email, password: PASSWORD })
    expect(login.status).toBe(200)
    const me = await api(login.body.token).get('/auth/me')
    expect(me.body.user.email).toBe(user.email)
  })

  it('gives the same answer for a wrong password and an unknown email', async () => {
    const { user } = await makeMess()
    const wrong = await api().post('/auth/login').send({ email: user.email, password: 'x' })
    const unknown = await api()
      .post('/auth/login')
      .send({ email: 'ghost@test.example', password: 'x' })
    expect(wrong.status).toBe(401)
    expect(unknown.body).toEqual(wrong.body)
  })

  it('does not accept a query object as email', async () => {
    await makeMess()
    const response = await api()
      .post('/auth/login')
      .send({ email: { $ne: null }, password: PASSWORD })
    expect(response.status).toBe(400)
  })

  it('refuses a disabled account, including its existing login', async () => {
    const { user, token } = await makeMess()
    await User.updateOne({ _id: user._id }, { active: false })
    const login = await api().post('/auth/login').send({ email: user.email, password: PASSWORD })
    expect(login.status).toBe(403)
    expect((await api(token).get('/auth/me')).status).toBe(401)
  })

  it('blocks password guessing', async () => {
    const { user } = await makeMess()
    let response
    for (let i = 0; i < 11; i += 1) {
      response = await api().post('/auth/login').send({ email: user.email, password: 'x' })
    }
    expect(response.status).toBe(429)
    expect(response.headers['retry-after']).toBeTruthy()
  })

  it('refuses a missing or forged token', async () => {
    expect((await api().get('/auth/me')).status).toBe(401)
    expect((await api('forged.token.here').get('/auth/me')).status).toBe(401)
  })
})

describe('change password', () => {
  it('ends old logins and accepts the new password', async () => {
    const { user, token } = await makeMess()
    const changed = await api(token)
      .post('/auth/change-password')
      .send({ currentPassword: PASSWORD, newPassword: 'another-good-password' })
    expect(changed.status).toBe(200)
    expect((await api(token).get('/auth/me')).status).toBe(401)
    expect((await api(changed.body.token).get('/auth/me')).status).toBe(200)
    const login = await api()
      .post('/auth/login')
      .send({ email: user.email, password: 'another-good-password' })
    expect(login.status).toBe(200)
  })

  it('needs the current password', async () => {
    const { token } = await makeMess()
    const response = await api(token)
      .post('/auth/change-password')
      .send({ currentPassword: 'wrong', newPassword: 'another-good-password' })
    expect(response.status).toBe(400)
  })
})

describe('super admin', () => {
  it('is created once from the settings', async () => {
    vi.spyOn(console, 'log').mockImplementation(() => {})
    vi.stubEnv('SUPERADMIN_EMAIL', 'boss@test.example')
    vi.stubEnv('SUPERADMIN_PASSWORD', PASSWORD)
    await ensureSuperAdmin()
    vi.stubEnv('SUPERADMIN_EMAIL', 'second@test.example')
    await ensureSuperAdmin()
    const admins = await User.find({ role: 'superadmin' })
    expect(admins.map((u) => u.email)).toEqual(['boss@test.example'])
  })

  it('belongs to no mess', async () => {
    const { token } = await makeSuperAdmin()
    const me = await api(token).get('/auth/me')
    expect(me.body).toMatchObject({ user: { role: 'superadmin' }, mess: null })
  })
})
