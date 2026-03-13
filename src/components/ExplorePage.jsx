import { useState } from 'react'
import {
  Search, SlidersHorizontal, Gift, ChevronDown, Zap,
  ChevronLeft, ChevronRight, MoreHorizontal,
} from 'lucide-react'
import Sidebar from './Sidebar'
import JobCard from './JobCard'
import FilterModal from './FilterModal'
import { countActive, INITIAL_FILTERS } from './FilterModal'

/* ─── Mock job data (matching screenshot) ─── */
const JOBS = [
  { id: 1, title: 'Software Expert (Blender, Godot, GIMP, R, W...', salary: '$65 / hour', badge: 'Strong applicant', avatars: 3, hired: '726 hired this month', reward: '$260' },
  { id: 2, title: 'Multilingual Music Expert', salary: '$20 - $40 / hour', badge: 'Strong applicant', avatars: 3, hired: '9 hired this month', reward: '$160' },
  { id: 3, title: 'Multilingual Politics Expert', salary: '$30 - $60 / hour', badge: 'Strong applicant', avatars: 3, hired: '18 hired this month', reward: '$240' },
  { id: 4, title: 'Special Projects Software Engineers', salary: '$100 - $200 / hour', badge: 'Strong applicant', avatars: 2, hired: '2 hired this month', reward: '$800' },
  { id: 5, title: 'Multilingual Religion and Philosophy Expert', salary: '$30 - $60 / hour', badge: 'Strong applicant', avatars: 2, hired: '9 hired this month', reward: '$240' },
  { id: 6, title: 'Multilingual Video Games Expert', salary: '$20 - $40 / hour', badge: 'Strong applicant', avatars: 3, hired: '18 hired this month', reward: '$160' },
  { id: 7, title: 'Graphic & UX/UI Designer Tal...', salary: null, badge: '1-click apply', avatars: 0, hired: null, reward: null, subtitle: 'Talent network' },
  { id: 8, title: 'Environmental Science Evaluators', salary: '$40 - $60 / hour', avatars: 3, hired: '47 hired this month', reward: '$240' },
  { id: 9, title: 'Hebrew Professional Voice Actor', salary: '$45 - $225 / hour', avatars: 0, hired: null, reward: '$900' },
  { id: 10, title: 'Software Expert (Development & Programm...', salary: '$65 / hour', avatars: 3, hired: '226 hired this month', reward: '$260' },
  { id: 11, title: 'Python SWE', salary: '$100 / hour', avatars: 3, hired: '4 hired this month', reward: '$500' },
  { id: 12, title: 'Physics (PhD)', salary: '$73.29 / hour', avatars: 2, hired: '55 hired this month', reward: '$300' },
  { id: 13, title: 'Senior Project Manager, Retail Tech', salary: '$9.6K - $13.6K / month', w2: true, avatars: 0, hired: null, reward: null },
  { id: 14, title: 'Software Expert (Creative Software)', salary: '$100 / hour', avatars: 2, hired: '83 hired this month', reward: '$400' },
  { id: 15, title: 'Software Expert (Operating System)', salary: '$100 / hour', avatars: 3, hired: '407 hired this month', reward: '$400' },
  { id: 16, title: 'Software Expert (Office Suite)', salary: '$100 / hour', avatars: 3, hired: '86 hired this month', reward: '$400' },
]

const TOTAL_PAGES = 10
const TOTAL_RESULTS = 247

