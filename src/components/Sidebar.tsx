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
  Car,
  Shield,
  FileText,
  Scroll,
  Users,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/accounts', icon: Wallet, label: 'Accounts' },
  { to: '/transactions', icon: ArrowLeftRight, label: 'Transactions' },
  { to: '/budget', icon: PiggyBank, label: 'Budget' },
  { to: '/properties', icon: Building2, label: 'Properties' },
  { to: '/vehicles', icon: Car, label: 'Vehicles' },
  { to: '/insurance', icon: Shield, label: 'Insurance' },
  { to: '/opportunities', icon: Lightbulb, label: 'Opportunities' },
  { to: '/credit-cards', icon: CreditCard, label: 'Credit Cards', badge: 'New' },
];

const secondaryItems = [
  { to: '/documents', icon: FileText, label: 'Documents' },
  { to: '/estate', icon: Scroll, label: 'Estate' },
  { to: '/contacts', icon: Users, label: 'Contacts' },
];

const bottomItems = [
  { to: '/settings', icon: Settings, label: 'Settings' },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  badge?: string;
  collapsed?: boolean;
}

function NavItem({ to, icon: Icon, label, badge, collapsed }: NavItemProps) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
          isActive
            ? 'bg-athena-50 text-athena-700'
            : 'text-surface-600 hover:bg-surface-100 hover:text-surface-900'
        } ${collapsed ? 'justify-center' : ''}`
      }
      title={collapsed ? label : undefined}
    >
      <Icon className="w-5 h-5 shrink-0" />
      {!collapsed && <span className="flex-1">{label}</span>}
      {!collapsed && badge && (
        <span className="px-2 py-0.5 text-xs font-semibold bg-athena-100 text-athena-700 rounded-full">
          {badge}
        </span>
      )}
    </NavLink>
  );
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <aside className={`${collapsed ? 'w-20' : 'w-64'} h-screen bg-white border-r border-surface-200 flex flex-col transition-all duration-300 shrink-0`}>
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-surface-100">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-green-700 to-green-900 flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          {!collapsed && <span className="text-xl font-bold text-surface-900">Athena</span>}
        </div>
        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg text-surface-400 hover:text-surface-600 hover:bg-surface-100 transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {navItems.map((item) => (
          <NavItem key={item.to} {...item} collapsed={collapsed} />
        ))}

        {/* Divider */}
        <div className="my-3 border-t border-surface-100" />

        {!collapsed && (
          <p className="px-3 text-[10px] font-semibold text-surface-400 uppercase tracking-wider mb-1">Planning</p>
        )}
        {secondaryItems.map((item) => (
          <NavItem key={item.to} {...item} collapsed={collapsed} />
        ))}
      </nav>

      {/* Bottom section */}
      <div className="p-3 border-t border-surface-100 space-y-1">
        {bottomItems.map((item) => (
          <NavItem key={item.to} {...item} collapsed={collapsed} />
        ))}
        {!collapsed && (
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-surface-600 hover:bg-surface-100 hover:text-surface-900 transition-colors w-full">
            <HelpCircle className="w-5 h-5" />
            <span>Help & Support</span>
          </button>
        )}
      </div>

      {/* User profile */}
      <div className="p-3 border-t border-surface-100">
        <div className={`flex items-center gap-3 p-2 rounded-xl hover:bg-surface-50 transition-colors cursor-pointer ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center text-white font-semibold text-sm shrink-0">
            M
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-surface-900 truncate">Mason McMillan</p>
              <p className="text-xs text-surface-500 truncate">mason@athena.finance</p>
            </div>
          )}
          {!collapsed && <LogOut className="w-4 h-4 text-surface-400" />}
        </div>
      </div>
    </aside>
  );
}
