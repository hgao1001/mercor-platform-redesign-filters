import { MapPin, Clock, DollarSign, Bookmark, ArrowRight, Briefcase } from 'lucide-react'

const jobs = [
  {
    id: 1,
    title: 'Senior ML Engineer',
    company: 'Anthropic',
    logo: 'A',
    logoColor: 'from-primary-500 to-primary-700',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$220k - $340k',
    matchScore: 96,
    tags: ['Python', 'PyTorch', 'LLMs', 'Distributed Systems'],
    posted: '2h ago',
  },
  {
    id: 2,
    title: 'Staff Frontend Engineer',
    company: 'Stripe',
    logo: 'S',
    logoColor: 'from-accent-500 to-accent-700',
    location: 'Remote',
    type: 'Full-time',
    salary: '$200k - $280k',
    matchScore: 93,
    tags: ['React', 'TypeScript', 'Design Systems', 'Performance'],
    posted: '5h ago',
  },
  {
    id: 3,
    title: 'AI Product Manager',
    company: 'OpenAI',
    logo: 'O',
    logoColor: 'from-surface-700 to-surface-900',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$190k - $300k',
    matchScore: 89,
    tags: ['Product Strategy', 'AI/ML', 'Go-to-Market', 'B2B'],
    posted: '1d ago',
  },
  {
    id: 4,
    title: 'Backend Engineer',
    company: 'Vercel',
    logo: 'V',
    logoColor: 'from-surface-800 to-surface-950',
    location: 'Remote',
    type: 'Full-time',
    salary: '$170k - $250k',
    matchScore: 91,
    tags: ['Node.js', 'Go', 'Edge Computing', 'Serverless'],
    posted: '3h ago',
  },
  {
    id: 5,
    title: 'Design Engineer',
    company: 'Linear',
    logo: 'L',
    logoColor: 'from-pop-violet to-primary-700',
    location: 'Remote',
    type: 'Full-time',
    salary: '$160k - $220k',
    matchScore: 87,
    tags: ['Figma', 'React', 'CSS', 'Motion Design'],
    posted: '8h ago',
  },
  {
    id: 6,
    title: 'Data Scientist',
    company: 'Databricks',
    logo: 'D',
    logoColor: 'from-pop-rose to-pop-pink',
    location: 'Seattle, WA',
    type: 'Full-time',
    salary: '$180k - $260k',
    matchScore: 85,
    tags: ['SQL', 'Python', 'Spark', 'ML Ops'],
    posted: '12h ago',
  },
]

function MatchBadge({ score }) {
  const color =
    score >= 95
      ? 'text-accent-700 bg-accent-50 border-accent-200'
      : score >= 90
        ? 'text-primary-700 bg-primary-50 border-primary-200'
        : 'text-surface-600 bg-surface-100 border-surface-200'

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold tabular-nums rounded-full border ${color}`}>
      {score}% match
    </span>
  )
}

function JobCard({ job }) {
  return (
    <article className="group relative flex flex-col p-6 bg-white rounded-xl border border-surface-200/80 shadow-card hover:shadow-card-hover hover:border-surface-300 transition-[border-color,box-shadow] duration-300">
      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${job.logoColor} text-white text-sm font-bold shadow-sm`}>
            {job.logo}
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-surface-900 group-hover:text-primary-700 transition-colors duration-200 truncate">
              {job.title}
            </h3>
            <p className="text-sm text-surface-500">{job.company}</p>
          </div>
        </div>
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg text-surface-300 hover:text-primary-500 hover:bg-primary-50 transition-colors duration-200 focus-visible:focus-ring"
          aria-label={`Bookmark ${job.title}`}
        >
          <Bookmark className="h-4.5 w-4.5" />
        </button>
      </div>

      {/* Meta */}
      <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4 text-sm text-surface-500">
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-surface-400" />
          {job.location}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-surface-400" />
          {job.type}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <DollarSign className="h-3.5 w-3.5 text-surface-400" />
          {job.salary}
        </span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        {job.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 text-xs font-medium text-surface-600 bg-surface-100 rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between pt-4 border-t border-surface-100">
        <MatchBadge score={job.matchScore} />
        <span className="text-xs text-surface-400">{job.posted}</span>
      </div>
    </article>
  )
}

export default function FeaturedJobs() {
  return (
    <section id="jobs" className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-primary-50 border border-primary-100 text-primary-600">
              <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-wider">Featured Roles</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-surface-900" style={{ textWrap: 'balance' }}>
              Curated for you
            </h2>
            <p className="mt-2 text-lg text-surface-500 max-w-lg">
              Hand-picked opportunities from top companies, ranked by your AI match score.
            </p>
          </div>
          <a
            href="#"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors rounded-md focus-visible:focus-ring"
          >
            View all jobs
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </div>

        {/* Grid — consistent gap-6 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  )
}
