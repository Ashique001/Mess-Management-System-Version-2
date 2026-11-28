// One mess, as the super admin manages it.

import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { ROLE_NAMES } from '../../auth/roles.js'
import DataTable from '../../components/DataTable.jsx'
import { useFeedback } from '../../components/Feedback.jsx'
import MessStatusTag from '../../components/MessStatusTag.jsx'
import PasswordDialog from '../../components/PasswordDialog.jsx'
import { Loaded } from '../../components/State.jsx'
import {
  Button,
  Card,
  Field,
  Hint,
  Input,
  PageHeader,
  SectionTitle,
  Tag,
} from '../../components/ui.jsx'
import { useAction } from '../../hooks/useAction.js'
import { useApi } from '../../hooks/useApi.js'
import { api } from '../../lib/api.js'
import { formatDate, toIso } from '../../lib/format.js'

const STATUS_ACTIONS = {
  pending: { to: 'active', label: 'Approve', variant: 'green', done: 'Mess approved.' },
  active: {
    to: 'suspended',
    label: 'Suspend',
    variant: 'danger',
    done: 'Mess suspended.',
    question: 'Suspend this mess? Its admin and managers will be blocked until you reactivate it.',
  },
  suspended: { to: 'active', label: 'Reactivate', variant: 'green', done: 'Mess reactivated.' },
}

function Details({ mess, setMess }) {
  const path = `/platform/messes/${mess.id}`
  const { confirm, notify } = useFeedback()
  const { run, busy } = useAction()
  const navigate = useNavigate()
  const [limit, setLimit] = useState(String(mess.memberLimit))
  const [confirmName, setConfirmName] = useState('')
  const [passwordFor, setPasswordFor] = useState(null)
  const action = STATUS_ACTIONS[mess.status]

  const changeStatus = async () => {
    if (action.question && !(await confirm(action.question, `Yes, ${action.label.toLowerCase()}`))) {
      return
    }
    run(async () => setMess(await api.patch(path, { status: action.to })), action.done)
  }

  const saveLimit = (event) => {
    event.preventDefault()
    run(
      async () => setMess(await api.patch(path, { memberLimit: Number(limit) })),
      'Member limit saved.',
    )
  }

  const remove = async (event) => {
    event.preventDefault()
    const question = `Permanently delete ${mess.name} with all its members, meals, money records and logins?`
    if (!(await confirm(question, 'Yes, delete forever'))) return
    const done = await run(() => api.delete(path, { confirmName }), 'Mess deleted.')
    if (done) navigate('/platform', { replace: true })
  }

  const setPassword = async (password) => {
    await api.post(`${path}/users/${passwordFor.id}/password`, { password })
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
    {
      key: 'role',
      label: 'Role',
      render: (u) => (
        <>
          {ROLE_NAMES[u.role]} {!u.active && <Tag tone="red">Disabled</Tag>}
        </>
      ),
    },
    {
      key: 'lastLoginAt',
      label: 'Last login',
      hideSmall: true,
      render: (u) => (u.lastLoginAt ? formatDate(toIso(new Date(u.lastLoginAt))) : 'Never'),
    },
    {
      key: 'actions',
      label: '',
      align: 'right',
      render: (u) => (
        <Button size="sm" variant="grey" onClick={() => setPasswordFor(u)}>
          Password
        </Button>
      ),
    },
  ]

  const facts = [
    ['Address', mess.address || '—'],
    ['Phone', mess.phone || '—'],
    ['Registered', formatDate(toIso(new Date(mess.createdAt)))],
    ['Active members', `${mess.activeMembers} of ${mess.memberLimit}`],
  ]

  return (
    <>
      <PageHeader title={mess.name} />

      <Card>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <MessStatusTag status={mess.status} />
          <Button variant={action.variant} disabled={busy} onClick={changeStatus}>
            {action.label}
          </Button>
        </div>
        <dl className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
          {facts.map(([label, value]) => (
            <div key={label}>
              <dt className="text-[13px] font-semibold text-slate-500">{label}</dt>
              <dd className="wrap-anywhere">{value}</dd>
            </div>
          ))}
        </dl>
      </Card>

      <Card>
        <SectionTitle>ADMIN AND MANAGERS</SectionTitle>
        <DataTable columns={columns} rows={mess.users} />
      </Card>

      <Card as="form" onSubmit={saveLimit} noValidate className="max-w-lg">
        <SectionTitle>MEMBER LIMIT</SectionTitle>
        <Field label="Most active members allowed:">
          <Input
            type="number"
            min={1}
            max={1000}
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
          />
        </Field>
        <Button type="submit" variant="soft" disabled={busy}>
          Save limit
        </Button>
      </Card>

      <Card as="form" onSubmit={remove} noValidate className="max-w-lg border-red-300!">
        <SectionTitle>DELETE THIS MESS</SectionTitle>
        <Hint>
          This cannot be undone. To only block access, suspend the mess instead. Type{' '}
          <strong>{mess.name}</strong> to confirm.
        </Hint>
        <Field label="Mess name:">
          <Input
            autoComplete="off"
            value={confirmName}
            onChange={(e) => setConfirmName(e.target.value)}
          />
        </Field>
        <Button type="submit" variant="danger" disabled={busy || confirmName !== mess.name}>
          Delete mess
        </Button>
      </Card>

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

export default function MessDetail() {
  const { messId } = useParams()
  const query = useApi(`/platform/messes/${encodeURIComponent(messId)}`)

  return (
    <>
      <Link to="/platform" className="text-sm font-semibold text-blue-700 hover:underline">
        ← All messes
      </Link>
      <Loaded query={query}>
        {(mess) => <Details key={mess.id} mess={mess} setMess={query.setData} />}
      </Loaded>
    </>
  )
}
