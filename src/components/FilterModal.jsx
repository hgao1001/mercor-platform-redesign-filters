import { useState, useRef, useEffect, useCallback } from 'react'
import {
  X, ChevronDown, ChevronUp, Search, Check, Plus, RotateCcw,
  DollarSign, MapPin, Clock, Globe, FileText, Briefcase, Code,
} from 'lucide-react'

/* ─── Filter config ─── */
const PAY_RATE_OPTIONS = ['$0 - $25/hr', '$25 - $50/hr', '$50 - $100/hr', '$100 - $200/hr', '$200+/hr']

const LOCATION_OPTIONS = [
  'United States', 'Canada', 'United Kingdom', 'Germany', 'India',
  'Australia', 'Remote (Global)', 'Europe', 'Asia', 'Latin America',
]

const COMMITMENT_OPTIONS = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship']

const DOMAIN_OPTIONS = [
  'Software Engineering', 'Data Science', 'AI / Machine Learning', 'Design',
  'Product Management', 'Marketing', 'Finance', 'Healthcare',
  'Education', 'Legal', 'Sales', 'Operations',
]

const REFERRAL_OPTIONS = ['$0 - $100', '$100 - $250', '$250 - $500', '$500 - $1,000', '$1,000+']

const WORK_ARRANGEMENT_OPTIONS = ['Remote', 'Hybrid', 'On-site']

const STEPS_OPTIONS = ['1 step', '2 steps', '3 steps', '4+ steps']

const INITIAL_FILTERS = {
  payRate: [],
  location: [],
  commitment: [],
  domain: [],
  referralAmount: [],
  workArrangement: [],
  stepsRemaining: [],
}

function countActive(filters) {
  let count = 0
  if (filters.payRate.length) count++
  if (filters.location.length) count++
  if (filters.commitment.length) count++
  if (filters.domain.length) count++
  if (filters.referralAmount.length) count++
  if (filters.workArrangement.length) count++
  if (filters.stepsRemaining.length) count++
  return count
}

/* ─── Section icons ─── */
const SECTION_ICONS = {
  'Pay Rate': DollarSign,
  'Location': MapPin,
  'Commitment': Clock,
  'Domain': Globe,
  'Referral Amount': FileText,
  'Work Arrangement': Briefcase,
  'Application Steps Remaining': Code,
}

/* ─── Collapsible Section ─── */
function FilterSection({ title, defaultOpen = true, count = 0, children }) {
  const [open, setOpen] = useState(defaultOpen)
  const contentRef = useRef(null)
  const [height, setHeight] = useState(defaultOpen ? 'auto' : '0px')
  const Icon = SECTION_ICONS[title]

  useEffect(() => {
    if (open) {
      setHeight(`${contentRef.current.scrollHeight}px`)
      const t = setTimeout(() => setHeight('auto'), 300)
      return () => clearTimeout(t)
    } else {
      setHeight(`${contentRef.current.scrollHeight}px`)
      requestAnimationFrame(() => setHeight('0px'))
    }
  }, [open])

  return (
    <div className="border-b border-surface-100 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 px-1 text-left group focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 outline-none rounded-lg"
      >
        <span className="font-display font-semibold text-sm text-surface-800 flex items-center gap-2.5">
          {Icon && <Icon size={15} className="text-surface-400" strokeWidth={1.8} aria-hidden="true" />}
          {title}
          {count > 0 && (
            <span className="inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold bg-primary-600 text-white rounded-full">
              {count}
            </span>
          )}
        </span>
        <span className="text-surface-400 group-hover:text-surface-600 transition-colors">
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-[height] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ height }}
      >
        <div className="pb-4 px-1">{children}</div>
      </div>
    </div>
  )
}

/* ─── Checkbox group ─── */
function CheckboxGroup({ options, selected, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      {options.map((opt) => {
        const checked = selected.includes(opt)
        return (
          <label
            key={opt}
            className="flex items-center gap-3 cursor-pointer group py-0.5"
          >
            <span className={`w-[18px] h-[18px] rounded-md border-2 flex items-center justify-center transition-[border-color,background-color] duration-200 ${
              checked
                ? 'border-primary-600 bg-primary-600'
                : 'border-surface-300 group-hover:border-surface-400'
            }`}>
              {checked && <Check size={12} className="text-white" strokeWidth={3} />}
            </span>
            <span className="text-sm text-surface-700 group-hover:text-surface-900 transition-colors">
              {opt}
            </span>
          </label>
        )
      })}
    </div>
  )
}

