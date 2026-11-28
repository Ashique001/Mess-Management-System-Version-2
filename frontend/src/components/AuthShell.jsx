// The frame of the screens shown outside the app: login, sign up and the
// "waiting for approval" notice.

import { Link } from 'react-router'
import { Card } from './ui.jsx'

export default function AuthShell({ title, subtitle, width = 'max-w-md', children }) {
  return (
    <div className="flex min-h-screen flex-col items-center gap-5 bg-slate-900 px-4 py-10">
      <Link to="/" className="text-center text-lg font-bold text-white sm:text-xl">
        🍽️ MESS MEAL MANAGEMENT
      </Link>
      <Card as="main" padding="p-5 sm:p-7" className={`w-full ${width}`}>
        <h1 className="text-xl font-bold">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
        <div className="mt-5">{children}</div>
      </Card>
    </div>
  )
}

export function FormError({ children }) {
  if (!children) return null
  return (
    <p role="alert" className="mb-3.5 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
      {children}
    </p>
  )
}
