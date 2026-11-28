// Who is logged in. `status` is 'loading', 'guest', 'ready' or 'error'.

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { api, setSessionListener } from '../lib/api.js'
import { getToken, setToken, TOKEN_KEY } from '../lib/token.js'

const AuthContext = createContext(null)

const GUEST = { status: 'guest', user: null, mess: null }

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() =>
    getToken() ? { ...GUEST, status: 'loading' } : GUEST,
  )

  const logout = useCallback(() => {
    setToken(null)
    setSession(GUEST)
  }, [])

  /** Reads the account again, for example after the mess was approved. */
  const refresh = useCallback(
    () =>
      api.get('/auth/me').then(
        (data) => setSession({ status: 'ready', ...data }),
        (error) => {
          if (error.status === 401) logout()
          else {
            setSession((current) =>
              current.status === 'ready' ? current : { ...GUEST, status: 'error', error },
            )
          }
        },
      ),
    [logout],
  )

  useEffect(() => {
    if (getToken()) refresh()
  }, [refresh])

  useEffect(
    () =>
      setSessionListener((error) => {
        if (error.status === 401) logout()
        else if (error.code === 'MESS_PENDING' || error.code === 'MESS_SUSPENDED') refresh()
      }),
    [logout, refresh],
  )

  // Follow a login or logout made in another tab.
  useEffect(() => {
    const follow = (event) => {
      if (event.key !== TOKEN_KEY && event.key !== null) return
      if (getToken()) refresh()
      else setSession(GUEST)
    }
    window.addEventListener('storage', follow)
    return () => window.removeEventListener('storage', follow)
  }, [refresh])

  const actions = useMemo(() => {
    const start = ({ token, user, mess }) => {
      setToken(token)
      setSession({ status: 'ready', user, mess })
    }
    return {
      login: async (input) => start(await api.post('/auth/login', input)),
      register: async (input) => start(await api.post('/auth/register', input)),
      changePassword: async (input) => start(await api.post('/auth/change-password', input)),
      setMess: (mess) => setSession((current) => ({ ...current, mess })),
    }
  }, [])

  const value = useMemo(
    () => ({ ...session, ...actions, logout, refresh }),
    [session, actions, logout, refresh],
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
