import { beforeEach, describe, expect, it } from 'vitest'
import { api, makeManager, makeMess, makeSuperAdmin } from './helpers.js'
import { useTestDatabase } from './setup.js'

useTestDatabase()

let mess
let admin
let manager

beforeEach(async () => {
  const created = await makeMess()
  mess = created.mess
  admin = api(created.token)
  manager = api((await makeManager(mess)).token)
})

const addMember = async (name = 'Arif', client = manager) =>
  (await client.post('/members').send({ name, phone: '017' })).body

describe('access', () => {
  it('needs a login', async () => {
    expect((await api().get('/members')).status).toBe(401)
  })

  it('serves the admin and the manager', async () => {
    expect((await admin.get('/members')).status).toBe(200)
    expect((await manager.get('/members')).status).toBe(200)
  })

  it('keeps the super admin out of mess data', async () => {
    const owner = api((await makeSuperAdmin()).token)
    expect((await owner.get('/members')).status).toBe(403)
  })

  it.each([
    ['pending', 'MESS_PENDING'],
    ['suspended', 'MESS_SUSPENDED'],
  ])('blocks a %s mess', async (status, code) => {
    const blocked = api((await makeMess({ status })).token)
    const response = await blocked.get('/members')
    expect(response.status).toBe(403)
    expect(response.body.error.code).toBe(code)
  })
})

describe('members', () => {
  it('adds, lists, changes and deletes', async () => {
    const zara = await addMember(' Zara ')
    await addMember('arif')
    const list = await manager.get('/members')
    expect(list.body.items.map((m) => m.name)).toEqual(['arif', 'Zara'])

    const changed = await manager.put(`/members/${zara.id}`).send({ name: 'Z', active: false })
    expect(changed.body).toMatchObject({ name: 'Z', active: false, phone: '' })

    expect((await manager.delete(`/members/${zara.id}`)).status).toBe(204)
    expect((await manager.delete(`/members/${zara.id}`)).status).toBe(404)
    expect((await manager.delete('/members/not-an-id')).status).toBe(404)
  })

  it('needs a name', async () => {
    const response = await manager.post('/members').send({ name: '  ' })
    expect(response.status).toBe(400)
    expect(response.body.error.message).toBe('Please enter member name.')
  })

  it('keeps members who have records', async () => {
    const member = await addMember()
    await manager
      .post('/deposits')
      .send({ memberId: member.id, date: '2026-11-01', amount: '10' })
    const response = await manager.delete(`/members/${member.id}`)
    expect(response.status).toBe(409)
    expect(response.body.error.message).toContain('Inactive')
  })

  it('enforces the limit on active members', async () => {
    const small = api((await makeMess({ memberLimit: 1 })).token)
    const first = await addMember('One', small)
    expect((await small.post('/members').send({ name: 'Two' })).status).toBe(409)

    const inactive = await small.post('/members').send({ name: 'Two', active: false })
    expect(inactive.status).toBe(201)
    const activate = await small
      .put(`/members/${inactive.body.id}`)
      .send({ name: 'Two', active: true })
    expect(activate.status).toBe(409)
    // Editing someone who is already active is still allowed.
    const edit = await small.put(`/members/${first.id}`).send({ name: 'Uno', active: true })
    expect(edit.status).toBe(200)
  })
})

describe('deposits and expenses', () => {
  it('stores money exactly and returns it with the member name', async () => {
    const member = await addMember()
    const created = await manager
      .post('/deposits')
      .send({ memberId: member.id, date: '2026-11-01', amount: '1250.55' })
    expect(created.status).toBe(201)
    expect(created.body).toMatchObject({ amount: 1250.55, memberName: 'Arif' })
  })

  it.each(['', 'abc', '0', '-5', '1.234', '1e3', '99999999999', null])(
    'rejects the amount %s',
    async (amount) => {
      const member = await addMember()
      const response = await manager
        .post('/deposits')
        .send({ memberId: member.id, date: '2026-11-01', amount })
      expect(response.status).toBe(400)
    },
  )

  it('needs a member, a real date and a description', async () => {
    const noMember = await manager
      .post('/deposits')
      .send({ memberId: '', date: '2026-11-01', amount: 5 })
    expect(noMember.body.error.message).toBe('Please select a member.')

    const noDescription = await manager
      .post('/expenses')
      .send({ date: '2026-11-01', amount: 5, description: '' })
    expect(noDescription.body.error.message).toBe('Please enter description.')

    const badDate = await manager
      .post('/expenses')
      .send({ date: '2026-02-30', amount: 5, description: 'x' })
    expect(badDate.body.error.message).toBe('Please choose a valid date.')
  })

  it('pages through expenses, newest first', async () => {
    for (const day of ['01', '03', '02']) {
      await manager
        .post('/expenses')
        .send({ date: `2026-11-${day}`, amount: 10, description: `Day ${day}` })
    }
    const page = await manager.get('/expenses?limit=2&page=2')
    expect(page.body).toMatchObject({ page: 2, pages: 2, total: 3 })
    expect(page.body.items.map((e) => e.date)).toEqual(['2026-11-01'])
  })

  it('updates and deletes an expense', async () => {
    const created = await manager
      .post('/expenses')
      .send({ date: '2026-11-01', amount: 10, description: 'Rice' })
    const updated = await manager
      .put(`/expenses/${created.body.id}`)
      .send({ date: '2026-11-02', amount: '12.5', description: 'Oil' })
    expect(updated.body).toMatchObject({ amount: 12.5, description: 'Oil' })
    expect((await manager.delete(`/expenses/${created.body.id}`)).status).toBe(204)
  })
})

