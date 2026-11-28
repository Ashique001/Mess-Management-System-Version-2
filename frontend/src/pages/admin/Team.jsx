// The mess admin adds managers and controls their accounts.

import { useState } from 'react'
import { ROLE_NAMES } from '../../auth/roles.js'
import { FormError } from '../../components/AuthShell.jsx'
import DataTable from '../../components/DataTable.jsx'
import { useFeedback } from '../../components/Feedback.jsx'
import PasswordDialog from '../../components/PasswordDialog.jsx'
import { Loaded } from '../../components/State.jsx'
import {
  Button,
  Card,
  Field,
  Input,
  PageHeader,
  SectionTitle,
  Tag,
} from '../../components/ui.jsx'
import { useAction } from '../../hooks/useAction.js'
import { useApi } from '../../hooks/useApi.js'
import { useForm } from '../../hooks/useForm.js'
import { useSubmit } from '../../hooks/useSubmit.js'
import { api } from '../../lib/api.js'

function AddManager({ onAdded }) {
  const { notify } = useFeedback()
  const form = useForm({ name: '', email: '', password: '' })
  const { submit, busy, error } = useSubmit(async () => {
    await api.post('/team', form.values)
    form.reset()
    onAdded()
    notify('Manager added. Give them the email and password.')
  })

  return (
    <Card as="form" onSubmit={submit} noValidate>
      <SectionTitle>ADD A MANAGER</SectionTitle>
      <FormError>{error}</FormError>
      <Field label="Name:">
        <Input maxLength={100} autoComplete="off" {...form.bind('name')} />
      </Field>
      <Field label="Email:">
        <Input type="email" autoComplete="off" {...form.bind('email')} />
      </Field>
      <Field label="First password (8+ characters):">
        <Input autoComplete="off" {...form.bind('password')} />
      </Field>
      <Button type="submit" className="w-full" disabled={busy}>
        {busy ? 'Adding…' : 'Add manager'}
      </Button>
    </Card>
  )
}

export default function Team() {
  const query = useApi('/team')
  const { confirm, notify } = useFeedback()
  const { run, busy } = useAction()
  const [passwordFor, setPasswordFor] = useState(null)

  const change = async (action, message) => {
    if (await run(action, message)) query.reload()
  }

  const toggle = (user) =>
    change(
      () => api.patch(`/team/${user.id}`, { active: !user.active }),
      user.active ? 'Manager disabled.' : 'Manager enabled.',
    )

  const remove = async (user) => {
    if (!(await confirm(`Remove the manager ${user.name}?`, 'Yes, remove'))) return
    change(() => api.delete(`/team/${user.id}`), 'Manager removed.')
  }

  const setPassword = async (password) => {
    await api.patch(`/team/${passwordFor.id}`, { password })
    setPasswordFor(null)
    notify('New password saved.')
  }

  const columns = [
    {
      key: 'name',
      label: 'Name',
      wrap: true,
      render: (u) => (
        <>
          <div className="font-semibold">{u.name}</div>
          <div className="text-xs break-all text-slate-500">{u.email}</div>
        </>
      ),
    },
    { key: 'role', label: 'Role', hideSmall: true, render: (u) => ROLE_NAMES[u.role] },
    {
      key: 'active',
      label: 'Status',
      render: (u) =>
        u.active ? <Tag tone="green">Active</Tag> : <Tag tone="red">Disabled</Tag>,
    },
    {
      key: 'actions',
      label: 'Actions',
      wrap: true,
      render: (u) =>
        u.role === 'manager' ? (
          <div className="flex flex-wrap gap-1.5">
            <Button size="sm" variant="grey" disabled={busy} onClick={() => setPasswordFor(u)}>
              Password
            </Button>
            <Button size="sm" variant="soft" disabled={busy} onClick={() => toggle(u)}>
              {u.active ? 'Disable' : 'Enable'}
            </Button>
            <Button size="sm" variant="danger" disabled={busy} onClick={() => remove(u)}>
              Remove
            </Button>
          </div>
        ) : (
          <span className="text-slate-400">—</span>
        ),
    },
  ]

  return (
    <>
      <PageHeader title="🧑‍💼 TEAM" subtitle="Managers run the daily work of the mess" />
      <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-4.5 wide:grid-cols-[330px_minmax(0,1fr)]">
        <AddManager onAdded={query.reload} />
        <Card>
          <SectionTitle>PEOPLE WHO CAN LOG IN</SectionTitle>
          <Loaded query={query}>
            {({ items }) => <DataTable columns={columns} rows={items} />}
          </Loaded>
        </Card>
      </div>
      {passwordFor && (
        <PasswordDialog
          user={passwordFor}
          onSave={setPassword}
          onClose={() => setPasswordFor(null)}
        />
      )}
    </>
  )
}