export default function ExplorePage() {
  const [filterOpen, setFilterOpen] = useState(false)
  const [filters, setFilters] = useState(INITIAL_FILTERS)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('Best match')

  const activeFilterCount = countActive(filters)

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  const visiblePages = () => {
    const pages = []
    if (TOTAL_PAGES <= 7) {
      for (let i = 1; i <= TOTAL_PAGES; i++) pages.push(i)
      return pages
    }
    pages.push(1, 2, 3, 4)
    if (currentPage > 4 && currentPage < TOTAL_PAGES - 1) {
      pages.push(currentPage)
    }
    pages.push(TOTAL_PAGES - 1, TOTAL_PAGES)
    return [...new Set(pages)].sort((a, b) => a - b)
  }

  return (
    <div className="min-h-dvh bg-surface-50">
      <Sidebar />

      {/* Main content */}
      <main className="md:ml-[72px] min-h-dvh">
        {/* Page content */}
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-8">
          {/* Title */}
          <h1 className="font-display font-bold text-2xl text-surface-900 tracking-tight text-wrap-balance mb-4">
            Explore opportunities
          </h1>

          {/* Toolbar row */}
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            {/* Filters button */}
            <button
              onClick={() => setFilterOpen(true)}
              className={`flex items-center gap-2 py-2 text-sm font-medium shrink-0 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 outline-none rounded transition-colors duration-200 ${
                activeFilterCount > 0
                  ? 'text-primary-700'
                  : 'text-surface-600 hover:text-primary-600'
              }`}
            >
              <SlidersHorizontal size={16} strokeWidth={2} aria-hidden="true" />
              <span className="font-display font-semibold">Filters</span>
              {activeFilterCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[11px] font-bold bg-primary-600 text-white rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Search bar */}
            <div className="relative w-full max-w-[320px]">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400" aria-hidden="true" />
              <input
                type="search"
                name="search"
                aria-label="Search opportunities"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search opportunities\u2026"
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-surface-50 border border-surface-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/30 focus-visible:border-primary-400 focus-visible:bg-white transition-[border-color,background-color,box-shadow] duration-200 placeholder:text-surface-400"
              />
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Sort dropdown */}
            <button className="flex items-center gap-1.5 px-3.5 py-2.5 text-sm font-medium text-surface-600 bg-white border border-surface-200 rounded-lg hover:border-surface-300 transition-[border-color] duration-200 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 outline-none shrink-0">
              <Zap size={14} className="text-accent-500" aria-hidden="true" />
              <span className="max-sm:hidden">{sortBy}</span>
              <span className="sm:hidden">Sort</span>
              <ChevronDown size={14} className="text-surface-400" aria-hidden="true" />
            </button>

            {/* Refer & earn */}
            <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 active:bg-primary-800 transition-colors duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 outline-none shrink-0">
              <Gift size={15} aria-hidden="true" />
              <span className="max-sm:hidden">Refer & earn</span>
            </button>
          </div>

          {/* Active filter chips */}
          {activeFilterCount > 0 && (
            <div className="hidden md:flex items-center gap-2 flex-wrap mb-5">
              {Object.entries(filters).map(([key, value]) =>
                Array.isArray(value) && value.map((v) => (
                  <FilterChip
                    key={`${key}-${v}`}
                    label={v}
                    onRemove={() => setFilters({ ...filters, [key]: value.filter((x) => x !== v) })}
                  />
                ))
              )}
            </div>
          )}

          {/* Job cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {JOBS.map((job, i) => (
              <JobCard key={job.id} job={job} index={i} />
            ))}
          </div>

          {/* Pagination */}
          <nav className="mt-10 flex items-center justify-center gap-1" aria-label="Pagination">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-surface-500 hover:text-surface-700 hover:bg-surface-100 rounded-lg transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 outline-none"
            >
              <ChevronLeft size={16} />
              <span className="max-sm:hidden">Previous</span>
            </button>

            {visiblePages().map((page, i, arr) => {
              const showEllipsis = i > 0 && page - arr[i - 1] > 1
              return (
                <div key={page} className="flex items-center">
                  {showEllipsis && (
                    <span className="w-9 h-9 flex items-center justify-center text-surface-400">
                      <MoreHorizontal size={16} />
                    </span>
                  )}
                  <button
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 outline-none ${
                      currentPage === page
                        ? 'bg-primary-600 text-white shadow-sm'
                        : 'text-surface-600 hover:bg-surface-100 hover:text-surface-900'
                    }`}
                  >
                    {page}
                  </button>
                </div>
              )
            })}

            <button
              onClick={() => setCurrentPage(Math.min(TOTAL_PAGES, currentPage + 1))}
              disabled={currentPage === TOTAL_PAGES}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-surface-500 hover:text-surface-700 hover:bg-surface-100 rounded-lg transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 outline-none"
            >
              <span className="max-sm:hidden">Next</span>
              <ChevronRight size={16} />
            </button>
          </nav>
        </div>
      </main>

      {/* Filter modal */}
      <FilterModal
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        onApply={handleApplyFilters}
        totalResults={TOTAL_RESULTS}
      />
    </div>
  )
}

/* ─── Small filter chip for active filters ─── */
function FilterChip({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-primary-50 text-primary-700 rounded-lg border border-primary-200 animate-scale-in">
      {label}
      <button
        onClick={onRemove}
        className="hover:bg-primary-100 rounded-sm p-0.5 transition-colors"
      >
        <span className="sr-only">Remove {label} filter</span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2 2L8 8M8 2L2 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </span>
  )
}
