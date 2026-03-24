import { Link } from 'react-router-dom'
import {
  ArrowRight, Scale, Stethoscope, Code2, FlaskConical,
  Landmark, GraduationCap, Search, Mic, Rocket,
  Star, ChevronLeft, ChevronRight, TrendingUp, Sparkles,
  Twitter, Youtube, Linkedin, Instagram,
} from 'lucide-react'
import { useRef } from 'react'
import { JOBS } from '../data/jobs'

const avatarColors = [
  'bg-primary-400', 'bg-pop-rose', 'bg-teal-500',
  'bg-pop-orange', 'bg-pop-violet', 'bg-pop-pink',
]

export default function LandingPage() {
  return (
    <div className="min-h-dvh bg-white animate-fade-in-up">
      <TopNav />
      <HeroSection />
      <EarningSection />
      <HowItWorksSection />
      <LatestRolesSection />
      <TestimonialsSection />
      <FeaturedContentSection />
      <Footer />
    </div>
  )
}

/* ═══════════════════════════════════════════
   Top Nav
   ═══════════════════════════════════════════ */
function TopNav() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-surface-100">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6 lg:px-10 h-[60px]">
        <Link to="/" className="flex items-center gap-0 shrink-0">
          <img src="/mercor-icon.png" alt="Mercor" width={36} height={36} className="w-9 h-9 object-contain" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {['APEX', 'Research', 'Enterprise', 'Blog'].map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm font-medium text-surface-600 hover:text-surface-900 transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </nav>

        <Link
          to="/explore"
          className="text-sm font-medium text-surface-700 px-4 py-2 border border-surface-200 rounded-full hover:bg-surface-50 hover:border-surface-300 transition-all duration-200"
          style={{ borderRadius: '9999px' }}
        >
          Log in
        </Link>
      </div>
    </header>
  )
}

/* ═══════════════════════════════════════════
   Hero
   ═══════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Subtle gradient bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-50/40 via-white to-white pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto px-6 lg:px-10 pt-16 pb-20 text-center">
        {/* Stats bar */}
        <div className="inline-flex items-center gap-6 px-5 py-2.5 bg-white border border-surface-200 rounded-full shadow-card mb-8" style={{ borderRadius: '9999px' }}>
          {[
            { label: 'Average pay', value: '$92/hr' },
            { label: 'Roles created', value: '157.5k' },
            { label: 'Daily payouts', value: '$2.0M+' },
          ].map(({ label, value }, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <span className="text-surface-400">{label}</span>
              <span className="font-semibold text-surface-900">{value}</span>
            </div>
          ))}
        </div>

        <h1 className="font-display font-bold text-[34px] md:text-[44px] lg:text-[50px] text-surface-900 tracking-tight leading-[1.1] max-w-[680px] mx-auto mb-5">
          Your expertise is in demand.{' '}
          <span className="text-primary-600">Start earning with AI.</span>
        </h1>

        <p className="text-base md:text-lg text-surface-500 leading-relaxed max-w-[560px] mx-auto mb-8">
          Whether you're a lawyer, doctor, engineer, or researcher — top companies need your knowledge to train AI models. Get paid well, work remotely, on your schedule.
        </p>

        <div className="flex items-center justify-center gap-3 mb-4">
          <Link
            to="/explore"
            className="px-7 py-3 text-sm font-semibold text-white bg-primary-600 rounded-full hover:bg-primary-700 active:bg-primary-800 transition-all duration-200 active:scale-[0.98] shadow-sm focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 outline-none"
            style={{ borderRadius: '9999px' }}
          >
            Browse roles
          </Link>
          <a
            href="#how-it-works"
            className="px-7 py-3 text-sm font-semibold text-surface-700 bg-white border border-surface-200 rounded-full hover:bg-surface-50 hover:border-surface-300 transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 outline-none"
            style={{ borderRadius: '9999px' }}
          >
            How it works
          </a>
        </div>

        <p className="text-xs text-surface-400">No upfront cost. Apply in under 10 minutes.</p>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   Earning by Expertise
   ═══════════════════════════════════════════ */
