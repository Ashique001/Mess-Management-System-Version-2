import { useEffect, useState } from 'react'
import DataTable from '../components/DataTable.jsx'
import { useFeedback } from '../components/Feedback.jsx'
import { Loaded } from '../components/State.jsx'
import {
  Button,
  Card,
  Hint,
  InactiveTag,
  InlineField,
  Notice,
  PageHeader,
} from '../components/ui.jsx'
import { useApi } from '../hooks/useApi.js'
import { api } from '../lib/api.js'
import { isValidDate, todayIso } from '../lib/format.js'

export default function Meals() {
  const { notify, confirm } = useFeedback()
  const [date, setDate] = useState(todayIso)
  // Ticks changed on screen but not saved yet, by member id.
  const [changes, setChanges] = useState({})
  const [saving, setSaving] = useState(false)
  const query = useApi(isValidDate(date) ? `/meals/${date}` : null)

  const rows = (query.data?.members ?? []).map((member) => {
    const shown = { ...member, ...changes[member.id] }
    return {
      ...shown,
      changed: shown.lunch !== member.lunch || shown.dinner !== member.dinner,
    }
  })

  const totalMeals = rows.reduce((sum, r) => sum + r.lunch + r.dinner, 0)
  const dirty = rows.some((r) => r.changed)

  // Warn before the tab is closed or reloaded with unsaved ticks.
  useEffect(() => {
    if (!dirty) return undefined
    const warn = (event) => event.preventDefault()
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [dirty])

  const toggle = (id, meal, checked) =>
    setChanges((current) => ({ ...current, [id]: { ...current[id], [meal]: checked } }))

  const changeDate = async (next) => {
    if (dirty && !(await confirm('Discard the unsaved meals for this date?', 'Yes, discard'))) {
      return
    }
    setChanges({})
    setDate(next)
  }

  const save = async () => {
    setSaving(true)
    try {
      const saved = await api.put(`/meals/${date}`, {
        entries: rows.map(({ id, lunch, dinner }) => ({ memberId: id, lunch, dinner })),
      })
      query.setData(saved)
      setChanges({})
      notify('Meals saved successfully!')
    } catch (error) {
      notify(error.message, 'error')
    } finally {
      setSaving(false)
    }
  }

  const checkbox = (meal, label) => (row) => (
    <label className="inline-flex h-8 w-10 cursor-pointer items-center justify-center">
      <input
        type="checkbox"
        className="size-5.5 accent-blue-600"
        checked={row[meal]}
        disabled={saving}
        onChange={(e) => toggle(row.id, meal, e.target.checked)}
        aria-label={`${label} for ${row.name}`}
      />
    </label>
  )

  const columns = [
    {
      key: 'name',
      label: 'Name',
      wrap: true,
      render: (row) => (
        <>
          {row.name} {!row.active && <InactiveTag />}
        </>
      ),
    },
    { key: 'lunch', label: 'Lunch', align: 'center', render: checkbox('lunch', 'Lunch') },
    { key: 'dinner', label: 'Dinner', align: 'center', render: checkbox('dinner', 'Dinner') },
    { key: 'total', label: 'Total', align: 'center', render: (r) => r.lunch + r.dinner },
  ]

  return (
    <>
      <PageHeader title="🍲 DAILY MEAL REGISTER" />
      <Card>
        <div className="mb-3.5 flex flex-wrap items-center gap-x-5 gap-y-2">
          <InlineField
            label="Select Date:"
            type="date"
            value={date}
            disabled={saving}
            onChange={(e) => changeDate(e.target.value)}
          />
          <Hint className="">Check Lunch &amp; Dinner. Daily counts are tallied automatically.</Hint>
        </div>

        {isValidDate(date) ? (
          <Loaded query={query}>
            {() => (
              <>
                <DataTable
                  columns={columns}
                  rows={rows}
                  emptyText="No active members. Add one on the Members page."
                />
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <strong className="text-xl text-blue-600">Total Meals: {totalMeals}</strong>
                    {dirty && (
                      <span className="ml-3 text-sm font-semibold text-amber-700">
                        Unsaved changes
                      </span>
                    )}
                  </div>
                  <Button
                    variant="green"
                    className="max-sm:w-full"
                    onClick={save}
                    disabled={saving || !rows.length}
                  >
                    {saving ? 'Saving…' : '💾 Save Daily Entry'}
                  </Button>
                </div>
              </>
            )}
          </Loaded>
        ) : (
          <Notice>Please choose a valid date.</Notice>
        )}
      </Card>
    </>
  )
}
