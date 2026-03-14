import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import ExplorePage from './components/ExplorePage'
import JobDetailPage from './components/JobDetailPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="min-h-dvh bg-surface-50">
      <ScrollToTop />
      <Sidebar />
      <main className="md:ml-[72px] min-h-dvh">
        <Routes>
          <Route path="/" element={<ExplorePage />} />
          <Route path="/jobs/:id" element={<JobDetailPage />} />
        </Routes>
      </main>
    </div>
  )
}