const expertiseCards = [
  { icon: Scale, title: 'Lawyer', rate: '$150', color: 'bg-primary-50 text-primary-600' },
  { icon: Stethoscope, title: 'Doctor / Medical Expert', rate: '$200', color: 'bg-pop-rose/10 text-pop-rose' },
  { icon: Code2, title: 'Software Engineer', rate: '$120', color: 'bg-teal-50 text-teal-600' },
  { icon: FlaskConical, title: 'Research Scientist', rate: '$100', color: 'bg-pop-violet/10 text-pop-violet' },
  { icon: Landmark, title: 'Finance Expert', rate: '$130', color: 'bg-accent-50 text-accent-600' },
  { icon: GraduationCap, title: 'PhD Specialist', rate: '$90', color: 'bg-pop-orange/10 text-pop-orange' },
]

function EarningSection() {
  return (
    <section className="py-20 bg-surface-50">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-[28px] md:text-[34px] text-surface-900 tracking-tight mb-3">
            What can you earn?
          </h2>
          <p className="text-surface-500 text-base max-w-[460px] mx-auto">
            Rates vary by expertise and project complexity. Here's what top professionals earn.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {expertiseCards.map(({ icon: Icon, title, rate, color }) => (
            <Link
              key={title}
              to="/explore"
              className="group bg-white rounded-2xl border border-surface-200 p-5 text-center transition-all duration-200 hover:border-primary-300 hover:shadow-card-hover no-underline"
              style={{ borderRadius: '14px' }}
            >
              <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center mx-auto mb-3`} style={{ borderRadius: '10px' }}>
                <Icon size={20} />
              </div>
              <p className="text-sm font-semibold text-surface-900 mb-1 leading-tight">{title}</p>
              <p className="font-display font-bold text-lg text-primary-600 mb-2">{rate}<span className="text-xs font-medium text-surface-400">/hr</span></p>
              <span className="text-xs font-medium text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 inline-flex items-center gap-0.5">
                View roles <ArrowRight size={11} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   How It Works
   ═══════════════════════════════════════════ */
function HowItWorksSection() {
  const steps = [
    {
      num: 1,
      icon: Search,
      title: 'Find a role',
      desc: 'Browse opportunities matched to your expertise. Filter by pay, field, and schedule.',
    },
    {
      num: 2,
      icon: Mic,
      title: 'Complete a short interview',
      desc: 'A quick AI-powered interview to verify your skills. Most take under 15 minutes.',
    },
    {
      num: 3,
      icon: Rocket,
      title: 'Start earning',
      desc: 'Get matched, start working, and get paid weekly. Work as much or little as you want.',
    },
  ]

  return (
    <section id="how-it-works" className="py-20 scroll-mt-16">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <h2 className="font-display font-bold text-[28px] md:text-[34px] text-surface-900 tracking-tight mb-3">
            How it works
          </h2>
          <p className="text-surface-500 text-base max-w-[420px] mx-auto">
            From sign-up to your first payout in three simple steps.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-[52px] left-[calc(16.66%+24px)] right-[calc(16.66%+24px)] h-px bg-surface-200" />

          {steps.map(({ num, icon: Icon, title, desc }) => (
            <div key={num} className="relative text-center">
              <div className="relative z-10 w-[104px] h-[104px] rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-5" style={{ borderRadius: '18px' }}>
                <Icon size={36} className="text-primary-600" strokeWidth={1.5} />
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary-600 text-white text-xs font-bold flex items-center justify-center ring-4 ring-white" style={{ borderRadius: '9999px' }}>
                  {num}
                </span>
              </div>
              <h3 className="font-display font-semibold text-lg text-surface-900 mb-2">{title}</h3>
              <p className="text-sm text-surface-500 leading-relaxed max-w-[280px] mx-auto">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   Latest Roles
   ═══════════════════════════════════════════ */
function LatestRolesSection() {
  const scrollRef = useRef(null)
  const displayJobs = JOBS.slice(0, 8)

  const scroll = (dir) => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir * 340, behavior: 'smooth' })
  }

  return (
    <section className="py-20 bg-surface-50">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display font-bold text-[28px] md:text-[34px] text-surface-900 tracking-tight">
            Latest roles
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll(-1)}
              className="w-9 h-9 rounded-full border border-surface-200 flex items-center justify-center text-surface-400 hover:text-surface-700 hover:bg-white transition-colors duration-200"
              style={{ borderRadius: '9999px' }}
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll(1)}
              className="w-9 h-9 rounded-full border border-surface-200 flex items-center justify-center text-surface-400 hover:text-surface-700 hover:bg-white transition-colors duration-200"
              style={{ borderRadius: '9999px' }}
              aria-label="Scroll right"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 -mx-1 px-1 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayJobs.map((job, i) => (
            <Link
              key={job.id}
              to={`/jobs/${job.id}`}
              className="group shrink-0 w-[280px] snap-start bg-white rounded-xl border border-surface-200 p-5 flex flex-col justify-between no-underline transition-all duration-200 hover:border-primary-400 hover:shadow-card-hover"
              style={{ borderRadius: '12px' }}
            >
              <div>
                <h3 className="font-display font-semibold text-[14px] text-surface-900 leading-snug line-clamp-2 mb-1.5">
                  {job.fullTitle || job.title}
                </h3>
                <p className="text-sm text-surface-500 font-medium mb-3">{job.salary}</p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-surface-100">
                <div className="flex items-center gap-2 min-w-0">
                  {job.avatars > 0 && (
                    <div className="flex -space-x-1.5 shrink-0">
                      {Array.from({ length: Math.min(job.avatars, 3) }).map((_, ai) => (
                        <div
                          key={ai}
                          className={`w-5 h-5 rounded-full ${avatarColors[(i * 3 + ai) % avatarColors.length]} ring-2 ring-white flex items-center justify-center`}
                          style={{ borderRadius: '9999px' }}
                        >
                          <span className="text-white text-[8px] font-bold">{String.fromCharCode(65 + ((i * 3 + ai) % 26))}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {job.hired && (
                    <span className="text-[11px] text-surface-400 truncate flex items-center gap-1">
                      <TrendingUp size={10} className="text-surface-300 shrink-0" />
                      {job.hired}
                    </span>
                  )}
                </div>
                <span className="text-xs font-semibold text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Apply
                </span>
              </div>
            </Link>
          ))}

          {/* View all card */}
          <Link
            to="/explore"
            className="shrink-0 w-[280px] snap-start bg-primary-50 rounded-xl border border-primary-100 p-5 flex flex-col items-center justify-center gap-3 no-underline transition-all duration-200 hover:bg-primary-100"
            style={{ borderRadius: '12px' }}
          >
            <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center" style={{ borderRadius: '9999px' }}>
              <ArrowRight size={20} className="text-primary-600" />
            </div>
            <span className="text-sm font-semibold text-primary-700">View all roles</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   Testimonials
   ═══════════════════════════════════════════ */
const testimonials = [
  {
    quote: "I work 15 hours a week and earn more than my previous full-time salary. The projects are fascinating — I'm helping shape how AI understands code.",
    name: 'Alex Chen',
    role: 'Software Engineer',
    initials: 'AC',
    color: 'bg-teal-500',
  },
  {
    quote: "The flexibility is unmatched. I train AI models between client meetings and on weekends. It's the best side income I've ever had.",
    name: 'Sarah Mitchell',
    role: 'Corporate Attorney',
    initials: 'SM',
    color: 'bg-primary-500',
  },
  {
    quote: "I never thought my medical expertise could be this valuable in AI. The interview was quick, and I started earning the same week.",
    name: 'Dr. James Park',
    role: 'Internal Medicine Physician',
    initials: 'JP',
    color: 'bg-pop-violet',
  },
]

function TestimonialsSection() {
  return (
    <section className="py-20">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-[28px] md:text-[34px] text-surface-900 tracking-tight mb-3">
            Hear from our experts
          </h2>
          <p className="text-surface-500 text-base max-w-[420px] mx-auto">
            Thousands of professionals earn on their own terms with Mercor.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map(({ quote, name, role, initials, color }) => (
            <div
              key={name}
              className="bg-white rounded-2xl border border-surface-200 p-6 flex flex-col"
              style={{ borderRadius: '14px' }}
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className="text-accent-400" fill="currentColor" />
                ))}
              </div>
              <p className="text-sm text-surface-600 leading-relaxed flex-1 mb-5">
                "{quote}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-surface-100">
                <div className={`w-9 h-9 rounded-full ${color} flex items-center justify-center`} style={{ borderRadius: '9999px' }}>
                  <span className="text-white text-xs font-bold">{initials}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-surface-900">{name}</p>
                  <p className="text-xs text-surface-400">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   Featured Content
   ═══════════════════════════════════════════ */
const storyCards = [
  { name: 'Jay', title: 'Meet Jay: International Business Consultant', color: 'bg-teal-500' },
  { name: 'Mick', title: 'Meet Mick: Computer Information Systems Expert', color: 'bg-primary-500' },
  { name: 'Michael', title: 'Meet Michael: Corporate Attorney', color: 'bg-pop-violet' },
]

function FeaturedContentSection() {
  return (
    <section className="py-20 bg-surface-50">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1fr_340px] gap-6">
          {/* Featured article */}
          <div className="group">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-5 bg-gradient-to-br from-primary-900 via-primary-700 to-primary-500 flex items-center justify-center" style={{ borderRadius: '14px' }}>
              <span className="font-display font-bold text-4xl text-white/90 tracking-wide">APEX</span>
            </div>
            <h3 className="font-display font-bold text-2xl text-surface-900 mb-2 group-hover:text-primary-700 transition-colors duration-200">
              The AI Productivity Index
            </h3>
            <div className="flex items-center gap-3 text-sm text-surface-400">
              <span className="font-semibold text-surface-700">Release</span>
              <span>5 min read</span>
            </div>
          </div>

          {/* Story cards */}
          <div className="space-y-5">
            {storyCards.map(({ name, title, color }) => (
              <div key={name} className="group flex gap-4 items-start">
                <div className={`w-[120px] h-[80px] shrink-0 rounded-xl ${color} flex items-center justify-center`} style={{ borderRadius: '10px' }}>
                  <span className="text-white font-bold text-lg">{name[0]}</span>
                </div>
                <div className="min-w-0 pt-0.5">
                  <p className="text-sm font-semibold text-surface-900 leading-snug mb-1 group-hover:text-primary-700 transition-colors duration-200">
                    {title}
                  </p>
                  <p className="text-xs text-surface-400">{name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   Footer
   ═══════════════════════════════════════════ */
const footerColumns = [
  { heading: 'For experts', links: ['Find work', 'Help center', 'Stories'] },
  { heading: 'Our research', links: ['APEX', 'APEX-Agents', 'ACE'] },
  { heading: 'Contact us', links: ['Support', 'Press', 'Sales'] },
  { heading: 'Mercor', links: ['Careers', 'Security', 'Blog'] },
]

function Footer() {
  return (
    <footer className="border-t border-surface-200 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {footerColumns.map(({ heading, links }) => (
            <div key={heading}>
              <h4 className="text-sm font-semibold text-surface-900 mb-4">{heading}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-surface-500 hover:text-surface-800 transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-8 border-t border-surface-100">
          <div className="flex items-center gap-2 text-xs text-surface-400">
            <span>&copy; 2026 Mercor</span>
            <span className="text-surface-300">&middot;</span>
            <span>San Francisco, CA</span>
          </div>
          <div className="flex items-center gap-3">
            {[Twitter, Youtube, Linkedin, Instagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-surface-400 hover:text-surface-600 hover:bg-surface-50 transition-colors duration-200"
                style={{ borderRadius: '6px' }}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
