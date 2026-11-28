import { useCallback, useEffect, useState } from 'react'
import { api } from '../lib/api.js'

const EMPTY = { path: null, version: 0, data: null, error: null }

/**
 * Loads `path` from the API, and again when it changes or reload() is called.
 * Pass null to load nothing. Data of the same path stays visible while it is
 * loaded again; data of another path is never shown.
 */
export function useApi(path) {
  const [result, setResult] = useState(EMPTY)
  const [version, setVersion] = useState(0)

  useEffect(() => {
    if (!path) return undefined
    const controller = new AbortController()
    api.get(path, { signal: controller.signal }).then(
      (data) => {
        if (!controller.signal.aborted) setResult({ path, version, data, error: null })
      },
      (error) => {
        if (controller.signal.aborted) return
        setResult((previous) => ({
          path,
          version,
          data: previous.path === path ? previous.data : null,
          error,
        }))
      },
    )
    return () => controller.abort()
  }, [path, version])

  const reload = useCallback(() => setVersion((v) => v + 1), [])

  /** Shows newer data that the server returned from a change. */
  const setData = useCallback(
    (data) => setResult((previous) => ({ ...previous, data, error: null })),
    [],
  )

  const current = path !== null && result.path === path
  return {
    data: current ? result.data : null,
    error: current ? result.error : null,
    loading: path !== null && (!current || result.version !== version),
    reload,
    setData,
  }
}
