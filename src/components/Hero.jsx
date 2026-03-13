import { ArrowRight, Play, Star } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient mesh */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary-200 rounded-full blur-3xl animate-float" />
          <div className="absolute top-20 right-0 w-80 h-80 bg-accent-200 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-primary-100 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
        </div>
        {/* Subtle grid pattern — references primary-900 token */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, var(--color-primary-900) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-primary-50 border border-primary-200 text-primary-700">
            <Star className="h-3.5 w-3.5 fill-primary-500 text-primary-500" aria-hidden="true" />
            <span className="text-sm font-medium">AI-Powered Matching</span>
            <span className="text-xs text-primary-400">New</span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-in-up-d1 font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-surface-950 leading-[1.08]" style={{ textWrap: 'balance' }}>
            Where top talent meets{' '}
            <span className="relative">
              <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500 bg-clip-text text-transparent">
                exceptional teams
              </span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M2 8.5C50 3.5 100 2 150 4C200 6 250 3.5 298 7" stroke="url(#hero-underline)" strokeWidth="3" strokeLinecap="round" />
                <defs>
                  <linearGradient id="hero-underline" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#4F46E5" />
                    <stop offset="1" stopColor="#14B8A6" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>

          {/* Subheadline */}
          <p className="animate-fade-in-up-d2 mt-8 text-lg sm:text-xl text-surface-500 max-w-2xl mx-auto leading-relaxed" style={{ textWrap: 'balance' }}>
            Our AI analyzes skills, experience, and culture fit to connect you with
            opportunities that actually match — not just keyword hits.
          </p>

          {/* CTAs */}
          <div className="animate-fade-in-up-d3 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 text-base font-semibold text-white bg-primary-700 rounded-xl hover:bg-primary-600 shadow-lg shadow-primary-700/20 hover:shadow-xl hover:shadow-primary-600/25 transition-[background-color,box-shadow] duration-300 active:scale-[0.98] focus-visible:focus-ring"
            >
              Find Your Match
              <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
            <a
              href="#"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 text-base font-semibold text-surface-700 bg-white rounded-xl border border-surface-200 hover:border-surface-300 shadow-sm hover:shadow-md transition-[border-color,box-shadow] duration-300 focus-visible:focus-ring"
            >
              <Play className="h-4 w-4 text-primary-500 fill-primary-500" aria-hidden="true" />
              Watch Demo
            </a>
          </div>

          {/* Social proof bar */}
          <div className="animate-fade-in-up-d4 mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 text-sm text-surface-400">
            <div className="flex items-center gap-2">
              {/* Avatar stack */}
              <div className="flex -space-x-2.5">
                {[
                  'bg-gradient-to-br from-primary-400 to-primary-600',
                  'bg-gradient-to-br from-accent-400 to-accent-600',
                  'bg-gradient-to-br from-pop-orange to-pop-rose',
                  'bg-gradient-to-br from-pop-rose to-pop-pink',
                ].map((gradient, i) => (
                  <div
                    key={i}
                    className={`h-8 w-8 rounded-full ${gradient} border-2 border-white flex items-center justify-center text-xs font-bold text-white`}
                  >
                    {['A', 'J', 'M', 'S'][i]}
                  </div>
                ))}
              </div>
              <span className="font-medium text-surface-600">12,000+ matched</span>
            </div>
            <div className="hidden sm:block w-px h-5 bg-surface-200" aria-hidden="true" />
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-rating-400 text-rating-400" aria-hidden="true" />
              ))}
              <span className="ml-1 font-medium text-surface-600">4.9/5 rating</span>
            </div>
            <div className="hidden sm:block w-px h-5 bg-surface-200" aria-hidden="true" />
            <span className="font-medium text-surface-600">500+ companies hiring</span>
          </div>
        </div>
      </div>
    </section>
  )
}
