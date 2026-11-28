// Pop-up messages and the "Are you sure?" dialog, in place of the desktop
// version's message boxes.

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Button } from './ui.jsx'

const FeedbackContext = createContext(null)

const TOASTS = {
  success: 'bg-emerald-700',
  warning: 'bg-amber-800',
  error: 'bg-red-700',
}

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

      <div
        className="fixed right-3 bottom-3 left-3 z-50 sm:right-5 sm:bottom-5 sm:left-auto sm:max-w-md"
        role="status"
        aria-live="polite"
      >
        {toast && (
          <div
            key={toast.id}
            className={`flex items-start justify-between gap-3 rounded-lg py-3 pr-3.5 pl-4 text-white shadow-xl ${TOASTS[toast.type]}`}
          >
            <span>{toast.message}</span>
            <button
              type="button"
              className="text-xl leading-none"
              aria-label="Close message"
              onClick={() => setToast(null)}
            >
              ×
            </button>
          </div>
        )}
      </div>

      {question && (
        <dialog
          ref={dialogRef}
          className="m-auto w-[min(400px,calc(100vw-32px))] rounded-xl p-5.5 text-slate-900 backdrop:bg-slate-900/50"
          onCancel={(event) => {
            event.preventDefault()
            answer(false)
          }}
        >
          <p>{question.message}</p>
          <div className="mt-5 flex justify-end gap-2.5">
            <Button variant="plain" autoFocus onClick={() => answer(false)}>
              No
            </Button>
            <Button onClick={() => answer(true)}>{question.confirmLabel}</Button>
          </div>
        </dialog>
      )}
    </FeedbackContext.Provider>
  )
}

export const useFeedback = () => useContext(FeedbackContext)
