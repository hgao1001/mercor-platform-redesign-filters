import { Sparkles, CheckCircle, Zap, Users, TrendingUp, ArrowUpRight } from 'lucide-react'

const badgeConfig = {
  'Strong applicant': {
    icon: Sparkles,
    bg: 'bg-teal-50',
    text: 'text-teal-700',
    border: 'border-teal-200',
  },
  '1-click apply': {
    icon: Zap,
    bg: 'bg-primary-50',
    text: 'text-primary-700',
    border: 'border-primary-200',
  },
  'Talent network': {
    icon: Users,
    bg: 'bg-accent-50',
    text: 'text-accent-700',
    border: 'border-accent-200',
  },
  'Contingent Role': {
    icon: CheckCircle,
    bg: 'bg-surface-100',
    text: 'text-surface-600',
    border: 'border-surface-200',
  },
}

const avatarColors = [
  'bg-primary-400',
  'bg-pop-rose',
  'bg-teal-500',
  'bg-pop-orange',
  'bg-pop-violet',
  'bg-pop-pink',
]

export default function JobCard({ job, index }) {
  const badge = job.badge ? badgeConfig[job.badge] : null
  const BadgeIcon = badge?.icon

  return (
    <article
      className="group relative bg-white rounded-lg border-2 border-surface-200/80 p-5 flex flex-col justify-between cursor-pointer animate-fade-in-up transition-[border-color,background-color] duration-200 hover:border-primary-500 hover:bg-primary-500/[0.06]"
      style={{ animationDelay: `${(index % 10) * 0.04}s` }}
    >
      <div>
        {/* Title row with Apply link */}
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-display font-semibold text-[15px] text-surface-900 leading-snug line-clamp-2 min-w-0">
            {job.title}
          </h3>
          <span className="shrink-0 flex items-center gap-0.5 text-sm font-medium text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 translate-y-0.5 group-hover:translate-y-0">
            Apply
            <ArrowUpRight size={14} strokeWidth={2.2} aria-hidden="true" />
          </span>
        </div>

        {/* Salary */}
        <p className="text-sm text-surface-500 font-medium mb-3">
          {job.salary}
        </p>

        {/* Badge */}
        {badge && (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border ${badge.bg} ${badge.text} ${badge.border}`}>
            <BadgeIcon size={12} strokeWidth={2.2} aria-hidden="true" />
            {job.badge}
          </span>
        )}

        {/* W2 indicator */}
        {job.w2 && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-200">
            W2
            <span className="font-normal text-blue-600">Contingent Role</span>
          </span>
        )}
      </div>

      {/* Bottom section */}
      <div className="flex items-center justify-between mt-5 pt-3.5 border-t border-surface-100">
        <div className="flex items-center gap-2 min-w-0">
          {/* Avatar stack */}
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
          {/* Hired count */}
          {job.hired && (
            <span className="text-xs text-surface-400 font-medium flex items-center gap-1 truncate">
              <TrendingUp size={11} className="text-surface-300 shrink-0" aria-hidden="true" />
              {job.hired}
            </span>
          )}
        </div>

        {/* Reward */}
        {job.reward && (
          <span className="flex items-center gap-1 text-xs font-semibold text-surface-500 shrink-0">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="text-surface-400" aria-hidden="true">
              <path d="M8 1L6.5 6H1.5L5.5 9L4 14L8 11L12 14L10.5 9L14.5 6H9.5L8 1Z" fill="currentColor" />
            </svg>
            {job.reward}
          </span>
        )}
      </div>
    </article>
  )
}
