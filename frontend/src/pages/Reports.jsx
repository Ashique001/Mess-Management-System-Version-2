import { useState } from 'react'
import DataTable from '../components/DataTable.jsx'
import { useFeedback } from '../components/Feedback.jsx'
import { ErrorState, Loading } from '../components/State.jsx'
import {
  Button,
  Card,
  DateRange,
  Hint,
  InactiveTag,
  PageHeader,
  StatCard,
  TONES,
} from '../components/ui.jsx'
import { useApi } from '../hooks/useApi.js'
import {
  formatAmount,
  formatDate,
  formatMoney,
  isValidDate,
  monthStartIso,
  todayIso,
} from '../lib/format.js'

const COLUMNS = [
  {
    key: 'name',
    label: 'Member',
    wrap: true,
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
      <strong className={Math.round(r.balance * 100) < 0 ? TONES.red : TONES.green}>
        {formatAmount(r.balance)}
      </strong>
    ),
  },
]

export default function Reports() {
  const { notify } = useFeedback()
  const [range, setRange] = useState(() => ({ from: monthStartIso(), to: todayIso() }))
  // The period that was last calculated.
  const [period, setPeriod] = useState(null)
  const query = useApi(period ? `/reports/settlement?from=${period.from}&to=${period.to}` : null)
  const report = query.data

  const calculate = (event) => {
    event.preventDefault()
    if (!isValidDate(range.from) || !isValidDate(range.to)) {
      notify('Please choose valid dates.', 'warning')
    } else if (range.from > range.to) {
      notify('From date cannot be greater than To date.', 'warning')
    } else if (period?.from === range.from && period.to === range.to) {
      query.reload()
    } else {
      setPeriod(range)
    }
  }

  return (
    <>
      <PageHeader title="📈 MEAL SETTLEMENT & AUDIT REPORT" />

      <Card
        as="form"
        padding="px-4.5 py-3.5"
        className="flex flex-wrap items-center gap-x-4.5 gap-y-3"
        onSubmit={calculate}
      >
        <span className="text-[13px] font-bold text-slate-500 max-sm:w-full">PERIOD FILTER:</span>
        <DateRange from={range.from} to={range.to} onChange={setRange} />
        <Button type="submit" className="max-sm:flex-1" disabled={query.loading}>
          {query.loading ? 'Calculating…' : '⚡ Calculate'}
        </Button>
      </Card>

      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3.5">
        <StatCard label="TOTAL MARKET COST" value={formatMoney(report?.marketCost ?? 0)} />
        <StatCard label="TOTAL MEALS CONSUMED" value={report?.mealCount ?? 0} tone="amber" />
        <StatCard
          className="max-sm:col-span-2"
          label="PERIOD MEAL RATE"
          value={formatMoney(report?.rate ?? 0)}
          tone="blue"
        />
      </div>

      {query.error && <ErrorState error={query.error} onRetry={query.reload} />}

      <Card>
        {report && (
          <Hint>
            Report from {formatDate(period.from)} to {formatDate(period.to)}. A negative balance
            means the member owes money.
          </Hint>
        )}
        {query.loading && !report ? (
          <Loading />
        ) : (
          <DataTable
            columns={COLUMNS}
            rows={report?.rows ?? []}
            emptyText={
              report ? 'No members in this period.' : 'Choose a period and press Calculate.'
            }
          />
        )}
      </Card>
    </>
  )
}
