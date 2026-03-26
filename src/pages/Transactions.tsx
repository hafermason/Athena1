import { useState, useMemo } from 'react';
import { Search, Filter, X } from 'lucide-react';
import TransactionRow from '../components/TransactionRow';
import { mockTransactions, mockAccounts, mockProperties } from '../data/mockData';
import type { Transaction } from '../types';

const categories = [...new Set(mockTransactions.map((t) => t.category))].sort();

export default function Transactions() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');
  const [selectedProperty, setSelectedProperty] = useState('');
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return mockTransactions.filter((t) => {
      if (search && !t.merchant.toLowerCase().includes(search.toLowerCase())) return false;
      if (selectedCategory && t.category !== selectedCategory) return false;
      if (selectedAccount && t.accountId !== selectedAccount) return false;
      if (selectedProperty && t.propertyId !== selectedProperty) return false;
      return true;
    });
  }, [search, selectedCategory, selectedAccount, selectedProperty]);

  const totalSpent = filtered.reduce((sum, t) => (t.amount < 0 ? sum + Math.abs(t.amount) : sum), 0);
  const totalIncome = filtered.reduce((sum, t) => (t.amount > 0 ? sum + t.amount : sum), 0);
  const activeFilters = [selectedCategory, selectedAccount, selectedProperty].filter(Boolean).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Transactions</h1>
        <p className="text-surface-400 text-sm mt-1">
          {filtered.length} transactions · ${totalSpent.toLocaleString()} spent · ${totalIncome.toLocaleString()} earned
        </p>
      </div>

      {/* Search and filters */}
      <div className="rounded-2xl bg-white border border-surface-200 p-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
            <input
              type="text"
              placeholder="Search merchants..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-50 border border-surface-200 text-sm focus:outline-none focus:border-athena-300 focus:ring-2 focus:ring-athena-100 transition-all"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
              showFilters || activeFilters > 0
                ? 'bg-athena-50 border-athena-200 text-athena-600'
                : 'bg-white border-surface-200 text-surface-600 hover:bg-surface-50'
            }`}
          >
            <Filter className="w-4 h-4" />
            Filters
            {activeFilters > 0 && (
              <span className="w-5 h-5 rounded-full bg-athena-600 text-white text-[10px] font-bold flex items-center justify-center">
                {activeFilters}
              </span>
            )}
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 pt-4 border-t border-surface-100">
            <div>
              <label className="text-xs font-medium text-surface-500 mb-1.5 block">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-surface-50 border border-surface-200 text-sm focus:outline-none focus:border-athena-300"
              >
                <option value="">All Categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-surface-500 mb-1.5 block">Account</label>
              <select
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-surface-50 border border-surface-200 text-sm focus:outline-none focus:border-athena-300"
              >
                <option value="">All Accounts</option>
                {mockAccounts.map((a) => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-surface-500 mb-1.5 block">Property</label>
              <select
                value={selectedProperty}
                onChange={(e) => setSelectedProperty(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-surface-50 border border-surface-200 text-sm focus:outline-none focus:border-athena-300"
              >
                <option value="">All Properties</option>
                {mockProperties.map((p) => (
                  <option key={p.id} value={p.id}>{p.nickname}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Active filter pills */}
        {activeFilters > 0 && (
          <div className="flex items-center gap-2 mt-3">
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory('')}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-athena-100 text-athena-700 text-xs font-medium"
              >
                {selectedCategory} <X className="w-3 h-3" />
              </button>
            )}
            {selectedAccount && (
              <button
                onClick={() => setSelectedAccount('')}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-athena-100 text-athena-700 text-xs font-medium"
              >
                {mockAccounts.find((a) => a.id === selectedAccount)?.name} <X className="w-3 h-3" />
              </button>
            )}
            {selectedProperty && (
              <button
                onClick={() => setSelectedProperty('')}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-athena-100 text-athena-700 text-xs font-medium"
              >
                {mockProperties.find((p) => p.id === selectedProperty)?.nickname} <X className="w-3 h-3" />
              </button>
            )}
            <button
              onClick={() => { setSelectedCategory(''); setSelectedAccount(''); setSelectedProperty(''); }}
              className="text-xs text-surface-400 hover:text-surface-600 ml-1"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Transaction list */}
      <div className="rounded-2xl bg-white border border-surface-200 overflow-hidden">
        <div className="divide-y divide-surface-100">
          {filtered.map((t) => (
            <TransactionRow key={t.id} transaction={t} onClick={setEditingTransaction} />
          ))}
          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-surface-400 text-sm">No transactions match your filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* Edit modal */}
      {editingTransaction && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="p-6 border-b border-surface-100">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-surface-900">Edit Transaction</h3>
                <button onClick={() => setEditingTransaction(null)} className="p-1 rounded-lg hover:bg-surface-100 transition-colors">
                  <X className="w-5 h-5 text-surface-400" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-medium text-surface-500 mb-1.5 block">Merchant</label>
                <p className="text-sm font-medium text-surface-900">{editingTransaction.merchant}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-surface-500 mb-1.5 block">Amount</label>
                <p className={`text-lg font-bold ${editingTransaction.amount > 0 ? 'text-success' : 'text-surface-900'}`}>
                  {editingTransaction.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </p>
              </div>
              <div>
                <label className="text-xs font-medium text-surface-500 mb-1.5 block">Category</label>
                <select
                  defaultValue={editingTransaction.category}
                  className="w-full px-3 py-2 rounded-xl bg-surface-50 border border-surface-200 text-sm focus:outline-none focus:border-athena-300"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-surface-500 mb-1.5 block">Assign to Property</label>
                <select
                  defaultValue={editingTransaction.propertyId || ''}
                  className="w-full px-3 py-2 rounded-xl bg-surface-50 border border-surface-200 text-sm focus:outline-none focus:border-athena-300"
                >
                  <option value="">None</option>
                  {mockProperties.map((p) => (
                    <option key={p.id} value={p.id}>{p.nickname}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-surface-100 flex justify-end gap-2">
              <button
                onClick={() => setEditingTransaction(null)}
                className="px-4 py-2 rounded-xl text-sm font-medium text-surface-600 hover:bg-surface-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setEditingTransaction(null)}
                className="px-4 py-2 rounded-xl bg-athena-600 text-white text-sm font-medium hover:bg-athena-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
