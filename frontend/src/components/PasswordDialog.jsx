// Lets an admin set a new password for someone else.

import { useEffect, useRef } from 'react'
import { useForm } from '../hooks/useForm.js'
import { useSubmit } from '../hooks/useSubmit.js'
import { FormError } from './AuthShell.jsx'
import { Button, Field, Input } from './ui.jsx'

export default function PasswordDialog({ user, onSave, onClose }) {
  const ref = useRef(null)
  const form = useForm({ password: '' })
  const { submit, busy, error } = useSubmit(() => onSave(form.values.password))

  useEffect(() => {
    const dialog = ref.current
    if (!dialog.open) dialog.showModal()
  }, [])

  return (
    <dialog
      ref={ref}
      className="m-auto w-[min(420px,calc(100vw-32px))] rounded-xl p-5.5 text-slate-900 backdrop:bg-slate-900/50"
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
    >
      <form onSubmit={submit} noValidate>
        <h2 className="text-lg font-bold">New password for {user.name}</h2>
        <p className="mb-4 text-[13px] text-slate-500">
          Their current logins will end. Give them the new password privately.
        </p>
        <FormError>{error}</FormError>
        <Field label="New password (8+ characters):">
          {/* Shown as text so it can be read out and passed on. */}
          <Input autoFocus autoComplete="off" {...form.bind('password')} />
        </Field>
        <div className="flex justify-end gap-2.5">
          <Button variant="plain" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={busy}>
            Set password
          </Button>
        </div>
      </form>
    </dialog>
  )
}
