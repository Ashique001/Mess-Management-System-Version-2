import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router'
import { AuthProvider, useAuth } from './auth/AuthContext.jsx'
import AuthShell from './components/AuthShell.jsx'
import { FeedbackProvider } from './components/Feedback.jsx'
import Layout from './components/Layout.jsx'
import { ErrorState, Loading } from './components/State.jsx'
import { Button } from './components/ui.jsx'
import Account from './pages/Account.jsx'
import Settings from './pages/admin/Settings.jsx'
import Team from './pages/admin/Team.jsx'
import Login from './pages/auth/Login.jsx'
import MessStatus from './pages/auth/MessStatus.jsx'
import Register from './pages/auth/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Deposits from './pages/Deposits.jsx'
import Home from './pages/Home.jsx'
import Landing from './pages/Landing.jsx'
import Market from './pages/Market.jsx'
import Meals from './pages/Meals.jsx'
import Members from './pages/Members.jsx'
import MonthlyOverview from './pages/MonthlyOverview.jsx'
import MessDetail from './pages/platform/MessDetail.jsx'
import Messes from './pages/platform/Messes.jsx'
import Reports from './pages/Reports.jsx'

/** Sends a visitor to the login page, remembering where they wanted to go. */
function ToLogin() {
  const location = useLocation()
  return <Navigate to="/login" replace state={{ from: location.pathname }} />
}

/** After logging in: on to the page that was asked for. */
function AfterLogin() {
  const location = useLocation()
  return <Navigate to={location.state?.from ?? '/'} replace />
}

function AppRoutes() {
  const { status, user, mess, error, refresh, logout } = useAuth()

  if (status === 'loading') return <Loading />

  if (status === 'error') {
    return (
      <AuthShell title="Could not open your account">
        <ErrorState error={error} onRetry={refresh} />
        <Button variant="grey" className="mt-4 w-full" onClick={logout}>
          Log out
        </Button>
      </AuthShell>
    )
  }

  if (!user) {
    return (
      <Routes>
        <Route index element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<ToLogin />} />
      </Routes>
    )
  }

  if (mess && mess.status !== 'active') return <MessStatus />

  return (
    // A new key per account clears everything the previous one left on screen.
    <Routes key={user.id}>
      <Route path="login" element={<AfterLogin />} />
      <Route path="register" element={<Navigate to="/" replace />} />
      <Route element={<Layout />}>
        <Route path="account" element={<Account />} />
        {user.role === 'superadmin' ? (
          <>
            <Route index element={<Navigate to="/platform" replace />} />
            <Route path="platform" element={<Messes />} />
            <Route path="platform/messes/:messId" element={<MessDetail />} />
          </>
        ) : (
          <>
            <Route index element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="members" element={<Members />} />
            <Route path="deposits" element={<Deposits />} />
            <Route path="market" element={<Market />} />
            <Route path="meals" element={<Meals />} />
            <Route path="monthly" element={<MonthlyOverview />} />
            <Route path="reports" element={<Reports />} />
            {user.role === 'admin' && (
              <>
                <Route path="team" element={<Team />} />
                <Route path="settings" element={<Settings />} />
              </>
            )}
          </>
        )}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <FeedbackProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </FeedbackProvider>
    </AuthProvider>
  )
}
