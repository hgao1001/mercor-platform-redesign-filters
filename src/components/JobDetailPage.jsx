import { useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft, MapPin, Briefcase, Bookmark,
  ChevronUp, ChevronDown, Check, Circle,
  Pencil, Users as UsersIcon, TrendingUp,
  Link as LinkIcon, ChevronLeft, ChevronRight, Sparkles,
} from 'lucide-react'
import { JOBS } from '../data/jobs'

const avatarColors = [
  'bg-primary-400',
  'bg-pop-rose',
  'bg-teal-500',
  'bg-pop-orange',
  'bg-pop-violet',
  'bg-pop-pink',
]

export default function JobDetailPage() {
  const { id } = useParams()
  const job = JOBS.find((j) => j.id === Number(id))
  const [appOpen, setAppOpen] = useState(true)
  const [bookmarked, setBookmarked] = useState(false)
  const [copied, setCopied] = useState(false)
  const scrollRef = useRef(null)

  if (!job) {
    return (
      <div className="max-w-[960px] mx-auto px-6 lg:px-10 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700 transition-colors duration-200 mb-8"
        >
          <ArrowLeft size={15} />
          View all opportunities
        </Link>
        <div className="text-center py-24">
          <h1 className="font-display font-bold text-2xl text-surface-900 mb-2">Job not found</h1>
          <p className="text-surface-500">This opportunity may no longer be available.</p>
        </div>
      </div>
    )
  }

  const completedSteps = job.applicationSteps.filter((s) => s.status === 'completed').length
  const totalSteps = job.applicationSteps.length
  const progressPercent = Math.round((completedSteps / totalSteps) * 100)
  const referralLink = `https://t.mercor.com/${btoa(String(job.id)).slice(0, 6)}`
  const similarJobs = JOBS.filter((j) => j.id !== job.id).slice(0, 6)

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const scroll = (dir) => {
    if (!scrollRef.current) return
    const cardWidth = scrollRef.current.querySelector('a')?.offsetWidth || 320
    scrollRef.current.scrollBy({ left: dir * (cardWidth + 12), behavior: 'smooth' })
  }

  return (
    <div className="max-w-[1120px] mx-auto px-6 lg:px-10 py-8 animate-fade-in-up">
      {/* ← View all opportunities */}
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors duration-200 mb-7 group"
      >
        <ArrowLeft size={15} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
        View all opportunities
      </Link>

      <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-10">
        {/* ─── Main column ─── */}
        <div className="min-w-0">
          {/* Header: Title + Salary */}
          <div className="flex items-start justify-between gap-6 mb-4">
            <h1 className="font-display font-bold text-[22px] lg:text-[26px] text-surface-900 tracking-tight leading-tight">
              {job.fullTitle}
            </h1>
            {job.salaryRange && (
              <div className="text-right shrink-0">
                <p className="font-display font-bold text-[22px] lg:text-[26px] text-surface-900 leading-tight tracking-tight">
                  {job.salaryRange}
                </p>
                <p className="text-sm text-surface-400 mt-0.5">{job.salaryUnit}</p>
              </div>
            )}
          </div>

          {/* Meta row */}
          <div className="flex items-center gap-4 flex-wrap text-sm text-surface-500 mb-6">
            <span className="inline-flex items-center gap-1.5">
              <Briefcase size={14} className="text-surface-400" aria-hidden="true" />
              {job.contractType}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} className="text-surface-400" aria-hidden="true" />
              {job.location}
            </span>
            {job.avatars > 0 && (
              <div className="flex -space-x-1.5">
                {Array.from({ length: Math.min(job.avatars, 3) }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-6 h-6 rounded-full ${avatarColors[i % avatarColors.length]} ring-2 ring-white flex items-center justify-center`}
                  >
                    <span className="text-white text-[9px] font-bold">
                      {String.fromCharCode(65 + i)}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {job.hired && (
              <span className="inline-flex items-center gap-1 text-surface-400">
                <TrendingUp size={13} className="text-surface-300" aria-hidden="true" />
                {job.hired}
              </span>
            )}
          </div>

          {/* Posted by */}
          <div className="flex items-center justify-between py-4 border-t border-b border-surface-200 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-surface-900 flex items-center justify-center">
                <span className="text-white text-lg font-bold font-display">M</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-surface-900">Posted by {job.company}</p>
                <p className="text-xs text-surface-400">{job.companyUrl}</p>
              </div>
            </div>
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`w-9 h-9 rounded-lg flex items-center justify-center border transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
                bookmarked
                  ? 'bg-primary-50 border-primary-200 text-primary-600'
                  : 'border-surface-200 text-surface-400 hover:text-surface-600 hover:bg-surface-50'
              }`}
              aria-label={bookmarked ? 'Unsave job' : 'Save job'}
            >
              <Bookmark size={16} fill={bookmarked ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Application progress */}
          <div className="bg-white rounded-xl border border-surface-200 mb-8">
            <button
              onClick={() => setAppOpen(!appOpen)}
              className="w-full flex items-center justify-between px-6 py-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-inset rounded-xl"
            >
              <span className="font-display font-semibold text-surface-900">Application</span>
              {appOpen ? (
                <ChevronUp size={18} className="text-surface-400" />
              ) : (
                <ChevronDown size={18} className="text-surface-400" />
              )}
            </button>

            {appOpen && (
              <div className="px-6 pb-6">
                <div className="flex items-center justify-between text-sm mb-2.5">
                  <span className="text-surface-500">
                    {completedSteps} of {totalSteps} steps completed
                  </span>
                  <span className="text-surface-500 font-medium">{progressPercent}%</span>
                </div>

                <div className="h-2 bg-surface-100 rounded-full overflow-hidden mb-5">
                  <div
                    className="h-full bg-primary-600 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <div className="space-y-0">
                  {job.applicationSteps.map((step, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-3 border-b border-surface-100 last:border-b-0"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-sm text-surface-800 font-medium">{step.name}</span>
                        {step.core && (
                          <span className="inline-flex px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-surface-100 text-surface-500 rounded">
                            Core
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {step.status === 'completed' ? (
                          <>
                            <span className="text-xs text-surface-400">
                              {step.date ? `Completed on ${step.date}` : 'Completed'}
                            </span>
                            <span className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center">
                              <Check size={12} className="text-white" strokeWidth={3} />
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="text-xs text-surface-400">Not done</span>
                            <Circle size={20} className="text-surface-300" strokeWidth={1.5} />
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-start gap-2 mt-4 pt-3 border-t border-surface-100">
                  <span className="w-4 h-4 rounded-full border border-surface-300 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[9px] text-surface-400 font-bold">i</span>
                  </span>
                  <p className="text-xs text-surface-400 leading-relaxed">
                    All application steps are reused whenever another role requires the same step, so you never have to upload your resume or take the same interview twice
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* ─── Job description body ─── */}
          <hr className="border-surface-200 mb-8" />

          <div className="space-y-7 mb-10">
            {/* Location + Language */}
            <div>
              <span className="text-sm font-semibold text-surface-900">Location: </span>
              <span className="text-sm text-surface-600">
                {job.location}
                {job.locationNote && <> ({job.locationNote})</>}
              </span>
            </div>
            <div>
              <span className="text-sm font-semibold text-surface-900">Fluent Language Skills Required: </span>
              <span className="text-sm text-surface-600">{job.language}</span>
            </div>

            {/* 1. Role Overview */}
            <div>
              <h3 className="font-semibold text-[15px] text-surface-900 mb-2">Role Overview</h3>
              <p className="text-sm text-surface-600 leading-relaxed">{job.roleOverview}</p>
            </div>

            {/* 2. Key Responsibilities */}
            <div>
              <h3 className="font-semibold text-[15px] text-surface-900 mb-3">Key Responsibilities</h3>
              <ul className="space-y-2">
                {job.responsibilities.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-surface-600 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-surface-400 shrink-0 mt-[7px]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Ideal Qualifications */}
            <div>
              <h3 className="font-semibold text-[15px] text-surface-900 mb-3">Ideal Qualifications</h3>
              <ul className="space-y-2">
                {job.qualifications.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-surface-600 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-surface-400 shrink-0 mt-[7px]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. More About the Opportunity */}
            <div>
              <h3 className="font-semibold text-[15px] text-surface-900 mb-2">More About the Opportunity</h3>
              <p className="text-sm text-surface-600 leading-relaxed">{job.commitment}</p>
            </div>

            {/* 5. About the Company */}
            <div>
              <h3 className="font-semibold text-[15px] text-surface-900 mb-2">About {job.companyInfo.name}</h3>
              <p className="text-sm text-surface-600 leading-relaxed">{job.companyInfo.about}</p>
            </div>
          </div>

          {/* ─── Referral section ─── */}
          {job.reward && (
            <>
              <hr className="border-surface-200 mb-8" />
              <div className="mb-10">
                <h2 className="font-display font-bold text-lg text-surface-900 mb-3">
                  Earn up to {job.reward} by referring
                </h2>
                <p className="text-sm text-surface-600 leading-relaxed mb-5">
                  Share the referral link below, and{' '}
                  <span className="font-semibold text-surface-900">earn up to {job.reward} for each successful referral</span>{' '}
                  through this unique link. There's no limit on how many people you can refer. Restrictions may apply.{' '}
                  <button className="font-medium text-surface-900 underline underline-offset-2 hover:text-primary-600 transition-colors">
                    Learn more
                  </button>
                </p>

                {/* Referral link input */}
                <div className="flex items-center gap-0 mb-4">
                  <div className="flex items-center gap-2.5 flex-1 min-w-0 px-4 py-2.5 bg-surface-50 border border-surface-200 rounded-l-lg border-r-0">
                    <LinkIcon size={15} className="text-surface-400 shrink-0" aria-hidden="true" />
                    <span className="text-sm text-primary-600 truncate">{referralLink}</span>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="px-5 py-2.5 text-sm font-medium text-surface-700 bg-white border border-surface-200 rounded-r-lg hover:bg-surface-50 transition-colors duration-200 shrink-0 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 outline-none"
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>

                <p className="text-sm text-surface-500">
                  Don't know who to refer? Find relevant LinkedIn connections{' '}
                  <button className="font-medium text-surface-900 underline underline-offset-2 hover:text-primary-600 transition-colors">
                    here
                  </button>.
                </p>
              </div>
            </>
          )}

          {/* ─── Similar Opportunities ─── */}
          <hr className="border-surface-200 mb-8" />
          <div className="mb-4">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display font-bold text-lg text-surface-900">Similar Opportunities</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => scroll(-1)}
                  className="w-9 h-9 rounded-full border border-surface-200 flex items-center justify-center text-surface-400 hover:text-surface-700 hover:bg-surface-50 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary-500 outline-none"
                  aria-label="Scroll left"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => scroll(1)}
                  className="w-9 h-9 rounded-full border border-surface-200 flex items-center justify-center text-surface-400 hover:text-surface-700 hover:bg-surface-50 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary-500 outline-none"
                  aria-label="Scroll right"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            <div
              ref={scrollRef}
              className="flex gap-3 overflow-x-auto pb-4 -mx-1 px-1 snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {similarJobs.map((sJob, i) => (
                <SimilarJobCard key={sJob.id} job={sJob} index={i} />
              ))}
            </div>
          </div>
        </div>

        {/* ─── Right sidebar ─── */}
        <div className="lg:sticky lg:top-8 lg:self-start space-y-4 mb-8 lg:mb-0">
          <div className="bg-white rounded-xl border border-surface-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center ring-2 ring-surface-100">
                  <span className="text-white text-xs font-semibold">K</span>
                </div>
                <span className="text-sm font-medium text-surface-800">Kevin Gao</span>
              </div>
              <button
                className="w-8 h-8 rounded-lg flex items-center justify-center text-surface-400 hover:text-surface-600 hover:bg-surface-50 transition-colors duration-200"
                aria-label="Edit profile"
              >
                <Pencil size={14} />
              </button>
            </div>
            <button className="w-full py-2.5 text-sm font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 active:bg-primary-800 transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 outline-none">
              Continue Application
            </button>
          </div>

          {job.reward && (
            <div className="bg-white rounded-xl border border-surface-200 p-5">
              <button className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-surface-600 border border-surface-200 rounded-lg hover:bg-surface-50 hover:border-surface-300 transition-colors duration-200">
                <UsersIcon size={15} className="text-primary-500" aria-hidden="true" />
                Earn up to {job.reward} by referring
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── Similar job card (horizontal scroll) ─── */
function SimilarJobCard({ job, index }) {
  return (
    <Link
      to={`/jobs/${job.id}`}
      className="group shrink-0 w-[280px] sm:w-[320px] snap-start bg-white rounded-xl border border-surface-200 p-5 flex flex-col justify-between no-underline transition-[border-color,box-shadow] duration-200 hover:border-primary-400 hover:shadow-card-hover"
    >
      <div>
        <h3 className="font-display font-semibold text-[15px] text-surface-900 leading-snug line-clamp-2 mb-1.5">
          {job.fullTitle}
        </h3>
        <p className="text-sm text-surface-500 font-medium mb-3">{job.salary}</p>
        {job.badge && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-teal-50 text-teal-700 border border-teal-100">
            <Sparkles size={11} strokeWidth={2.2} aria-hidden="true" />
            {job.badge}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2 mt-5 pt-3.5 border-t border-surface-100 min-w-0">
        {job.avatars > 0 && (
          <div className="flex -space-x-1.5 shrink-0">
            {Array.from({ length: Math.min(job.avatars, 3) }).map((_, i) => (
              <div
                key={i}
                className={`w-6 h-6 rounded-full ${avatarColors[(index * 3 + i) % avatarColors.length]} ring-2 ring-white flex items-center justify-center`}
              >
                <span className="text-white text-[9px] font-bold">
                  {String.fromCharCode(65 + ((index * 3 + i) % 26))}
                </span>
              </div>
            ))}
          </div>
        )}
        {job.hired && (
          <span className="text-xs text-surface-400 font-medium flex items-center gap-1 truncate">
            <TrendingUp size={11} className="text-surface-300 shrink-0" aria-hidden="true" />
            {job.hired}
          </span>
        )}
      </div>
    </Link>
  )
}
