import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Member } from '../src/models/Member.js'
import { Mess } from '../src/models/Mess.js'
import { User } from '../src/models/User.js'
import { api, makeManager, makeMess, makeSuperAdmin, PASSWORD } from './helpers.js'
import { useTestDatabase } from './setup.js'

useTestDatabase()

let owner

beforeEach(async () => {
  owner = api((await makeSuperAdmin()).token)
})

const login = (email, password = PASSWORD) =>
  api().post('/auth/login').send({ email, password })

describe('access', () => {
  it('is for the super admin only', async () => {
    const { mess, token } = await makeMess()
    const manager = await makeManager(mess)
    for (const client of [api(token), api(manager.token)]) {
      expect((await client.get('/platform/messes')).status).toBe(403)
      expect((await client.patch(`/platform/messes/${mess._id}`).send({})).status).toBe(403)
    }
    expect((await api().get('/platform/stats')).status).toBe(401)
  })
})

describe('messes', () => {
  it('counts and lists them with admin and members', async () => {
    const { mess, token } = await makeMess()
    await makeMess({ status: 'pending' })
    await api(token).post('/members').send({ name: 'Arif' })

    const stats = await owner.get('/platform/stats')
    expect(stats.body).toEqual({
      messes: { total: 2, pending: 1, active: 1, suspended: 0 },
      activeMembers: 1,
      users: 2,
    })

    const pending = await owner.get('/platform/messes?status=pending')
    expect(pending.body.total).toBe(1)

    const search = await owner.get(`/platform/messes?search=${encodeURIComponent(mess.name)}`)
    expect(search.body.items[0]).toMatchObject({
      activeMembers: 1,
      admin: { name: expect.any(String) },
    })
  })

  it('treats search text as plain text', async () => {
    await makeMess()
    const response = await owner.get(`/platform/messes?search=${encodeURIComponent('.*(')}`)
    expect(response.status).toBe(200)
    expect(response.body.total).toBe(0)
  })

  it('creates an active mess whose admin can log in', async () => {
    const response = await owner.post('/platform/messes').send({
      messName: 'Lake View',
      name: 'Karim',
      email: 'karim@test.example',
      password: PASSWORD,
      memberLimit: 12,
    })
    expect(response.status).toBe(201)
    expect(response.body).toMatchObject({ status: 'active', memberLimit: 12 })
    expect((await login('karim@test.example')).body.user.role).toBe('admin')
  })

  it('approves and suspends, taking effect at once', async () => {
    const { mess, token } = await makeMess({ status: 'pending' })
    const client = api(token)
    expect((await client.get('/members')).status).toBe(403)

    await owner.patch(`/platform/messes/${mess._id}`).send({ status: 'active' })
    expect((await client.get('/members')).status).toBe(200)

    await owner.patch(`/platform/messes/${mess._id}`).send({ status: 'suspended' })
    expect((await client.get('/members')).body.error.code).toBe('MESS_SUSPENDED')
  })

  it('rejects empty or unknown changes', async () => {
    const { mess } = await makeMess()
    const path = `/platform/messes/${mess._id}`
    expect((await owner.patch(path).send({})).status).toBe(400)
    expect((await owner.patch(path).send({ status: 'gone' })).status).toBe(400)
    expect((await owner.patch(path).send({ memberLimit: 0 })).status).toBe(400)
    expect((await owner.patch('/platform/messes/nope').send({})).status).toBe(404)
  })

  it('resets the password of a user of that mess only', async () => {
    const one = await makeMess()
    const two = await makeMess()
    const body = { password: 'brand-new-password' }

    const wrongMess = await owner
      .post(`/platform/messes/${two.mess._id}/users/${one.user._id}/password`)
      .send(body)
    expect(wrongMess.status).toBe(404)

    const reset = await owner
      .post(`/platform/messes/${one.mess._id}/users/${one.user._id}/password`)
      .send(body)
    expect(reset.status).toBe(204)
    expect((await api(one.token).get('/auth/me')).status).toBe(401)
    expect((await login(one.user.email, body.password)).status).toBe(200)
  })

  it('deletes a mess and its data after confirmation', async () => {
    vi.spyOn(console, 'log').mockImplementation(() => {})
    const doomed = await makeMess()
    const kept = await makeMess()
    await api(doomed.token).post('/members').send({ name: 'Gone' })
    await api(kept.token).post('/members').send({ name: 'Stays' })
    const path = `/platform/messes/${doomed.mess._id}`

    expect((await owner.delete(path).send({ confirmName: 'wrong' })).status).toBe(400)
    expect((await owner.delete(path).send({ confirmName: doomed.mess.name })).status).toBe(204)

    expect(await Mess.countDocuments()).toBe(1)
    expect((await Member.find()).map((m) => m.name)).toEqual(['Stays'])
    expect(await User.countDocuments({ messId: doomed.mess._id })).toBe(0)
    expect((await api(doomed.token).get('/auth/me')).status).toBe(401)
    vi.restoreAllMocks()
  })
})

describe('team', () => {
  let mess
  let admin

  beforeEach(async () => {
    const created = await makeMess()
    mess = created.mess
    admin = api(created.token)
  })

  const newManager = { name: 'Sumon', email: 'sumon@test.example', password: PASSWORD }

  it('lets the admin add a manager who can work but not manage the team', async () => {
    const created = await admin.post('/team').send({ ...newManager, role: 'admin' })
    expect(created.status).toBe(201)
    expect(created.body.role).toBe('manager')

    const manager = api((await login(newManager.email)).body.token)
    expect((await manager.get('/members')).status).toBe(200)
    expect((await manager.get('/team')).status).toBe(403)
    expect((await manager.put('/mess').send({ name: 'Mine now' })).status).toBe(403)
  })

  it('disables, resets and removes a manager', async () => {
    const { user, token } = await makeManager(mess)
    const path = `/team/${user._id}`

    await admin.patch(path).send({ active: false })
    expect((await api(token).get('/members')).status).toBe(401)

    await admin.patch(path).send({ active: true, password: 'brand-new-password' })
    expect((await login(user.email, 'brand-new-password')).status).toBe(200)

    expect((await admin.delete(path)).status).toBe(204)
    expect((await admin.get('/team')).body.items).toHaveLength(1)
  })

  it('cannot change the admin or another mess', async () => {
    const other = await makeMess()
    const theirs = await makeManager(other.mess)
    const self = (await admin.get('/team')).body.items[0]
    expect((await admin.delete(`/team/${self.id}`)).status).toBe(403)
    expect((await admin.delete(`/team/${theirs.user._id}`)).status).toBe(404)
  })

  it('updates the mess details but not its status or limit', async () => {
    const response = await admin
      .put('/mess')
      .send({ name: 'New Name', phone: '019', status: 'suspended', memberLimit: 999 })
    expect(response.body).toMatchObject({ name: 'New Name', status: 'active', memberLimit: 50 })
  })
})
