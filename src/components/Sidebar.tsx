import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  PiggyBank,
  Building2,
  Lightbulb,
  CreditCard,
  Settings,
  HelpCircle,
  LogOut,
} from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/accounts', icon: Wallet, label: 'Accounts' },
  { to: '/transactions', icon: ArrowLeftRight, label: 'Transactions' },
  { to: '/budget', icon: PiggyBank, label: 'Budget' },
  { to: '/properties', icon: Building2, label: 'Properties' },
  { to: '/opportunities', icon: Lightbulb, label: 'Opportunities' },
  { to: '/credit-cards', icon: CreditCard, label: 'Credit Cards', badge: 'New' },
];

const bottomItems = [
  { to: '/settings', icon: Settings, label: 'Settings' },
];

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  badge?: string;
}

function NavItem({ to, icon: Icon, label, badge }: NavItemProps) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
          isActive
            ? 'bg-athena-50 text-athena-700'
            : 'text-surface-600 hover:bg-surface-100 hover:text-surface-900'
        }`
      }
    >
      <Icon className="w-5 h-5" />
      <span className="flex-1">{label}</span>
      {badge && (
        <span className="px-2 py-0.5 text-xs font-semibold bg-athena-100 text-athena-700 rounded-full">
          {badge}
        </span>
      )}
    </NavLink>
  );
}

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-white border-r border-surface-200 flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-surface-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-athena-600 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <span className="text-xl font-bold text-surface-900">Athena</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {navItems.map((item) => (
          <NavItem key={item.to} {...item} />
        ))}
      </nav>

      {/* Bottom section */}
      <div className="p-4 border-t border-surface-100 space-y-1">
        {bottomItems.map((item) => (
          <NavItem key={item.to} {...item} />
        ))}
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-surface-600 hover:bg-surface-100 hover:text-surface-900 transition-colors w-full">
          <HelpCircle className="w-5 h-5" />
          <span>Help & Support</span>
        </button>
      </div>

      {/* User profile */}
      <div className="p-4 border-t border-surface-100">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-surface-50 transition-colors cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-athena-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
            M
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-surface-900 truncate">Mason McMillan</p>
            <p className="text-xs text-surface-500 truncate">mason@athena.finance</p>
          </div>
          <LogOut className="w-4 h-4 text-surface-400" />
        </div>
      </div>
    </aside>
  );
}
