import { Link } from 'react-router'
import { useAuth } from '../../auth/AuthContext.jsx'
import AuthShell, { FormError } from '../../components/AuthShell.jsx'
import { Button, Field, Input } from '../../components/ui.jsx'
import { useForm } from '../../hooks/useForm.js'
import { useSubmit } from '../../hooks/useSubmit.js'

export default function Login() {
  const { login } = useAuth()
  const form = useForm({ email: '', password: '' })
  const { submit, busy, error } = useSubmit(() => login(form.values))

  return (
    <AuthShell title="Log in" subtitle="For mess admins, managers and the platform owner.">
      <form onSubmit={submit} noValidate>
        <FormError>{error}</FormError>
        <Field label="Email:">
          <Input type="email" autoComplete="username" autoFocus {...form.bind('email')} />
        </Field>
        <Field label="Password:">
          <Input type="password" autoComplete="current-password" {...form.bind('password')} />
        </Field>
        <Button type="submit" className="w-full" disabled={busy}>
          {busy ? 'Logging in…' : 'Log in'}
        </Button>
      </form>
      <p className="mt-4 text-center text-sm text-slate-500">
        New mess?{' '}
        <Link to="/register" className="font-semibold text-blue-700 hover:underline">
          Register it here
        </Link>
      </p>
      <p className="mt-2 text-center text-[13px] text-slate-500">
        Forgot your password? Ask your mess admin or the platform owner to set a new one.
      </p>
      {/* Only in development: the accounts of "npm run demo". */}
      {import.meta.env.DEV && (
        <p className="mt-4 rounded-md bg-blue-50 px-3 py-2 text-[13px] text-blue-800">
          Demo server: owner@demo.test, admin@demo.test or manager@demo.test with password
          demo-password.
        </p>
      )}
    </AuthShell>
  )
}
