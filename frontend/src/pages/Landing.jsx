// The public front page.

import { Link } from 'react-router'

const FEATURES = [
  {
    icon: '🍲',
    title: 'Daily meals',
    text: 'Tick lunch and dinner for every member. Totals add up on their own.',
  },
  {
    icon: '🛒',
    title: 'Bazar and deposits',
    text: 'Record market spending and the money each member pays in.',
  },
  {
    icon: '📈',
    title: 'Fair settlement',
    text: 'The meal rate and every balance are calculated for any period.',
  },
  {
    icon: '👥',
    title: 'Admin and managers',
    text: 'The mess owner stays in charge and lets managers run the daily work.',
  },
]

const LINK = 'rounded-md px-5 py-2.5 text-sm font-semibold hover:brightness-95'

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-4">
        <span className="truncate font-bold sm:text-lg">🍽️ MESS MEAL MANAGEMENT</span>
        <Link to="/login" className={`${LINK} bg-slate-800 whitespace-nowrap`}>
          Log in
        </Link>
      </header>

      <main className="mx-auto max-w-5xl px-4 pt-10 pb-16">
        <div className="text-center">
          <h1 className="text-3xl leading-tight font-bold sm:text-5xl">
            Run your mess without the notebook
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            Track meals, market expenses and member deposits, and get the final settlement
            automatically. Register your mess to start.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link to="/register" className={`${LINK} bg-blue-600`}>
              Register your mess
            </Link>
            <Link to="/login" className={`${LINK} bg-white text-slate-900`}>
              I already have an account
            </Link>
          </div>
        </div>

        <ul className="mt-14 grid gap-3.5 sm:grid-cols-2">
          {FEATURES.map((feature) => (
            <li key={feature.title} className="rounded-xl bg-slate-800 p-5">
              <span className="text-3xl" aria-hidden="true">
                {feature.icon}
              </span>
              <h2 className="mt-2 text-lg font-bold">{feature.title}</h2>
              <p className="text-sm text-slate-300">{feature.text}</p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
