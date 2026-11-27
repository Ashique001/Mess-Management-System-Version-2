import { useMemo } from 'react'
import DataTable from '../components/DataTable.jsx'
import { PageHeader, StatCard } from '../components/ui.jsx'
import { useData } from '../data/store.jsx'
import { dashboardSummary, recentActivities } from '../lib/calculations.js'
import { formatDate, formatMoney } from '../lib/format.js'

const COLUMNS = [
  {
    key: 'type',
    label: 'Activity',
    className: 'activity-type',
    render: (row) => (
      <span className={`tag tag-${row.type.split(' ')[0].toLowerCase()}`}>{row.type}</span>
    ),
  },
  { key: 'description', label: 'Description', className: 'wrap activity-text' },
  {
    key: 'date',
    label: 'Date',
    className: 'activity-date',
    render: (row) => formatDate(row.date),
  },
  {
    key: 'amount',
    label: 'Amount',
    align: 'right',
    className: 'activity-amount',
    render: (row) => (row.amount == null ? '—' : formatMoney(row.amount)),
  },
]

export default function Dashboard() {
  const { data } = useData()
  const summary = useMemo(() => dashboardSummary(data), [data])
  const activities = useMemo(() => recentActivities(data), [data])

  return (
    <>
      <PageHeader title="📊 DASHBOARD" subtitle="All-time totals of the mess" />

      <div className="dashboard-stats">
        <StatCard label="👥 TOTAL MEMBERS" value={summary.activeMembers} />
        <StatCard label="💰 TOTAL DEPOSIT" value={formatMoney(summary.totalDeposit)} tone="green" />
        <StatCard label="🛒 TOTAL EXPENSE" value={formatMoney(summary.totalExpense)} tone="red" />
        <StatCard label="🍲 TOTAL MEALS" value={summary.totalMeals} tone="amber" />
        <StatCard
          className="wide"
          highlight
          label="⚡ CURRENT MEAL RATE (EXPENSE ÷ MEALS)"
          value={formatMoney(summary.rate)}
        />
      </div>

      <section className="card">
        <h2 className="section-title dark">📋 RECENT ACTIVITIES (LIVE STREAM)</h2>
        <DataTable className="activities" columns={COLUMNS} rows={activities} rowKey={(row) => row.key} />
      </section>
    </>
  )
}
