import { Bell, Search } from 'lucide-react';
import { mockUser } from '../data/mockData';

export default function Header() {
  return (
    <header className="h-16 border-b border-surface-200 bg-white flex items-center justify-between px-6 lg:px-8 shrink-0">
      {/* Search */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
        <input
          type="text"
          placeholder="Search transactions, accounts..."
          className="w-full pl-10 pr-4 py-2 rounded-xl bg-surface-100 border border-transparent text-sm text-surface-700 placeholder-surface-400 focus:outline-none focus:border-athena-300 focus:ring-2 focus:ring-athena-100 transition-all"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4 ml-4">
        {/* Notifications */}
        <button className="relative p-2 rounded-xl text-surface-500 hover:text-surface-700 hover:bg-surface-100 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger ring-2 ring-white" />
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-athena-400 to-athena-600 flex items-center justify-center text-white text-sm font-semibold">
            {mockUser.avatar}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-surface-800 leading-tight">{mockUser.name}</p>
            <p className="text-xs text-surface-400">{mockUser.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
