import { useState } from 'react'
import { Menu, X, Sparkles } from 'lucide-react'

const navLinks = [
  { label: 'Jobs', href: '#jobs' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'For Companies', href: '#companies' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-surface-200/60">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group focus-visible:focus-ring rounded-lg">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-700 shadow-sm group-hover:bg-primary-600 transition-colors duration-200">
              <Sparkles className="h-5 w-5 text-white" strokeWidth={2} />
            </div>
            <span className="text-xl font-bold tracking-tight text-surface-900">
              Mercor
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-surface-600 rounded-lg hover:text-surface-900 hover:bg-surface-100 transition-colors duration-200 focus-visible:focus-ring"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#"
              className="px-4 py-2 text-sm font-medium text-surface-700 hover:text-surface-900 transition-colors rounded-lg focus-visible:focus-ring"
            >
              Sign In
            </a>
            <a
              href="#"
              className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-primary-700 rounded-lg hover:bg-primary-600 shadow-sm hover:shadow-md transition-[background-color,box-shadow] duration-200 active:scale-[0.98] focus-visible:focus-ring"
            >
              Get Started
            </a>
          </div>

          {/* Mobile toggle — h-11 w-11 = 44px touch target */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex items-center justify-center h-11 w-11 rounded-lg text-surface-600 hover:bg-surface-100 transition-colors focus-visible:focus-ring"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 pt-2 border-t border-surface-200/60">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-base font-medium text-surface-700 rounded-lg hover:bg-surface-100 transition-colors focus-visible:focus-ring"
                >
                  {link.label}
                </a>
              ))}
              <hr className="my-2 border-surface-200" />
              <a
                href="#"
                className="px-4 py-3 text-base font-medium text-surface-700 rounded-lg hover:bg-surface-100 focus-visible:focus-ring"
              >
                Sign In
              </a>
              <a
                href="#"
                className="mx-4 mt-1 inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-white bg-primary-700 rounded-lg hover:bg-primary-600 shadow-sm transition-colors focus-visible:focus-ring"
              >
                Get Started
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
