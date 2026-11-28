// What each role sees. The server enforces the permissions; this only decides
// what to show.

export const ROLE_NAMES = {
  superadmin: 'Super admin',
  admin: 'Mess admin',
  manager: 'Manager',
}

const MESS_PAGES = [
  { to: '/dashboard', icon: '📊', label: 'Dashboard' },
  { to: '/members', icon: '👥', label: 'Members' },
  { to: '/deposits', icon: '💳', label: 'Deposits' },
  { to: '/market', icon: '🛒', label: 'Market' },
  { to: '/meals', icon: '🍲', label: 'Meals' },
  { to: '/monthly', icon: '📅', label: 'Monthly Overview' },
  { to: '/reports', icon: '📈', label: 'Reports' },
]

const ADMIN_PAGES = [
  { to: '/team', icon: '🧑‍💼', label: 'Team' },
  { to: '/settings', icon: '⚙️', label: 'Settings' },
]

const PLATFORM_PAGES = [{ to: '/platform', icon: '🛡️', label: 'Messes' }]

const ACCOUNT = { to: '/account', icon: '🔑', label: 'My Account' }

const NAVIGATION = {
  superadmin: [...PLATFORM_PAGES, ACCOUNT],
  admin: [...MESS_PAGES, ...ADMIN_PAGES, ACCOUNT],
  manager: [...MESS_PAGES, ACCOUNT],
}

export const navigationFor = (role) => NAVIGATION[role] ?? [ACCOUNT]
