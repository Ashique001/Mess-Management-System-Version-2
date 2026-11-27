import { useMemo, useState } from 'react'
import DataTable from '../components/DataTable.jsx'
import { DateRange, InactiveTag, PageHeader, StatCard } from '../components/ui.jsx'
import { useData } from '../data/store.jsx'
import { monthlyOverview } from '../lib/calculations.js'
import {
  datesBetween, formatDate, formatMoney, isValidDate, monthEndIso, monthStartIso, todayIso,
  weekday,
} from '../lib/format.js'

const MAX_DAYS = 366
const COLOURS = 8

const SUMMARY_COLUMNS = [
  {
    key: 'name',
    label: 'Member Name',
    className: 'wrap',
    render: (row) => (
      <>
        {row.name} {!row.active && <InactiveTag />}
      </>
    ),
  },
  { key: 'lunch', label: 'Total Lunch', align: 'center' },
  { key: 'dinner', label: 'Total Dinner', align: 'center' },
  { key: 'total', label: 'Total Meals', align: 'center' },
  { key: 'share', label: 'Meal Share', align: 'right', render: (r) => `${r.share.toFixed(1)} %` },
]

function rangeProblem(from, to) {
  if (!isValidDate(from) || !isValidDate(to)) return 'Please choose valid dates.'
  if (from > to) return "The 'From' date cannot be greater than the 'To' date."
  if (datesBetween(from, to).length > MAX_DAYS) return 'Please choose a period of one year or less.'
  return null
}

function DailySheet({ overview }) {
  const [selectedDate, setSelectedDate] = useState(null)
  const { members, days, summary } = overview
  const colour = (index) => `member-${index % COLOURS}`

  // Members who share a name are told apart by their id.
  const label = (member) =>
    members.filter((m) => m.name === member.name).length > 1
      ? `${member.name} #${member.id}`
      : member.name

  return (
    <div className="table-wrap sheet-wrap">
      <table className="sheet clickable">
        <thead>
          <tr>
            <th scope="col" className="date-col">তারিখ (Date)</th>
            {members.map((member, i) => [
              <th key={`${member.id}d`} scope="col" className={colour(i)}>{label(member)} (D)</th>,
              <th key={`${member.id}n`} scope="col" className={colour(i)}>{label(member)} (N)</th>,
            ])}
            <th scope="col" className="total-col">দৈনিক মোট (Total)</th>
          </tr>
        </thead>
        <tbody>
          {days.map((day) => (
            <tr
              key={day.date}
              className={day.date === selectedDate ? 'selected' : undefined}
              onClick={() => setSelectedDate(day.date)}
            >
              <th scope="row" className="date-col">
                {formatDate(day.date)} ({weekday(day.date)})
              </th>
              {day.cells.map((cell, i) => [
                <td key={`${cell.memberId}d`} className={colour(i)}>{cell.lunch}</td>,
                <td key={`${cell.memberId}n`} className={colour(i)}>{cell.dinner}</td>,
              ])}
              <td className="total-col">{day.total}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row" className="date-col">মোট মিল (Total)</th>
            {summary.map((row) => [
              <td key={`${row.id}d`}>{row.lunch}</td>,
              <td key={`${row.id}n`}>{row.dinner}</td>,
            ])}
            <td className="total-col">{overview.mealCount}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default function MonthlyOverview() {
  const { data } = useData()
  const [range, setRange] = useState(() => ({ from: monthStartIso(), to: todayIso() }))
  const [tab, setTab] = useState('summary')
  const { from, to } = range

  const problem = rangeProblem(from, to)
  const overview = useMemo(
    () => (problem ? null : monthlyOverview(data, from, to)),
    [data, from, to, problem],
  )

  const tabButton = (id, text) => (
    <button
      type="button"
      role="tab"
      id={`tab-${id}`}
      aria-selected={tab === id}
      aria-controls="tab-panel"
      onClick={() => setTab(id)}
    >
      {text}
    </button>
  )

  return (
    <>
      <PageHeader
        title="📅 MONTHLY MEAL OVERVIEW & SHEET"
        subtitle="Comprehensive monthly ledger, individual meal counts, and daily sheet matrix"
      />

      <div className="card filter-bar">
        <DateRange from={from} to={to} onChange={setRange} />
        <button
          type="button"
          className="btn btn-soft-blue"
          onClick={() => setRange({ from: monthStartIso(), to: monthEndIso() })}
        >
          📅 This Month
        </button>
        <span className="auto-note">⚡ Auto-calculates on change</span>
      </div>

      {problem ? (
        <p className="notice" role="alert">{problem}</p>
      ) : (
        <>
          <div className="stats stats-4">
            <StatCard label="TOTAL MEALS (মোট মিল)" value={overview.mealCount} tone="amber" />
            <StatCard label="TOTAL MARKET (মোট বাজার)" value={formatMoney(overview.marketCost)} tone="red" />
            <StatCard label="MEAL RATE (মিল রেট)" value={formatMoney(overview.rate)} highlight />
            <StatCard label="ACTIVE BORDERS (সদস্য)" value={overview.activeMembers} />
          </div>

          <div className="tabs" role="tablist">
            {tabButton('summary', '📋 Member Meal Totals')}
            {tabButton(
              'sheet',
              <>
                🗓️ Daily Sheet <span className="hide-small">(Member D &amp; N Matrix)</span>
              </>,
            )}
          </div>

          <section className="card tab-panel" id="tab-panel" role="tabpanel" aria-labelledby={`tab-${tab}`}>
            {tab === 'summary' ? (
              <DataTable columns={SUMMARY_COLUMNS} rows={overview.summary} />
            ) : (
              <DailySheet overview={overview} />
            )}
          </section>
        </>
      )}
    </>
  )
}
