// What a screen shows while data is on its way, or when it could not be loaded.

import { Button } from './ui.jsx'

export function Loading({ label = 'Loading…' }) {
  return (
    <div role="status" className="flex items-center justify-center gap-3 py-10 text-slate-500">
      <span className="size-5 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />
      {label}
    </div>
  )
}

export function ErrorState({ error, onRetry }) {
  return (
    <div
      role="alert"
      className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4.5 py-3.5 text-red-800"
    >
      <span>{error.message}</span>
      {onRetry && (
        <Button variant="plain" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  )
}

/** Renders children(data) once a useApi query has data. */
export function Loaded({ query, children }) {
  if (query.data) {
    return (
      <>
        {query.error && <ErrorState error={query.error} onRetry={query.reload} />}
        {children(query.data)}
      </>
    )
  }
  if (query.error) return <ErrorState error={query.error} onRetry={query.reload} />
  return <Loading />
}
