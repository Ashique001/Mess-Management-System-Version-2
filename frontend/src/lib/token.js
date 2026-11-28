// Keeps the login token. localStorage keeps people logged in between visits.
// If the browser blocks storage, the login lasts until the page is closed.

export const TOKEN_KEY = 'mess-meal-token'

let fallback = null

export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return fallback
  }
}

export function setToken(token) {
  fallback = token
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token)
    else localStorage.removeItem(TOKEN_KEY)
  } catch {
    // Storage is blocked: the copy in memory is used.
  }
}
