// Pop-up messages and the "Are you sure?" dialog, in place of the desktop
// version's message boxes.

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

const FeedbackContext = createContext(null)

export function FeedbackProvider({ children }) {
  const [toast, setToast] = useState(null)
  const [question, setQuestion] = useState(null)
  const dialogRef = useRef(null)

  const notify = useCallback((message, type = 'success') => {
    setToast({ message, type, id: Date.now() })
  }, [])

  const confirm = useCallback(
    (message, confirmLabel = 'Yes') =>
      new Promise((resolve) => setQuestion({ message, confirmLabel, resolve })),
    [],
  )

  useEffect(() => {
    if (!toast) return undefined
    const timer = setTimeout(() => setToast(null), toast.type === 'success' ? 3000 : 6000)
    return () => clearTimeout(timer)
  }, [toast])

  useEffect(() => {
    if (question) dialogRef.current.showModal()
  }, [question])

  const answer = (value) => {
    dialogRef.current.close()
    question.resolve(value)
    setQuestion(null)
  }

  const value = useMemo(() => ({ notify, confirm }), [notify, confirm])

  return (
    <FeedbackContext.Provider value={value}>
      {children}

      <div className="toast-area" role="status" aria-live="polite">
        {toast && (
          <div key={toast.id} className={`toast toast-${toast.type}`}>
            <span>{toast.message}</span>
            <button type="button" aria-label="Close message" onClick={() => setToast(null)}>
              ×
            </button>
          </div>
        )}
      </div>

      {question && (
        <dialog
          ref={dialogRef}
          className="dialog"
          onCancel={(event) => {
            event.preventDefault()
            answer(false)
          }}
        >
          <p>{question.message}</p>
          <div className="dialog-actions">
            <button type="button" className="btn btn-plain" autoFocus onClick={() => answer(false)}>
              No
            </button>
            <button type="button" className="btn btn-blue" onClick={() => answer(true)}>
              {question.confirmLabel}
            </button>
          </div>
        </dialog>
      )}
    </FeedbackContext.Provider>
  )
}

export const useFeedback = () => useContext(FeedbackContext)
