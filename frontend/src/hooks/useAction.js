import { useState } from 'react'
import { useFeedback } from '../components/Feedback.jsx'

/**
 * Runs a change started by a button: one at a time, with a pop-up message for
 * success or failure. Returns true when it succeeded.
 */
export function useAction() {
  const { notify } = useFeedback()
  const [busy, setBusy] = useState(false)

  const run = async (action, successMessage) => {
    setBusy(true)
    try {
      await action()
      notify(successMessage)
      return true
    } catch (error) {
      notify(error.message, 'error')
      return false
    } finally {
      setBusy(false)
    }
  }

  return { run, busy }
}
