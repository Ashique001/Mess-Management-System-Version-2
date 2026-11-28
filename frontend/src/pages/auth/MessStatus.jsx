// Shown instead of the app while a mess is not active.

import { useState } from 'react'
import { useAuth } from '../../auth/AuthContext.jsx'
import AuthShell from '../../components/AuthShell.jsx'
import { Button } from '../../components/ui.jsx'

const MESSAGES = {
  pending: {
    title: '⏳ Waiting for approval',
    text: 'has been registered. The platform owner has to approve it before you can use it.',
  },
  suspended: {
    title: '⛔ Mess suspended',
    text: 'has been suspended. Your records are kept. Please contact the platform owner.',
  },
}

export default function MessStatus() {
  const { mess, refresh, logout } = useAuth()
  const [checking, setChecking] = useState(false)
  const { title, text } = MESSAGES[mess.status] ?? MESSAGES.suspended

  const check = async () => {
    setChecking(true)
    await refresh()
    setChecking(false)
  }

  return (
    <AuthShell title={title}>
      <p>
        <strong>{mess.name}</strong> {text}
      </p>
      <div className="mt-5 flex gap-2.5">
        <Button className="flex-1" onClick={check} disabled={checking}>
          {checking ? 'Checking…' : 'Check again'}
        </Button>
        <Button variant="grey" className="flex-1" onClick={logout}>
          Log out
        </Button>
      </div>
    </AuthShell>
  )
}
