import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import LandingPage from './components/LandingPage'
import ExplorePage from './components/ExplorePage'
import JobDetailPage from './components/JobDetailPage'
import InterviewSetupPage from './components/InterviewSetupPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

/* Landing page has its own nav, so no sidebar. App pages get the sidebar. */
function AppShell({ children }) {
  return (
    <>
      <Sidebar />
      <main className="md:ml-[72px] min-h-dvh">{children}</main>
    </>
  )
}

export default function App() {
  return (
    <div className="min-h-dvh bg-surface-50">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/explore" element={<AppShell><ExplorePage /></AppShell>} />
        <Route path="/jobs/:id" element={<AppShell><JobDetailPage /></AppShell>} />
        <Route path="/jobs/:id/interview" element={<AppShell><InterviewSetupPage /></AppShell>} />
      </Routes>
    </div>
  )
}
