import { UserPlus, Brain, Handshake, ArrowRight } from 'lucide-react'

const steps = [
  {
    step: '01',
    icon: UserPlus,
    title: 'Create your profile',
    description:
      'Sign up and tell us about your skills, experience, and what you\'re looking for. Our AI starts learning your preferences immediately.',
    accent: 'primary',
    detail: '5 min setup',
  },
  {
    step: '02',
    icon: Brain,
    title: 'AI finds your matches',
    description:
      'Our matching engine analyzes thousands of roles against your profile — evaluating technical fit, culture alignment, and growth potential.',
    accent: 'accent',
    detail: 'Avg. 24h to first match',
  },
  {
    step: '03',
    icon: Handshake,
    title: 'Interview & get hired',
    description:
      'Connect directly with hiring teams. No cold applications, no black holes — just warm introductions to companies that want you.',
    accent: 'primary',
    detail: '3x faster than traditional',
  },
]

const accentStyles = {
  primary: {
    iconBg: 'bg-primary-50',
    iconColor: 'text-primary-600',
    badge: 'bg-primary-50 text-primary-600 border-primary-100',
    number: 'text-primary-200',
    ring: 'group-hover:ring-primary-200',
  },
  accent: {
    iconBg: 'bg-accent-50',
    iconColor: 'text-accent-600',
    badge: 'bg-accent-50 text-accent-600 border-accent-100',
    number: 'text-accent-200',
    ring: 'group-hover:ring-accent-200',
  },
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-surface-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header — standardized mb-14 */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-accent-50 border border-accent-100 text-accent-600">
            <Brain className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-wider">How It Works</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-surface-900" style={{ textWrap: 'balance' }}>
            Three steps to your dream role
          </h2>
          <p className="mt-3 text-lg text-surface-500 max-w-2xl mx-auto">
            No more endless scrolling. Our AI does the heavy lifting so you can focus on what matters.
          </p>
        </div>

        {/* Steps — consistent gap-6 */}
        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-24 left-[20%] right-[20%] h-px bg-gradient-to-r from-primary-200 via-accent-200 to-primary-200" aria-hidden="true" />

          {steps.map((step, index) => {
            const styles = accentStyles[step.accent]
            const Icon = step.icon

            return (
              <div key={step.step} className="relative flex flex-col items-center text-center group">
                {/* Step number */}
                <span className={`text-7xl font-bold ${styles.number} select-none mb-4 transition-transform duration-300 group-hover:scale-110`} aria-hidden="true">
                  {step.step}
                </span>

                {/* Icon circle */}
                <div className={`relative flex h-16 w-16 items-center justify-center rounded-2xl ${styles.iconBg} mb-6 shadow-sm transition-[transform,box-shadow] duration-300 group-hover:shadow-md group-hover:scale-105`}>
                  <Icon className={`h-7 w-7 ${styles.iconColor}`} strokeWidth={1.75} aria-hidden="true" />
                  <div className={`absolute inset-0 rounded-2xl ring-2 ring-transparent ${styles.ring} transition-shadow duration-300`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-surface-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-surface-500 leading-relaxed max-w-sm mx-auto mb-4">
                  {step.description}
                </p>

                {/* Detail badge */}
                <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border ${styles.badge}`}>
                  {step.detail}
                </span>

                {/* Arrow between steps (mobile) */}
                {index < steps.length - 1 && (
                  <ArrowRight className="lg:hidden h-5 w-5 text-surface-300 mt-6 rotate-90" aria-hidden="true" />
                )}
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <a
            href="#"
            className="group inline-flex items-center gap-2.5 px-8 py-4 text-base font-semibold text-white bg-primary-700 rounded-xl hover:bg-primary-600 shadow-lg shadow-primary-700/20 hover:shadow-xl transition-[background-color,box-shadow] duration-300 active:scale-[0.98] focus-visible:focus-ring"
          >
            Start Matching Today
            <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
