import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    quote:
      'Mercor matched me with a role I never would have found on my own. The AI understood not just my skills, but what I actually wanted in my next move.',
    name: 'Sarah Chen',
    role: 'Senior ML Engineer',
    company: 'Now at Anthropic',
    avatar: 'SC',
    avatarGradient: 'from-primary-400 to-primary-600',
    rating: 5,
  },
  {
    id: 2,
    quote:
      'We reduced our time-to-hire by 60%. The candidates Mercor sends are pre-vetted and genuinely excited about the role. It\'s a game changer for our recruiting team.',
    name: 'Marcus Johnson',
    role: 'VP of Engineering',
    company: 'Stripe',
    avatar: 'MJ',
    avatarGradient: 'from-accent-400 to-accent-600',
    rating: 5,
  },
  {
    id: 3,
    quote:
      'After months of applying to jobs with zero response, I got three interviews in my first week on Mercor. The match scores were spot on — every role felt like a fit.',
    name: 'Priya Sharma',
    role: 'Full-Stack Developer',
    company: 'Now at Vercel',
    avatar: 'PS',
    avatarGradient: 'from-pop-rose to-pop-pink',
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header — standardized mb-14 */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-rating-50 border border-rating-100 text-rating-600">
            <Star className="h-3.5 w-3.5 fill-rating-400" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-wider">Testimonials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-surface-900" style={{ textWrap: 'balance' }}>
            Loved by talent and teams
          </h2>
          <p className="mt-3 text-lg text-surface-500 max-w-2xl mx-auto">
            Hear from engineers, managers, and companies who found their perfect match.
          </p>
        </div>

        {/* Cards — consistent gap-6, proper responsive cols */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <article
              key={t.id}
              className="group relative flex flex-col p-8 bg-surface-50 rounded-xl border border-surface-200/60 hover:border-surface-300 hover:shadow-card-hover transition-[border-color,box-shadow] duration-300"
            >
              {/* Quote icon */}
              <Quote className="h-8 w-8 text-primary-200 mb-5" strokeWidth={1.5} aria-hidden="true" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-4" aria-label={`${t.rating} out of 5 stars`}>
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-rating-400 text-rating-400" aria-hidden="true" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-surface-700 leading-relaxed flex-1 mb-8">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3.5 pt-6 border-t border-surface-200/60">
                <div className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${t.avatarGradient} text-white text-sm font-bold shadow-sm`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-surface-900">{t.name}</p>
                  <p className="text-sm text-surface-500">
                    {t.role} <span className="text-surface-300" aria-hidden="true">/</span> {t.company}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Stats bar */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 py-10 px-8 bg-surface-50 rounded-2xl border border-surface-200/60">
          {[
            { value: '12,000+', label: 'Candidates matched' },
            { value: '500+', label: 'Companies hiring' },
            { value: '96%', label: 'Match satisfaction' },
            { value: '< 7 days', label: 'Avg. time to hire' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-surface-900 tabular-nums">{stat.value}</p>
              <p className="mt-1 text-sm text-surface-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
