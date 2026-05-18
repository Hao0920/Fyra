import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useThemeStore } from './stores/useThemeStore'
import { useSyncStore } from './stores/useSyncStore'
import Layout from './components/layout/Layout'
import Dashboard from './app/page'
import RecordPage from './app/record/page'
import AccountsPage from './app/accounts/page'
import ProjectsPage from './app/projects/page'
import BudgetsPage from './app/budgets/page'
import CalendarPage from './app/calendar/page'
import SearchPage from './app/search/page'
import SettingsPage from './app/settings/page'
import LoginPage from './app/login/page'
import { Toaster } from './components/ui/toaster'

export default function App() {
  const { initTheme } = useThemeStore()
  const { initSync } = useSyncStore()

  useEffect(() => {
    initTheme()
    initSync()
  }, [])

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/record" element={<RecordPage />} />
              <Route path="/accounts" element={<AccountsPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/budgets" element={<BudgetsPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </Layout>
        } />
      </Routes>
      <Toaster />
    </>
  )
}