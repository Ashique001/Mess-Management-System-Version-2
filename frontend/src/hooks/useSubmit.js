import { useState } from 'react'

/** Submitting a form: blocks double clicks and keeps the error message. */
export function useSubmit(action) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const submit = async (event) => {
    event.preventDefault()
    if (busy) return
    setBusy(true)
    setError('')
    try {
      await action()
    } catch (failure) {
      setError(failure.message)
    } finally {
      setBusy(false)
    }
  }

  return { submit, busy, error }
}
