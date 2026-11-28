// The super admin adds a mess and its admin. It is active at once.

import { FormError } from '../../components/AuthShell.jsx'
import { Button, Card, Field, Input, SectionTitle } from '../../components/ui.jsx'
import { useForm } from '../../hooks/useForm.js'
import { useSubmit } from '../../hooks/useSubmit.js'
import { api } from '../../lib/api.js'

const EMPTY = {
  messName: '',
  address: '',
  phone: '',
  memberLimit: '50',
  name: '',
  email: '',
  password: '',
}

export default function NewMess({ onCreated, onCancel }) {
  const form = useForm(EMPTY)
  const { submit, busy, error } = useSubmit(async () => {
    const created = await api.post('/platform/messes', {
      ...form.values,
      memberLimit: Number(form.values.memberLimit),
    })
    onCreated(created)
  })

  return (
    <Card as="form" onSubmit={submit} noValidate>
      <SectionTitle>NEW MESS</SectionTitle>
      <FormError>{error}</FormError>
      <div className="grid gap-x-4 sm:grid-cols-2">
        <Field label="Mess name:">
          <Input maxLength={100} autoFocus {...form.bind('messName')} />
        </Field>
        <Field label="Member limit:">
          <Input type="number" min={1} max={1000} {...form.bind('memberLimit')} />
        </Field>
        <Field label="Address (optional):">
          <Input maxLength={200} autoComplete="off" {...form.bind('address')} />
        </Field>
        <Field label="Mess phone (optional):">
          <Input type="tel" maxLength={20} autoComplete="off" {...form.bind('phone')} />
        </Field>
        <Field label="Admin name:">
          <Input maxLength={100} autoComplete="off" {...form.bind('name')} />
        </Field>
        <Field label="Admin email:">
          <Input type="email" autoComplete="off" {...form.bind('email')} />
        </Field>
        <Field label="Admin first password (8+ characters):">
          <Input autoComplete="off" {...form.bind('password')} />
        </Field>
      </div>
      <div className="flex gap-2.5">
        <Button type="submit" disabled={busy}>
          {busy ? 'Creating…' : 'Create mess'}
        </Button>
        <Button variant="plain" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </Card>
  )
}
