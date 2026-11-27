import { useEffect, useState } from 'react'
import DataTable from '../components/DataTable.jsx'
import { useFeedback } from '../components/Feedback.jsx'
import { InactiveTag, PageHeader } from '../components/ui.jsx'
import { useData } from '../data/store.jsx'
import { sortByName } from '../lib/calculations.js'
import { isValidDate, todayIso } from '../lib/format.js'

export default function Meals() {
  const { data, actions } = useData()
  const { notify, confirm } = useFeedback()
  const [date, setDate] = useState(todayIso)
  // Ticks changed on screen but not saved yet, by member id.
  const [changes, setChanges] = useState({})

  const saved = new Set(
    data.meals.filter((m) => m.date === date).map((m) => `${m.memberId}|${m.type}`),
  )

  // Active members, plus inactive members who already have a meal on this day.
  const rows = isValidDate(date)
    ? sortByName(
        data.members.filter(
          (m) => m.active || saved.has(`${m.id}|Lunch`) || saved.has(`${m.id}|Dinner`),
        ),
      ).map((member) => {
        const stored = {
          lunch: saved.has(`${member.id}|Lunch`),
          dinner: saved.has(`${member.id}|Dinner`),
        }
        const shown = { ...stored, ...changes[member.id] }
        return {
          ...member,
          ...shown,
          changed: shown.lunch !== stored.lunch || shown.dinner !== stored.dinner,
        }
      })
    : []

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
    if (dirty && !(await confirm('Discard the unsaved meals for this date?', 'Yes, discard'))) return
    setChanges({})
    setDate(next)
  }

  const save = async () => {
    try {
      await actions.saveMeals(
        date,
        rows.map(({ id, lunch, dinner }) => ({ memberId: id, lunch, dinner })),
      )
      setChanges({})
      notify('Meals saved successfully!')
    } catch (error) {
      notify(error.message, 'error')
    }
  }

  const checkbox = (meal, label) => (row) => (
    <label className="check">
      <input
        type="checkbox"
        checked={row[meal]}
        onChange={(e) => toggle(row.id, meal, e.target.checked)}
        aria-label={`${label} for ${row.name}`}
      />
    </label>
  )

  const columns = [
    {
      key: 'name',
      label: 'Name',
      className: 'wrap',
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
      <section className="card">
        <div className="toolbar">
          <label className="inline-field">
            <span>Select Date:</span>
            <input type="date" value={date} onChange={(e) => changeDate(e.target.value)} />
          </label>
          <p className="hint">Check Lunch &amp; Dinner. Daily counts are tallied automatically.</p>
        </div>

        <DataTable
          columns={columns}
          rows={rows}
          emptyText={
            isValidDate(date)
              ? 'No active members. Add one on the Members page.'
              : 'Please choose a valid date.'
          }
        />

        <div className="meals-footer">
          <div>
            <strong className="total-meals">Total Meals: {totalMeals}</strong>
            {dirty && <span className="unsaved">Unsaved changes</span>}
          </div>
          <button type="button" className="btn btn-green" onClick={save} disabled={!rows.length}>
            💾 Save Daily Entry
          </button>
        </div>
      </section>
    </>
  )
}
