// Shortcuts for building test situations through the real API and services.

import request from 'supertest'
import app from '../src/app.js'
import { signToken } from '../src/lib/tokens.js'
import { createMessWithAdmin, createUser, saveSuperAdmin } from '../src/services/accounts.js'

export const PASSWORD = 'correct-horse-battery'

/** Calls the API, logged in when a token is given: api(token).get('/auth/me') */
export const api = (token) => {
  const call = (method) => (path) => {
    const pending = request(app)[method](`/api${path}`)
    return token ? pending.set('Authorization', `Bearer ${token}`) : pending
  }
  return {
    get: call('get'),
    post: call('post'),
    put: call('put'),
    patch: call('patch'),
    delete: call('delete'),
  }
}

let counter = 0

/** A mess with its admin and a token for that admin. */
export async function makeMess({ status = 'active', ...settings } = {}) {
  counter += 1
  const { mess, user } = await createMessWithAdmin(
    { name: `Mess ${counter}`, status, ...settings },
    { name: `Admin ${counter}`, email: `admin${counter}@test.example`, password: PASSWORD },
  )
  return { mess, user, token: signToken(user) }
}

export async function makeManager(mess) {
  counter += 1
  const user = await createUser({
    name: `Manager ${counter}`,
    email: `manager${counter}@test.example`,
    password: PASSWORD,
    role: 'manager',
    messId: mess._id,
  })
  return { user, token: signToken(user) }
}

export async function makeSuperAdmin() {
  const user = await saveSuperAdmin({
    name: 'Owner',
    email: 'owner@test.example',
    password: PASSWORD,
  })
  return { user, token: signToken(user) }
}
