// The super admin's start page: platform totals and every mess.

import { useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import DataTable from '../../components/DataTable.jsx'
import { useFeedback } from '../../components/Feedback.jsx'
import MessStatusTag from '../../components/MessStatusTag.jsx'
import Pagination from '../../components/Pagination.jsx'
import { Loaded } from '../../components/State.jsx'
import { Button, Card, Input, PageHeader, Select, StatCard } from '../../components/ui.jsx'
import { useAction } from '../../hooks/useAction.js'
import { useApi } from '../../hooks/useApi.js'
import { api } from '../../lib/api.js'
import NewMess from './NewMess.jsx'

export default function Messes() {
  // The filter lives in the address, so "back" returns to the same list.
  const [params, setParams] = useSearchParams()
  const status = params.get('status') ?? ''
  const search = params.get('search') ?? ''
  const page = Number(params.get('page')) || 1

  const [typed, setTyped] = useState(search)
  const [adding, setAdding] = useState(false)
  const { notify } = useFeedback()
  const { run, busy } = useAction()

  const stats = useApi('/platform/stats')
  const query = useApi(`/platform/messes?${new URLSearchParams({ status, search, page })}`)

  const filter = (changes) => {
    const next = { status, search, page: 1, ...changes }
    setParams(Object.fromEntries(Object.entries(next).filter(([, value]) => value)))
  }

  const reload = () => {
    stats.reload()
    query.reload()
  }

  const approve = async (mess) => {
    const done = await run(
      () => api.patch(`/platform/messes/${mess.id}`, { status: 'active' }),
      `${mess.name} approved.`,
    )
    if (done) reload()
  }

  const columns = [
    {
      key: 'name',
      label: 'Mess',
      wrap: true,
      render: (m) => (
        <>
          <Link to={`/platform/messes/${m.id}`} className="font-semibold text-blue-700 underline">
            {m.name}
          </Link>
          {m.address && <div className="text-xs text-slate-500">{m.address}</div>}
        </>
      ),
    },
    {
      key: 'admin',
      label: 'Admin',
      hideSmall: true,
      wrap: true,
      render: (m) =>
        m.admin ? (
          <>
            <div>{m.admin.name}</div>
            <div className="text-xs break-all text-slate-500">{m.admin.email}</div>
          </>
        ) : (
          '—'
        ),
    },
    {
      key: 'members',
      label: 'Members',
      align: 'center',
      render: (m) => `${m.activeMembers} / ${m.memberLimit}`,
    },
    { key: 'status', label: 'Status', render: (m) => <MessStatusTag status={m.status} /> },
    {
      key: 'actions',
      label: '',
      align: 'right',
      render: (m) =>
        m.status === 'pending' && (
          <Button size="sm" variant="green" disabled={busy} onClick={() => approve(m)}>
            Approve
          </Button>
        ),
    },
  ]

  return (
    <>
      <PageHeader title="🛡️ PLATFORM OVERVIEW" subtitle="All messes that use your service" />

      <Loaded query={stats}>
        {({ messes, activeMembers, users }) => (
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3.5 wide:grid-cols-6">
            <StatCard label="MESSES" value={messes.total} />
            <StatCard label="PENDING" value={messes.pending} tone="amber" />
            <StatCard label="ACTIVE" value={messes.active} tone="green" />
            <StatCard label="SUSPENDED" value={messes.suspended} tone="red" />
            <StatCard label="ADMINS & MANAGERS" value={users} />
            <StatCard label="ACTIVE MEMBERS" value={activeMembers} tone="blue" />
          </div>
        )}
      </Loaded>

      {adding && (
        <NewMess
          onCancel={() => setAdding(false)}
          onCreated={(mess) => {
            setAdding(false)
            reload()
            notify(`${mess.name} created.`)
          }}
        />
      )}

      <Card>
        <form
          className="mb-3.5 flex flex-wrap gap-2.5"
          onSubmit={(event) => {
            event.preventDefault()
            filter({ search: typed.trim() })
          }}
        >
          <Input
            type="search"
            aria-label="Search by mess name"
            placeholder="Search by mess name"
            className="w-full sm:max-w-xs sm:flex-1"
            value={typed}
            maxLength={100}
            onChange={(e) => setTyped(e.target.value)}
          />
          <Button type="submit" variant="soft">
            Search
          </Button>
          <Select
            aria-label="Status"
            className=""
            value={status}
            onChange={(e) => filter({ status: e.target.value })}
          >
            <option value="">All statuses</option>
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
          </Select>
          {!adding && (
            <Button className="sm:ml-auto" onClick={() => setAdding(true)}>
              ＋ New mess
            </Button>
          )}
        </form>

        <Loaded query={query}>
          {({ items, pages, total }) => (
            <>
              <DataTable columns={columns} rows={items} emptyText="No messes found." />
              <Pagination
                page={page}
                pages={pages}
                total={total}
                onChange={(next) => filter({ page: next })}
              />
            </>
          )}
        </Loaded>
      </Card>
    </>
  )
}
