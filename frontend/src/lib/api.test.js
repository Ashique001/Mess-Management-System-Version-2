import { afterEach, describe, expect, it, vi } from 'vitest'
import { api, setSessionListener } from './api.js'
import { setToken } from './token.js'

const reply = (status, body) =>
  vi.fn(async () => new Response(body === null ? null : JSON.stringify(body), { status }))

afterEach(() => {
  vi.unstubAllGlobals()
  setToken(null)
})

describe('api', () => {
  it('sends the token and the body', async () => {
    const fetch = reply(200, { ok: true })
    vi.stubGlobal('fetch', fetch)
    setToken('abc')
    await expect(api.post('/members', { name: 'A' })).resolves.toEqual({ ok: true })
    const [url, options] = fetch.mock.calls[0]
    expect(url).toBe('/api/members')
    expect(options.headers).toEqual({
      'Content-Type': 'application/json',
      Authorization: 'Bearer abc',
    })
    expect(options.body).toBe('{"name":"A"}')
  })

  it('returns nothing for an empty answer', async () => {
    vi.stubGlobal('fetch', reply(204, null))
    await expect(api.delete('/members/1')).resolves.toBeNull()
  })

  it('passes on the message of the server and reports an ended login', async () => {
    vi.stubGlobal('fetch', reply(401, { error: { message: 'Please log in.' } }))
    const listener = vi.fn()
    const stop = setSessionListener(listener)
    setToken('old')
    await expect(api.get('/auth/me')).rejects.toMatchObject({
      message: 'Please log in.',
      status: 401,
    })
    expect(listener).toHaveBeenCalledOnce()
    stop()
  })

  it('explains a web page where data was expected', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('<html>', { status: 200 })))
    await expect(api.get('/members')).rejects.toThrow('unexpected answer')
  })

  it('explains a failed connection', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => Promise.reject(new TypeError('failed'))))
    await expect(api.get('/members')).rejects.toThrow('Cannot reach the server')
  })
})
