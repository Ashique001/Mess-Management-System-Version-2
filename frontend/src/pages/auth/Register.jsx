import { Link } from 'react-router'
import { useAuth } from '../../auth/AuthContext.jsx'
import AuthShell, { FormError } from '../../components/AuthShell.jsx'
import { Button, Field, Input } from '../../components/ui.jsx'
import { useForm } from '../../hooks/useForm.js'
import { useSubmit } from '../../hooks/useSubmit.js'

const EMPTY = {
  messName: '',
  address: '',
  phone: '',
  name: '',
  email: '',
  password: '',
  repeat: '',
}

export default function Register() {
  const { register } = useAuth()
  const form = useForm(EMPTY)
  const { submit, busy, error } = useSubmit(async () => {
    const { repeat, ...input } = form.values
    if (input.password !== repeat) throw new Error('The two passwords are not the same.')
    await register(input)
  })

  return (
    <AuthShell
      title="Register your mess"
      subtitle="You become the admin of the mess and can then add managers."
      width="max-w-xl"
    >
      <form onSubmit={submit} noValidate>
        <FormError>{error}</FormError>
        <div className="grid gap-x-4 sm:grid-cols-2">
          <Field label="Mess name:">
            <Input maxLength={100} autoFocus {...form.bind('messName')} />
          </Field>
          <Field label="Mess phone (optional):">
            <Input type="tel" maxLength={20} {...form.bind('phone')} />
          </Field>
        </div>
        <Field label="Address (optional):">
          <Input maxLength={200} autoComplete="street-address" {...form.bind('address')} />
        </Field>
        <div className="grid gap-x-4 sm:grid-cols-2">
          <Field label="Your name:">
            <Input maxLength={100} autoComplete="name" {...form.bind('name')} />
          </Field>
          <Field label="Your email:">
            <Input type="email" autoComplete="username" {...form.bind('email')} />
          </Field>
          <Field label="Password (8+ characters):">
            <Input type="password" autoComplete="new-password" {...form.bind('password')} />
          </Field>
          <Field label="Repeat password:">
            <Input type="password" autoComplete="new-password" {...form.bind('repeat')} />
          </Field>
        </div>
        <Button type="submit" className="w-full" disabled={busy}>
          {busy ? 'Registering…' : 'Register mess'}
        </Button>
      </form>
      <p className="mt-4 text-center text-sm text-slate-500">
        Already registered?{' '}
        <Link to="/login" className="font-semibold text-blue-700 hover:underline">
          Log in
        </Link>
      </p>
    </AuthShell>
  )
}
