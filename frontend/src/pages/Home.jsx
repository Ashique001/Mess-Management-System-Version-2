import { Link } from 'react-router'

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
      <section className="card hero">
        <span className="badge">✨ FAST &amp; ACCURATE MESS UI</span>
        <h1>Welcome to Mess Meal Management</h1>
        <p>
          Track daily lunch &amp; dinner, record grocery bazar expenses, handle member deposits,
          and calculate final settlement balances automatically.
        </p>
      </section>

      <div className="home-cards">
        {CARDS.map((card) => (
          <Link key={card.to} to={card.to} className="card home-card">
            <span className="home-icon" aria-hidden="true">{card.icon}</span>
            <h2>{card.title}</h2>
            <p>{card.text}</p>
          </Link>
        ))}
      </div>

      <section className="tip">
        <strong>💡 Quick Start</strong>
        <p>
          Choose any module from the menu (Dashboard, Members, Deposits, Market, Meals, Reports)
          to get started.
        </p>
      </section>
    </>
  )
}