describe('meals', () => {
  const save = (entries, date = '2026-11-01') => manager.put(`/meals/${date}`).send({ entries })

  it('saves a day once, however often it is sent', async () => {
    const member = await addMember()
    const entry = { memberId: member.id, lunch: true, dinner: true }
    await save([entry])
    const again = await save([entry])
    expect(again.body.members).toMatchObject([{ lunch: true, dinner: true }])
    expect((await manager.get('/reports/dashboard')).body.totalMeals).toBe(2)
  })

  it('removes unticked meals and keeps members who are not listed', async () => {
    const one = await addMember('One')
    const two = await addMember('Two')
    await save([
      { memberId: one.id, lunch: true, dinner: false },
      { memberId: two.id, lunch: true, dinner: false },
    ])
    const response = await save([{ memberId: one.id, lunch: false, dinner: false }])
    expect(response.body.members.map((m) => m.lunch)).toEqual([false, true])
  })

  it('rejects a bad date, a repeated member and an unknown member', async () => {
    const member = await addMember()
    const entry = { memberId: member.id, lunch: true, dinner: false }
    expect((await save([entry], '2026-02-30')).status).toBe(400)
    expect((await save([entry, entry])).status).toBe(400)
    expect((await save([{ ...entry, memberId: 'a'.repeat(24) }])).status).toBe(400)
    expect((await save([])).status).toBe(400)
  })
})

describe('reports', () => {
  beforeEach(async () => {
    const member = await addMember()
    await manager
      .post('/deposits')
      .send({ memberId: member.id, date: '2026-11-01', amount: 500 })
    await manager
      .post('/expenses')
      .send({ date: '2026-11-02', amount: 300, description: 'Rice' })
    await manager
      .put('/meals/2026-11-02')
      .send({ entries: [{ memberId: member.id, lunch: true, dinner: true }] })
    // Outside the reported period.
    await manager
      .post('/expenses')
      .send({ date: '2026-10-31', amount: 90, description: 'Eggs' })
  })

  const range = 'from=2026-11-01&to=2026-11-30'

  it('settles the chosen period only', async () => {
    const response = await manager.get(`/reports/settlement?${range}`)
    expect(response.body).toMatchObject({ marketCost: 300, mealCount: 2, rate: 150 })
    expect(response.body.rows[0]).toMatchObject({ cost: 300, deposit: 500, balance: 200 })
  })

  it('builds the monthly sheet', async () => {
    const response = await manager.get(`/reports/monthly?${range}`)
    expect(response.body.days).toHaveLength(30)
    expect(response.body.summary[0]).toMatchObject({ lunch: 1, dinner: 1, share: 100 })
  })

  it('totals everything on the dashboard', async () => {
    const response = await manager.get('/reports/dashboard')
    expect(response.body).toMatchObject({
      activeMembers: 1,
      totalDeposit: 500,
      totalExpense: 390,
      totalMeals: 2,
      rate: 195,
    })
    expect(response.body.recentActivities).toHaveLength(5)
  })

  it('rejects a reversed or too long period', async () => {
    const reversed = await manager.get('/reports/settlement?from=2026-11-02&to=2026-11-01')
    const long = await manager.get('/reports/monthly?from=2024-01-01&to=2026-01-01')
    expect(reversed.status).toBe(400)
    expect(long.status).toBe(400)
  })
})

describe('tenant isolation', () => {
  it('hides one mess from another', async () => {
    const member = await addMember('Private')
    const deposit = await manager
      .post('/deposits')
      .send({ memberId: member.id, date: '2026-11-01', amount: 5 })
    const expense = await manager
      .post('/expenses')
      .send({ date: '2026-11-01', amount: 5, description: 'Secret' })
    await manager
      .put('/meals/2026-11-01')
      .send({ entries: [{ memberId: member.id, lunch: true, dinner: true }] })

    const outsider = api((await makeMess()).token)
    const range = 'from=2026-11-01&to=2026-11-30'

    expect((await outsider.get('/members')).body.items).toEqual([])
    expect((await outsider.get('/deposits')).body.total).toBe(0)
    expect((await outsider.get('/expenses')).body.total).toBe(0)
    expect((await outsider.get('/meals/2026-11-01')).body.members).toEqual([])
    expect((await outsider.get('/reports/dashboard')).body.totalMeals).toBe(0)
    expect((await outsider.get(`/reports/settlement?${range}`)).body.rows).toEqual([])
    expect((await outsider.get(`/reports/monthly?${range}`)).body.mealCount).toBe(0)

    // Knowing an id is not enough to change or delete it.
    const attempts = [
      outsider.put(`/members/${member.id}`).send({ name: 'x' }),
      outsider.delete(`/members/${member.id}`),
      outsider.delete(`/deposits/${deposit.body.id}`),
      outsider.delete(`/expenses/${expense.body.id}`),
    ]
    for (const response of await Promise.all(attempts)) expect(response.status).toBe(404)

    const theirDeposit = await outsider
      .post('/deposits')
      .send({ memberId: member.id, date: '2026-11-01', amount: 5 })
    const theirMeal = await outsider
      .put('/meals/2026-11-01')
      .send({ entries: [{ memberId: member.id, lunch: false, dinner: false }] })
    expect(theirDeposit.status).toBe(400)
    expect(theirMeal.status).toBe(400)
    expect((await manager.get('/reports/dashboard')).body.totalMeals).toBe(2)
  })

  it('ignores a messId sent by the client', async () => {
    const other = await makeMess()
    await manager.post('/members').send({ name: 'Mine', messId: String(other.mess._id) })
    expect((await api(other.token).get('/members')).body.items).toEqual([])
  })
})
