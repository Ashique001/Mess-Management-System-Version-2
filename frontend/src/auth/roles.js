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

export const navigationFor = (role) => (role === 'superadmin' ? [] : MESS_PAGES)