/* ─── Searchable Multi-select ─── */
function SearchableMultiSelect({ options, selected, onChange, placeholder }) {
  const [query, setQuery] = useState('')
  const filtered = options.filter(
    (o) => o.toLowerCase().includes(query.toLowerCase()) && !selected.includes(o)
  )

  return (
    <div className="space-y-3">
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {selected.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-primary-50 text-primary-700 rounded-lg border border-primary-200"
            >
              {item}
              <button
                onClick={() => onChange(selected.filter((s) => s !== item))}
                className="hover:bg-primary-100 rounded-sm p-0.5 transition-colors"
                aria-label={`Remove ${item}`}
              >
                <X size={10} strokeWidth={3} />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" aria-hidden="true" />
        <input
          type="search"
          name="filter-search"
          aria-label={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-8 pr-3 py-2.5 text-sm bg-surface-50 border border-surface-200 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/20 focus-visible:border-primary-400 transition-[border-color,box-shadow] duration-200"
        />
      </div>
      {query && filtered.length > 0 && (
        <div className="border border-surface-200 rounded-xl bg-white max-h-32 overflow-y-auto custom-scrollbar">
          {filtered.map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange([...selected, opt]); setQuery('') }}
              className="w-full text-left px-3 py-2 text-sm text-surface-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ═══════════════ MAIN MODAL ═══════════════ */
export default function FilterModal({ isOpen, onClose, onApply, totalResults = 247 }) {
  const [filters, setFilters] = useState(INITIAL_FILTERS)
  const backdropRef = useRef(null)
  const activeCount = countActive(filters)

  const resultCount = Math.max(1, totalResults - activeCount * 28)

  const clearAll = () => setFilters(INITIAL_FILTERS)

  const update = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={onClose}
        className="absolute inset-0 bg-surface-900/40 backdrop-blur-sm animate-[fade-in_0.2s_ease]"
        style={{ animation: 'fade-in 0.2s ease' }}
      />

      {/* Modal */}
      <div
        className="
          relative z-10 bg-white flex flex-col
          max-md:fixed max-md:inset-x-0 max-md:bottom-0 max-md:rounded-t-3xl max-md:max-h-[92vh] max-md:animate-slide-up
          md:rounded-2xl md:max-w-[540px] md:w-full md:max-h-[85vh] md:animate-scale-in md:shadow-modal
        "
        role="dialog"
        aria-modal="true"
        aria-label="Filter opportunities"
      >
        {/* Mobile drag handle */}
        <div className="md:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-surface-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-100">
          <h2 className="font-display font-bold text-lg text-surface-900">Filters</h2>
          <div className="flex items-center gap-3">
            {activeCount > 0 && (
              <button
                onClick={clearAll}
                className="flex items-center gap-1.5 text-xs font-medium text-surface-500 hover:text-primary-600 transition-colors"
              >
                <RotateCcw size={13} aria-hidden="true" />
                Clear all
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-surface-400 hover:bg-surface-100 hover:text-surface-600 transition-colors"
              aria-label="Close filters"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-6 overscroll-contain">
          <FilterSection title="Pay Rate" count={filters.payRate.length}>
            <CheckboxGroup
              options={PAY_RATE_OPTIONS}
              selected={filters.payRate}
              onChange={(v) => update('payRate', v)}
            />
          </FilterSection>

          <FilterSection title="Location" count={filters.location.length}>
            <SearchableMultiSelect
              options={LOCATION_OPTIONS}
              selected={filters.location}
              onChange={(v) => update('location', v)}
              placeholder="Search locations\u2026"
            />
          </FilterSection>

          <FilterSection title="Commitment" count={filters.commitment.length}>
            <CheckboxGroup
              options={COMMITMENT_OPTIONS}
              selected={filters.commitment}
              onChange={(v) => update('commitment', v)}
            />
          </FilterSection>

          <FilterSection title="Domain" count={filters.domain.length}>
            <SearchableMultiSelect
              options={DOMAIN_OPTIONS}
              selected={filters.domain}
              onChange={(v) => update('domain', v)}
              placeholder="Search domains\u2026"
            />
          </FilterSection>

          <FilterSection title="Referral Amount" count={filters.referralAmount.length}>
            <CheckboxGroup
              options={REFERRAL_OPTIONS}
              selected={filters.referralAmount}
              onChange={(v) => update('referralAmount', v)}
            />
          </FilterSection>

          <FilterSection title="Work Arrangement" count={filters.workArrangement.length}>
            <CheckboxGroup
              options={WORK_ARRANGEMENT_OPTIONS}
              selected={filters.workArrangement}
              onChange={(v) => update('workArrangement', v)}
            />
          </FilterSection>

          <FilterSection title="Application Steps Remaining" count={filters.stepsRemaining.length} defaultOpen={false}>
            <CheckboxGroup
              options={STEPS_OPTIONS}
              selected={filters.stepsRemaining}
              onChange={(v) => update('stepsRemaining', v)}
            />
          </FilterSection>
        </div>

        {/* Footer CTA */}
        <div className="px-6 py-4 border-t border-surface-100 bg-white/80 backdrop-blur-sm rounded-b-2xl max-md:rounded-b-none max-md:pb-8">
          <button
            onClick={() => { onApply(filters); onClose() }}
            className="w-full py-3 px-6 bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white font-display font-semibold text-sm rounded-xl transition-colors duration-200 active:scale-[0.98]"
          >
            Show {resultCount} results
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0 }
          to { opacity: 1 }
        }
      `}</style>
    </div>
  )
}

export { countActive, INITIAL_FILTERS }
