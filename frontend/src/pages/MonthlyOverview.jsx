import { useState } from 'react'
import DailySheet from '../components/DailySheet.jsx'
import DataTable from '../components/DataTable.jsx'
import { Loaded } from '../components/State.jsx'
import {
  Button,
  Card,
  DateRange,
  InactiveTag,
  Notice,
  PageHeader,
  StatCard,
} from '../components/ui.jsx'
import { useApi } from '../hooks/useApi.js'
import {
  dayCount,
  formatMoney,
  isValidDate,
  monthEndIso,
  monthStartIso,
  todayIso,
} from '../lib/format.js'

const MAX_DAYS = 366

const SUMMARY_COLUMNS = [
  {
    key: 'name',
    label: 'Member Name',
    wrap: true,
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
  if (dayCount(from, to) > MAX_DAYS) return 'Please choose a period of one year or less.'
  return null
}

export default function MonthlyOverview() {
  const [range, setRange] = useState(() => ({ from: monthStartIso(), to: todayIso() }))
  const [tab, setTab] = useState('summary')
  const { from, to } = range

  const problem = rangeProblem(from, to)
  const query = useApi(problem ? null : `/reports/monthly?from=${from}&to=${to}`)

  const tabButton = (id, text) => (
    <button
      type="button"
      role="tab"
      id={`tab-${id}`}
      aria-selected={tab === id}
      aria-controls="tab-panel"
      onClick={() => setTab(id)}
      className={`relative z-1 min-h-11 rounded-t-lg border border-b-0 border-slate-200 px-3 py-2 text-sm font-semibold whitespace-nowrap sm:px-4 sm:text-base ${
        tab === id ? 'bg-white text-blue-700' : 'bg-slate-100 text-slate-600'
      }`}
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

      <Card padding="px-4.5 py-3.5" className="flex flex-wrap items-center gap-x-4.5 gap-y-3">
        <DateRange from={from} to={to} onChange={setRange} />
        <Button
          variant="soft"
          className="max-sm:flex-1"
          onClick={() => setRange({ from: monthStartIso(), to: monthEndIso() })}
        >
          📅 This Month
        </Button>
        <span className="text-[13px] text-emerald-700 max-sm:w-full sm:ml-auto">
          ⚡ Auto-calculates on change
        </span>
      </Card>

      {problem ? (
        <Notice>{problem}</Notice>
      ) : (
        <Loaded query={query}>
          {(overview) => (
            <>
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 wide:grid-cols-4">
                <StatCard label="TOTAL MEALS (মোট মিল)" value={overview.mealCount} tone="amber" />
                <StatCard
                  label="TOTAL MARKET (মোট বাজার)"
                  value={formatMoney(overview.marketCost)}
                  tone="red"
                />
                <StatCard label="MEAL RATE (মিল রেট)" value={formatMoney(overview.rate)} highlight />
                <StatCard label="ACTIVE BORDERS (সদস্য)" value={overview.activeMembers} />
              </div>

              <div className="-mb-4.5 flex gap-1 overflow-x-auto" role="tablist">
                {tabButton('summary', '📋 Member Meal Totals')}
                {tabButton(
                  'sheet',
                  <>
                    🗓️ Daily Sheet <span className="max-sm:hidden">(Member D &amp; N Matrix)</span>
                  </>,
                )}
              </div>

              <Card
                className="rounded-tl-none!"
                id="tab-panel"
                role="tabpanel"
                aria-labelledby={`tab-${tab}`}
              >
                {tab === 'summary' ? (
                  <DataTable columns={SUMMARY_COLUMNS} rows={overview.summary} />
                ) : (
                  <DailySheet
                    members={overview.summary}
                    days={overview.days}
                    mealCount={overview.mealCount}
                  />
                )}
              </Card>
            </>
          )}
        </Loaded>
      )}
    </>
  )
}
