import { describe, expect, it } from 'vitest'
import { createDemoData, DEMO_ACCOUNTS, DEMO_PASSWORD } from '../scripts/demo-data.js'
import { api } from './helpers.js'
import { useTestDatabase } from './setup.js'

useTestDatabase()

describe('demo data', () => {
  it('gives working logins, even on the first day of a year', async () => {
    await createDemoData(new Date('2027-01-01T12:00:00Z'))

    for (const { email } of DEMO_ACCOUNTS) {
      const login = await api().post('/auth/login').send({ email, password: DEMO_PASSWORD })
      expect(login.status).toBe(200)
    }

    const login = await api()
      .post('/auth/login')
      .send({ email: 'manager@demo.test', password: DEMO_PASSWORD })
    const dashboard = await api(login.body.token).get('/reports/dashboard')
    expect(dashboard.body.activeMembers).toBe(6)
    expect(dashboard.body.totalMeals).toBeGreaterThan(100)
  })
})
