import request from 'supertest'
import { describe, expect, it } from 'vitest'
import app from '../src/app.js'
import { configProblems, getConfig } from '../src/config.js'
import { useTestDatabase } from './setup.js'

useTestDatabase()

describe('app', () => {
  it('reports that it is healthy', async () => {
    const response = await request(app).get('/api/health')
    expect(response.status).toBe(200)
    expect(response.body).toEqual({ status: 'ok' })
  })

  it('answers unknown addresses with JSON', async () => {
    const response = await request(app).get('/api/nothing')
    expect(response.status).toBe(404)
    expect(response.body.error.message).toContain('/api/nothing')
  })

  it('rejects broken JSON', async () => {
    const response = await request(app)
      .post('/api/health')
      .set('Content-Type', 'application/json')
      .send('{oops')
    expect(response.status).toBe(400)
  })

  it('allows only listed websites', async () => {
    const allowed = await request(app).get('/').set('Origin', 'http://localhost:5173')
    const other = await request(app).get('/').set('Origin', 'https://evil.example')
    expect(allowed.headers['access-control-allow-origin']).toBe('http://localhost:5173')
    expect(other.headers['access-control-allow-origin']).toBeUndefined()
  })
})

describe('config', () => {
  it('needs a database and a secret in production', () => {
    const problems = configProblems(getConfig({ NODE_ENV: 'production' }))
    expect(problems).toHaveLength(2)
  })

  it('removes trailing slashes from allowed websites', () => {
    const config = getConfig({ CORS_ORIGIN: 'https://a.example/, https://b.example' })
    expect(config.corsOrigins).toEqual(['https://a.example', 'https://b.example'])
  })
})
