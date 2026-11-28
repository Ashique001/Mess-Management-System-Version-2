import { useAuth } from '../../auth/AuthContext.jsx'
import { FormError } from '../../components/AuthShell.jsx'
import { useFeedback } from '../../components/Feedback.jsx'
import { Button, Card, Field, Hint, Input, PageHeader, SectionTitle } from '../../components/ui.jsx'
import { useForm } from '../../hooks/useForm.js'
import { useSubmit } from '../../hooks/useSubmit.js'
import { api } from '../../lib/api.js'

export default function Settings() {
  const { mess, setMess } = useAuth()
  const { notify } = useFeedback()
  const form = useForm({ name: mess.name, address: mess.address, phone: mess.phone })
  const { submit, busy, error } = useSubmit(async () => {
    setMess(await api.put('/mess', form.values))
    notify('Mess details saved.')
  })

  return (
    <>
      <PageHeader title="⚙️ MESS SETTINGS" />
      <Card as="form" onSubmit={submit} noValidate className="max-w-lg">
        <SectionTitle>MESS DETAILS</SectionTitle>
        <FormError>{error}</FormError>
        <Field label="Mess name:">
          <Input maxLength={100} {...form.bind('name')} />
        </Field>
        <Field label="Address:">
          <Input maxLength={200} {...form.bind('address')} />
        </Field>
        <Field label="Phone:">
          <Input type="tel" maxLength={20} {...form.bind('phone')} />
        </Field>
        <Hint>
          Your mess can have up to {mess.memberLimit} active members. Ask the platform owner to
          raise this limit.
        </Hint>
        <Button type="submit" disabled={busy}>
          {busy ? 'Saving…' : 'Save details'}
        </Button>
      </Card>
    </>
  )
}
