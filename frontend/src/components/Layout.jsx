import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router'
import { useData } from '../data/store.jsx'
import { useFeedback } from './Feedback.jsx'

const NAV = [
  { to: '/dashboard', icon: '📊', label: 'Dashboard' },
  { to: '/members', icon: '👥', label: 'Members' },
  { to: '/deposits', icon: '💳', label: 'Deposits' },
  { to: '/market', icon: '🛒', label: 'Market' },
  { to: '/meals', icon: '🍲', label: 'Meals' },
  { to: '/monthly', icon: '📅', label: 'Monthly Overview' },
  { to: '/reports', icon: '📈', label: 'Reports' },
]

const navClass = ({ isActive }) =>
  `flex min-h-13 items-center gap-3.5 px-5 font-semibold ${
    isActive ? 'bg-blue-600 text-white' : 'text-slate-200 hover:bg-slate-800'
  }`

export default function Layout() {
  const { data, actions } = useData()
  const { notify, confirm } = useFeedback()
  const { pathname } = useLocation()
  // The path on which the menu was opened: moving elsewhere closes it.
  const [openOn, setOpenOn] = useState(null)
  const [resetCount, setResetCount] = useState(0)
  const menuOpen = openOn === pathname
  const closeMenu = () => setOpenOn(null)
  const activeCount = data.members.filter((m) => m.active).length

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return undefined
    const onKey = (event) => event.key === 'Escape' && setOpenOn(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const reset = async () => {
    const question = 'Replace all current data with fresh sample data? Your changes will be lost.'
    if (!(await confirm(question, 'Yes, reset'))) return
    try {
      await actions.resetData()
      // Re-create the current page so no form keeps a removed record selected.
      setResetCount((count) => count + 1)
      closeMenu()
      notify('Sample data restored.')
    } catch (error) {
      notify(error.message, 'error')
    }
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-800 bg-slate-900 px-3 nav:gap-4 nav:px-5">
        <button
          type="button"
          className="size-10 flex-none rounded-lg bg-slate-800 text-xl text-white nav:hidden"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="sidebar"
          onClick={() => setOpenOn(menuOpen ? null : pathname)}
        >
          ☰
        </button>
        <Link to="/" className="truncate text-[15px] font-bold text-white sm:text-lg nav:text-xl">
          🍽️ MESS MEAL MANAGEMENT
        </Link>
        <span className="ml-auto text-sm whitespace-nowrap text-slate-400 max-sm:hidden">
          Mess Solution
        </span>
      </header>

      <aside
        id="sidebar"
        className={`fixed top-16 bottom-0 left-0 z-20 flex w-60 flex-col overflow-y-auto bg-slate-900 transition-[translate,visibility] duration-200 ${
          menuOpen ? '' : 'max-nav:invisible max-nav:-translate-x-full'
        }`}
      >
        <div className="flex flex-col bg-slate-800 px-5 py-3.5 text-white">
          <strong>🏠 Herar Alo</strong>
          <span className="text-[13px] text-slate-400">
            {activeCount} Active Member{activeCount === 1 ? '' : 's'}
          </span>
        </div>
        <nav aria-label="Main" className="flex flex-col py-1.5">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} className={navClass} onClick={closeMenu}>
              <span aria-hidden="true">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto flex flex-col items-start gap-2 bg-slate-800 px-5 py-3.5 text-xs text-slate-400">
          <span>Demo data, saved in this browser</span>
          <button
            type="button"
            className="rounded-md border border-slate-600 px-3 py-1 text-slate-200"
            onClick={reset}
          >
            Reset data
          </button>
        </div>
      </aside>
      {menuOpen && (
        <div className="fixed inset-x-0 top-16 bottom-0 z-15 bg-slate-900/50 nav:hidden" onClick={closeMenu} />
      )}

      <main className="min-h-screen px-3.5 pt-20 pb-24 nav:pt-22 nav:pr-6 nav:pb-8 nav:pl-66">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-4.5" key={resetCount}>
          <Outlet />
        </div>
      </main>
    </>
  )
}
