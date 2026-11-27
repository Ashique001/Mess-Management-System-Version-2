import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { FeedbackProvider } from './components/Feedback.jsx'
import Layout from './components/Layout.jsx'
import { DataProvider } from './data/store.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Deposits from './pages/Deposits.jsx'
import Home from './pages/Home.jsx'
import Market from './pages/Market.jsx'
import Meals from './pages/Meals.jsx'
import Members from './pages/Members.jsx'
import MonthlyOverview from './pages/MonthlyOverview.jsx'
import Reports from './pages/Reports.jsx'

export default function App() {
  return (
    <DataProvider>
      <FeedbackProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="members" element={<Members />} />
              <Route path="deposits" element={<Deposits />} />
              <Route path="market" element={<Market />} />
              <Route path="meals" element={<Meals />} />
              <Route path="monthly" element={<MonthlyOverview />} />
              <Route path="reports" element={<Reports />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </FeedbackProvider>
    </DataProvider>
  )
}
