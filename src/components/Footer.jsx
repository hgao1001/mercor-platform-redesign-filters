import { Sparkles, ArrowRight, Github, Linkedin, Twitter } from 'lucide-react'

const footerLinks = {
  Product: [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Featured Jobs', href: '#jobs' },
    { label: 'For Companies', href: '#companies' },
    { label: 'Pricing', href: '#' },
  ],
  Resources: [
    { label: 'Blog', href: '#' },
    { label: 'Career Guides', href: '#' },
    { label: 'Salary Calculator', href: '#' },
    { label: 'API Docs', href: '#' },
  ],
  Company: [
    { label: 'About', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  Legal: [
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Cookies', href: '#' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-surface-950 text-surface-300">
      {/* CTA Banner */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative -top-16 mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 px-8 py-12 sm:px-12 sm:py-16 shadow-elevated">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10" aria-hidden="true">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />
            </div>

            <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight" style={{ textWrap: 'balance' }}>
                  Ready to find your next role?
                </h3>
                <p className="mt-2 text-primary-200 text-lg">
                  Join thousands of engineers who found their perfect match.
                </p>
              </div>
              <a
                href="#"
                className="group shrink-0 inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold text-primary-700 bg-white rounded-xl hover:bg-primary-50 shadow-lg transition-[background-color,box-shadow] duration-300 active:scale-[0.98] focus-visible:focus-ring"
              >
                Get Started Free
                <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2.5 mb-4 rounded-lg focus-visible:focus-ring">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600">
                <Sparkles className="h-4.5 w-4.5 text-white" strokeWidth={2} aria-hidden="true" />
              </div>
              <span className="text-lg font-bold text-white">Mercor</span>
            </a>
            <p className="text-sm text-surface-400 leading-relaxed mb-6">
              AI-powered talent matching that connects exceptional people with exceptional teams.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Twitter, label: 'Twitter' },
                { icon: Linkedin, label: 'LinkedIn' },
                { icon: Github, label: 'GitHub' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-800 text-surface-400 hover:bg-surface-700 hover:text-white transition-colors duration-200 focus-visible:focus-ring"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-sm font-semibold text-white mb-4">{heading}</h4>
              <ul className="space-y-3" role="list">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-surface-400 hover:text-white transition-colors duration-200 rounded-sm focus-visible:focus-ring"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar — fixed contrast: surface-400 on surface-950 passes 4.5:1 */}
        <div className="mt-12 pt-8 border-t border-surface-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-surface-400">
            &copy; {new Date().getFullYear()} Mercor. All rights reserved.
          </p>
          <p className="text-sm text-surface-400">
            Built with AI, for people who build with AI.
          </p>
        </div>
      </div>
    </footer>
  )
}
