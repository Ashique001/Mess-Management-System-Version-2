import { useMemo, useState } from 'react'
import DataTable from '../components/DataTable.jsx'
import { useFeedback } from '../components/Feedback.jsx'
import { DateRange, InactiveTag, PageHeader, StatCard } from '../components/ui.jsx'
import { useData } from '../data/store.jsx'
import { memberReport } from '../lib/calculations.js'
import {
  formatAmount, formatDate, formatMoney, isValidDate, monthStartIso, todayIso,
} from '../lib/format.js'

const COLUMNS = [
  {
    key: 'name',
    label: 'Member',
    className: 'wrap',
    render: (row) => (
      <>
        {row.name} {!row.active && <InactiveTag />}
      </>
    ),
  },
  { key: 'meals', label: 'Meals', align: 'center' },
  { key: 'cost', label: 'Cost', align: 'right', render: (r) => formatAmount(r.cost) },
  { key: 'deposit', label: 'Deposit', align: 'right', render: (r) => formatAmount(r.deposit) },
  {
    key: 'balance',
    label: 'Balance',
    align: 'right',
    render: (r) => (
      <strong className={Math.round(r.balance * 100) < 0 ? 'tone-red' : 'tone-green'}>
        {formatAmount(r.balance)}
      </strong>
    ),
  },
]

export default function Reports() {
  const { data } = useData()
  const { notify } = useFeedback()
  const [range, setRange] = useState(() => ({ from: monthStartIso(), to: todayIso() }))
  // The period that was last calculated.
  const [period, setPeriod] = useState(null)

  const report = useMemo(
    () => (period ? memberReport(data, period.from, period.to) : null),
    [data, period],
  )

  const calculate = (event) => {
    event.preventDefault()
    if (!isValidDate(range.from) || !isValidDate(range.to)) {
      notify('Please choose valid dates.', 'warning')
    } else if (range.from > range.to) {
      notify('From date cannot be greater than To date.', 'warning')
    } else {
      setPeriod(range)
    }
  }

  return (
    <>
      <PageHeader title="📈 MEAL SETTLEMENT & AUDIT REPORT" />

      <form className="card filter-bar" onSubmit={calculate}>
        <span className="filter-title">PERIOD FILTER:</span>
        <DateRange from={range.from} to={range.to} onChange={setRange} />
        <button type="submit" className="btn btn-blue">⚡ Calculate</button>
      </form>

      <div className="stats stats-3">
        <StatCard label="TOTAL MARKET COST" value={formatMoney(report?.marketCost ?? 0)} />
        <StatCard label="TOTAL MEALS CONSUMED" value={report?.mealCount ?? 0} tone="amber" />
        <StatCard label="PERIOD MEAL RATE" value={formatMoney(report?.rate ?? 0)} tone="blue" />
      </div>

      <section className="card">
        {period && (
          <p className="hint">
            Report from {formatDate(period.from)} to {formatDate(period.to)}. A negative balance
            means the member owes money.
          </p>
        )}
        <DataTable
          columns={COLUMNS}
          rows={report?.rows ?? []}
          emptyText={period ? 'No members in this period.' : 'Choose a period and press Calculate.'}
        />
      </section>
    </>
  )
}
