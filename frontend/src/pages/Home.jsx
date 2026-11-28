import { Link } from 'react-router'
import { Card } from '../components/ui.jsx'

const CARDS = [
  {
    to: '/meals',
    icon: '🍲',
    title: 'Daily Meal Entry',
    text: 'Mark lunch and dinner for each member with live daily totals.',
  },
  {
    to: '/market',
    icon: '🛒',
    title: 'Bazar & Expense',
    text: 'Record daily grocery and shopping vouchers with full item notes.',
  },
  {
    to: '/reports',
    icon: '📊',
    title: 'Meal Rate & Audit',
    text: 'Instant settlement ledger showing member dues and refunds.',
  },
]

export default function Home() {
  return (
    <>
      <Card padding="p-4.5 sm:p-6.5">
        <span className="inline-block rounded bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">
          ✨ FAST &amp; ACCURATE MESS UI
        </span>
        <h1 className="mt-2.5 mb-1.5 text-2xl leading-tight font-bold sm:text-3xl">
          Welcome to Mess Meal Management
        </h1>
        <p className="max-w-[70ch] text-slate-500">
          Track daily lunch &amp; dinner, record grocery bazar expenses, handle member deposits,
          and calculate final settlement balances automatically.
        </p>
      </Card>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3.5">
        {CARDS.map((card) => (
          <Link
            key={card.to}
            to={card.to}
            className="rounded-xl border border-slate-200 bg-white p-4.5 transition hover:-translate-y-0.5 hover:border-blue-600"
          >
            <span className="text-4xl" aria-hidden="true">{card.icon}</span>
            <h2 className="my-1.5 text-lg font-bold">{card.title}</h2>
            <p className="text-sm text-slate-500">{card.text}</p>
          </Link>
        ))}
      </div>

      <section className="rounded-xl border border-blue-200 bg-blue-50 px-5 py-4 text-sm text-blue-800">
        <strong>💡 Quick Start</strong>
        <p>
          Choose any module from the menu (Dashboard, Members, Deposits, Market, Meals, Reports)
          to get started.
        </p>
      </section>
    </>
  )
}
