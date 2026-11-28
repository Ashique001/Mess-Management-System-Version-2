// The only place that talks to the server.

import { getToken } from './token.js'

// Empty in development, where Vite forwards /api to the local server.
const BASE_URL = (import.meta.env.VITE_API_URL ?? '').trim().replace(/\/+$/, '')

// Generous, because free hosting can take a few seconds to wake up.
const TIMEOUT_MS = 30_000

export class ApiError extends Error {
  constructor(message, status, code) {
    super(message)
    this.status = status
    this.code = code
  }
}

let sessionListener = null

/** Hears about every error of a logged-in request, such as an ended login. */
export function setSessionListener(listener) {
  sessionListener = listener
  return () => {
    sessionListener = null
  }
}

async function request(method, path, { body, signal } = {}) {
  const token = getToken()
  const headers = {}
  if (body !== undefined) headers['Content-Type'] = 'application/json'
  if (token) headers.Authorization = `Bearer ${token}`

  const timeout = AbortSignal.timeout(TIMEOUT_MS)
  let response
  try {
    response = await fetch(`${BASE_URL}/api${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: signal ? AbortSignal.any([signal, timeout]) : timeout,
    })
  } catch (error) {
    if (signal?.aborted) throw error
    throw new ApiError(
      'Cannot reach the server. Check your connection and try again.',
      0,
      'NETWORK',
    )
  }

  if (response.status === 204) return null
  const data = await response.json().catch(() => null)
  if (response.ok && data !== null) return data

  const error = new ApiError(
    data?.error?.message ?? 'The server gave an unexpected answer. Please try again.',
    response.status,
    data?.error?.code,
  )
  // Ignore answers that belong to a login which has since been replaced.
  if (token && token === getToken()) sessionListener?.(error)
  throw error
}

export const api = {
  get: (path, options) => request('GET', path, options),
  post: (path, body) => request('POST', path, { body }),
  put: (path, body) => request('PUT', path, { body }),
  patch: (path, body) => request('PATCH', path, { body }),
  delete: (path, body) => request('DELETE', path, { body }),
}
