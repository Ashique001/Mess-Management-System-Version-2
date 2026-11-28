import { useAuth } from '../auth/AuthContext.jsx'
import { ROLE_NAMES } from '../auth/roles.js'
import { FormError } from '../components/AuthShell.jsx'
import { useFeedback } from '../components/Feedback.jsx'
import { Button, Card, Field, Input, PageHeader, SectionTitle } from '../components/ui.jsx'
import { useForm } from '../hooks/useForm.js'
import { useSubmit } from '../hooks/useSubmit.js'

const EMPTY = { currentPassword: '', newPassword: '', repeat: '' }

export default function Account() {
  const { user, changePassword } = useAuth()
  const { notify } = useFeedback()
  const form = useForm(EMPTY)
  const { submit, busy, error } = useSubmit(async () => {
    const { repeat, ...input } = form.values
    if (input.newPassword !== repeat) throw new Error('The two new passwords are not the same.')
    await changePassword(input)
    form.reset()
    notify('Password changed. Other devices have been logged out.')
  })

  return (
    <>
      <PageHeader title="🔑 MY ACCOUNT" />
      <Card className="max-w-lg">
        <p className="font-bold">{user.name}</p>
        <p className="text-sm wrap-anywhere text-slate-500">
          {user.email} · {ROLE_NAMES[user.role]}
        </p>
      </Card>
      <Card as="form" onSubmit={submit} noValidate className="max-w-lg">
        <SectionTitle>CHANGE PASSWORD</SectionTitle>
        <FormError>{error}</FormError>
        <Field label="Current password:">
          <Input
            type="password"
            autoComplete="current-password"
            {...form.bind('currentPassword')}
          />
        </Field>
        <Field label="New password (8+ characters):">
          <Input type="password" autoComplete="new-password" {...form.bind('newPassword')} />
        </Field>
        <Field label="Repeat new password:">
          <Input type="password" autoComplete="new-password" {...form.bind('repeat')} />
        </Field>
        <Button type="submit" disabled={busy}>
          {busy ? 'Saving…' : 'Change password'}
        </Button>
      </Card>
    </>
  )
}
