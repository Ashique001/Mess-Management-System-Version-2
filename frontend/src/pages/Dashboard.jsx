import DataTable from '../components/DataTable.jsx'
import { Loaded } from '../components/State.jsx'
import { Card, PageHeader, StatCard, Tag } from '../components/ui.jsx'
import { useApi } from '../hooks/useApi.js'
import { formatDate, formatMoney } from '../lib/format.js'

const TAG_TONES = { Deposit: 'green', 'Market Expense': 'red', Meal: 'amber' }

const typeTag = (row) => <Tag tone={TAG_TONES[row.type]}>{row.type}</Tag>

const amount = (row) => (row.amount == null ? '—' : formatMoney(row.amount))

const COLUMNS = [
  { key: 'type', label: 'Activity', render: typeTag },
  { key: 'description', label: 'Description', wrap: true },
  { key: 'date', label: 'Date', render: (row) => formatDate(row.date) },
  { key: 'amount', label: 'Amount', align: 'right', render: amount },
]

/** On phones each activity takes two lines, so nothing is cut off. */
function ActivityList({ activities }) {
  return (
    <ul className="divide-y divide-slate-200 rounded-lg border border-slate-200 text-xs sm:hidden">
      {activities.map((row) => (
        <li key={row.key} className="px-2.5 py-2">
          <div className="flex justify-between gap-2">
            <span className="min-w-0 wrap-anywhere">{row.description}</span>
            <strong className="whitespace-nowrap">{amount(row)}</strong>
          </div>
          <div className="mt-1 flex items-center gap-2 text-slate-500">
            {typeTag(row)}
            {formatDate(row.date)}
          </div>
        </li>
      ))}
      {activities.length === 0 && (
        <li className="px-3 py-7 text-center text-slate-500">No records yet.</li>
      )}
    </ul>
  )
}

export default function Dashboard() {
  const query = useApi('/reports/dashboard')

  return (
    <>
      <PageHeader title="📊 DASHBOARD" subtitle="All-time totals of the mess" />

      <Loaded query={query}>
        {(summary) => (
          <>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3.5">
              <StatCard label="👥 TOTAL MEMBERS" value={summary.activeMembers} />
              <StatCard
                label="💰 TOTAL DEPOSIT"
                value={formatMoney(summary.totalDeposit)}
                tone="green"
              />
              <StatCard
                label="🛒 TOTAL EXPENSE"
                value={formatMoney(summary.totalExpense)}
                tone="red"
              />
              <StatCard label="🍲 TOTAL MEALS" value={summary.totalMeals} tone="amber" />
              <StatCard
                className="col-span-2"
                highlight
                label="⚡ CURRENT MEAL RATE (EXPENSE ÷ MEALS)"
                value={formatMoney(summary.rate)}
              />
            </div>

            <Card>
              <h2 className="mb-3 text-[15px] font-bold">📋 RECENT ACTIVITIES (LIVE STREAM)</h2>
              <ActivityList activities={summary.recentActivities} />
              <DataTable
                className="max-sm:hidden"
                columns={COLUMNS}
                rows={summary.recentActivities}
                rowKey={(row) => row.key}
              />
            </Card>
          </>
        )}
      </Loaded>
    </>
  )
}
