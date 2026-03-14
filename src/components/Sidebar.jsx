import { NavLink } from 'react-router-dom'
import { Search, Home, Users, DollarSign, User, Bell, Settings } from 'lucide-react'

const navItems = [
  { icon: Search, label: 'Explore', to: '/' },
  { icon: Home, label: 'Home', to: '#' },
  { icon: Users, label: 'Referrals', to: '#' },
  { icon: DollarSign, label: 'Earnings', to: '#' },
  { icon: User, label: 'Profile', to: '#' },
]

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 bottom-0 z-40 w-[72px] bg-white border-r border-surface-200/60 flex flex-col items-center py-5 max-md:hidden">
      {/* Logo */}
      <div className="mb-8 flex items-center justify-center">
        <img
          src="/mercor-icon.png"
          alt="Mercor"
          width={48}
          height={48}
          className="w-12 h-12 object-contain"
        />
      </div>

      {/* Nav items */}
      <nav className="flex flex-col items-center gap-4 flex-1">
        {navItems.map(({ icon: Icon, label, to }) => (
          <NavLink
            key={label}
            to={to}
            end
            className={({ isActive }) =>
              `group relative flex flex-col items-center justify-center w-14 py-1.5 rounded-xl transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 outline-none ${
                isActive && to !== '#'
                  ? 'text-primary-600'
                  : 'text-surface-400 hover:text-surface-700'
              }`
            }
            aria-label={label}
          >
            {({ isActive }) => (
              <>
                <Icon size={20} strokeWidth={isActive && to !== '#' ? 2.2 : 1.8} aria-hidden="true" />
                <span className={`text-[10px] mt-0.5 leading-tight ${isActive && to !== '#' ? 'font-semibold' : 'font-medium'}`}>
                  {label}
                </span>
                {isActive && to !== '#' && (
                  <span className="absolute -left-[18px] w-[3px] h-5 bg-primary-600 rounded-r-full top-1/2 -translate-y-1/2" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom actions */}
      <div className="flex flex-col items-center gap-1 mt-auto">
        <button className="relative w-11 h-11 rounded-xl flex items-center justify-center text-surface-400 hover:text-surface-700 hover:bg-surface-100 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 outline-none" aria-label="Notifications">
          <Bell size={20} strokeWidth={1.8} aria-hidden="true" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-pop-rose rounded-full ring-2 ring-white" />
        </button>
        <button className="w-11 h-11 rounded-xl flex items-center justify-center text-surface-400 hover:text-surface-700 hover:bg-surface-100 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 outline-none" aria-label="Settings">
          <Settings size={20} strokeWidth={1.8} aria-hidden="true" />
        </button>
        {/* Avatar */}
        <button className="mt-2 w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center ring-2 ring-surface-200 hover:ring-primary-300 transition-colors focus-visible:ring-primary-500 outline-none" aria-label="Profile">
          <span className="text-white text-xs font-semibold">K</span>
        </button>
      </div>
    </aside>
  )
}
