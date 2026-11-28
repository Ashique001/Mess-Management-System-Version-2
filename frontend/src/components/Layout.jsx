import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router'
import { useAuth } from '../auth/AuthContext.jsx'
import { navigationFor, ROLE_NAMES } from '../auth/roles.js'

const navClass = ({ isActive }) =>
  `flex min-h-12 items-center gap-3.5 px-5 font-semibold ${
    isActive ? 'bg-blue-600 text-white' : 'text-slate-200 hover:bg-slate-800'
  }`

export default function Layout() {
  const { user, mess, logout } = useAuth()
  const { pathname } = useLocation()
  // The path on which the menu was opened: moving elsewhere closes it.
  const [openOn, setOpenOn] = useState(null)
  const menuOpen = openOn === pathname
  const closeMenu = () => setOpenOn(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return undefined
    const onKey = (event) => event.key === 'Escape' && setOpenOn(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

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
        <span className="ml-auto truncate text-sm text-slate-400 max-sm:hidden">{user.name}</span>
      </header>

      <aside
        id="sidebar"
        className={`fixed top-16 bottom-0 left-0 z-20 flex w-60 flex-col overflow-y-auto bg-slate-900 transition-[translate,visibility] duration-200 ${
          menuOpen ? '' : 'max-nav:invisible max-nav:-translate-x-full'
        }`}
      >
        <div className="flex flex-col bg-slate-800 px-5 py-3.5 text-white">
          <strong className="wrap-anywhere">{mess ? `🏠 ${mess.name}` : '🛡️ Platform'}</strong>
          <span className="text-[13px] text-slate-400">{ROLE_NAMES[user.role]}</span>
        </div>
        <nav aria-label="Main" className="flex flex-col py-1.5">
          {navigationFor(user.role).map((item) => (
            <NavLink key={item.to} to={item.to} className={navClass} onClick={closeMenu}>
              <span aria-hidden="true">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto flex flex-col items-start gap-2 bg-slate-800 px-5 py-3.5 text-xs text-slate-400">
          <span className="wrap-anywhere">{user.email}</span>
          <button
            type="button"
            className="rounded-md border border-slate-600 px-3 py-1 text-slate-200"
            onClick={logout}
          >
            Log out
          </button>
        </div>
      </aside>
      {menuOpen && (
        <div
          className="fixed inset-x-0 top-16 bottom-0 z-15 bg-slate-900/50 nav:hidden"
          onClick={closeMenu}
        />
      )}

      <main className="min-h-screen px-3.5 pt-20 pb-24 nav:pt-22 nav:pr-6 nav:pb-8 nav:pl-66">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-4.5">
          <Outlet />
        </div>
      </main>
    </>
  )
}
