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

export default function Layout() {
  const { data, actions } = useData()
  const { notify, confirm } = useFeedback()
  const [menuOpen, setMenuOpen] = useState(false)
  const [resetCount, setResetCount] = useState(0)
  const { pathname } = useLocation()
  const activeCount = data.members.filter((m) => m.active).length

  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return undefined
    const onKey = (event) => event.key === 'Escape' && setMenuOpen(false)
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
      setMenuOpen(false)
      notify('Sample data restored.')
    } catch (error) {
      notify(error.message, 'error')
    }
  }

  return (
    <div className="app">
      <header className="topbar">
        <button
          type="button"
          className="menu-button"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="sidebar"
          onClick={() => setMenuOpen((open) => !open)}
        >
          ☰
        </button>
        <Link to="/" className="brand">🍽️ MESS MEAL MANAGEMENT</Link>
        <span className="brand-sub">Mess Solution</span>
      </header>

      <aside id="sidebar" className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="mess-card">
          <strong>🏠 Herar Alo</strong>
          <span>{activeCount} Active Member{activeCount === 1 ? '' : 's'}</span>
        </div>
        <nav aria-label="Main">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to}>
              <span aria-hidden="true">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <span>Demo data, saved in this browser</span>
          <button type="button" onClick={reset}>Reset data</button>
        </div>
      </aside>
      {menuOpen && <div className="backdrop" onClick={() => setMenuOpen(false)} />}

      <main className="content">
        <div className="content-inner" key={resetCount}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}
