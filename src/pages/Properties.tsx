import { useState } from 'react';
import { Plus, X, ArrowLeft } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import PropertyCard from '../components/PropertyCard';
import TransactionRow from '../components/TransactionRow';
import { mockProperties, getTransactionsForProperty, mockSpendingByCategory } from '../data/mockData';
import type { Property } from '../types';

export default function Properties() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  if (selectedProperty) {
    const propertyTransactions = getTransactionsForProperty(selectedProperty.id);
    const expenseBreakdown = propertyTransactions
      .filter((t) => t.amount < 0)
      .reduce(
        (acc, t) => {
          const cat = t.category;
          acc[cat] = (acc[cat] || 0) + Math.abs(t.amount);
          return acc;
        },
        {} as Record<string, number>
      );
    const chartData = Object.entries(expenseBreakdown).map(([name, amount]) => ({
      name,
      amount,
      fill: mockSpendingByCategory.find((c) => c.name === name)?.color || '#6366f1',
    }));

    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedProperty(null)}
          className="flex items-center gap-2 text-sm text-surface-500 hover:text-surface-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Properties
        </button>

        <div className="rounded-2xl bg-white border border-surface-200 overflow-hidden">
          <div className={`h-36 relative ${
            selectedProperty.type === 'primary'
              ? 'bg-gradient-to-br from-green-700 to-green-900'
              : selectedProperty.type === 'rental'
              ? 'bg-gradient-to-br from-emerald-600 to-green-800'
              : 'bg-gradient-to-br from-stone-500 to-stone-700'
          }`}>
            <div className="absolute bottom-4 left-6">
              <h1 className="text-2xl font-bold text-white">{selectedProperty.nickname}</h1>
              <p className="text-white/70 text-sm">{selectedProperty.address}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 divide-x divide-surface-100 border-b border-surface-100">
            <div className="p-6 text-center">
              <p className="text-xs text-surface-400">Current Value</p>
              <p className="text-xl font-bold text-surface-900 mt-1">
                {selectedProperty.currentValue.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
              </p>
            </div>
            <div className="p-6 text-center">
              <p className="text-xs text-surface-400">Monthly Bills</p>
              <p className="text-xl font-bold text-surface-900 mt-1">
                {selectedProperty.monthlyBillsTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
              </p>
            </div>
            <div className="p-6 text-center">
              <p className="text-xs text-surface-400">Transactions</p>
              <p className="text-xl font-bold text-surface-900 mt-1">{propertyTransactions.length}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Expense breakdown chart */}
          <div className="rounded-2xl bg-white border border-surface-200 p-6">
            <h2 className="font-semibold text-surface-900 mb-4">Expense Breakdown</h2>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData} layout="vertical" barSize={16}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={(v) => `$${v}`} />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: '#94a3b8' }} width={90} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '13px' }}
                    formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Amount']}
                  />
                  <Bar dataKey="amount" radius={[0, 6, 6, 0]}>
                    {chartData.map((entry, idx) => (
                      <Cell key={idx} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-sm text-surface-400 text-center py-12">No expenses for this property yet.</p>
            )}
          </div>

          {/* Transactions */}
          <div className="rounded-2xl bg-white border border-surface-200 p-6">
            <h2 className="font-semibold text-surface-900 mb-4">Recent Transactions</h2>
            <div className="space-y-0.5 -mx-2">
              {propertyTransactions.map((t) => (
                <TransactionRow key={t.id} transaction={t} showProperty={false} />
              ))}
              {propertyTransactions.length === 0 && (
                <p className="text-sm text-surface-400 text-center py-12">No transactions assigned to this property.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Properties</h1>
          <p className="text-surface-400 text-sm mt-1">{mockProperties.length} properties tracked</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-athena-600 text-white text-sm font-semibold hover:bg-athena-700 transition-colors shadow-lg shadow-athena-600/25"
        >
          <Plus className="w-4 h-4" /> Add Property
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProperties.map((p) => (
          <PropertyCard key={p.id} property={p} onClick={setSelectedProperty} />
        ))}
      </div>

      {/* Add property modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
            <div className="p-6 border-b border-surface-100">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-surface-900 text-lg">Add Property</h3>
                <button onClick={() => setShowAddForm(false)} className="p-1 rounded-lg hover:bg-surface-100"><X className="w-5 h-5 text-surface-400" /></button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-medium text-surface-500 mb-1.5 block">Address</label>
                <input type="text" placeholder="123 Main St, City, State ZIP" className="w-full px-3 py-2.5 rounded-xl bg-surface-50 border border-surface-200 text-sm focus:outline-none focus:border-athena-300 focus:ring-2 focus:ring-athena-100" />
              </div>
              <div>
                <label className="text-xs font-medium text-surface-500 mb-1.5 block">Nickname</label>
                <input type="text" placeholder="e.g., Beach House" className="w-full px-3 py-2.5 rounded-xl bg-surface-50 border border-surface-200 text-sm focus:outline-none focus:border-athena-300 focus:ring-2 focus:ring-athena-100" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-surface-500 mb-1.5 block">Estimated Value</label>
                  <input type="number" placeholder="$500,000" className="w-full px-3 py-2.5 rounded-xl bg-surface-50 border border-surface-200 text-sm focus:outline-none focus:border-athena-300 focus:ring-2 focus:ring-athena-100" />
                </div>
                <div>
                  <label className="text-xs font-medium text-surface-500 mb-1.5 block">Type</label>
                  <select className="w-full px-3 py-2.5 rounded-xl bg-surface-50 border border-surface-200 text-sm focus:outline-none focus:border-athena-300">
                    <option value="primary">Primary Residence</option>
                    <option value="rental">Rental</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-surface-100 flex justify-end gap-2">
              <button onClick={() => setShowAddForm(false)} className="px-4 py-2 rounded-xl text-sm font-medium text-surface-600 hover:bg-surface-100">Cancel</button>
              <button onClick={() => setShowAddForm(false)} className="px-4 py-2 rounded-xl bg-athena-600 text-white text-sm font-medium hover:bg-athena-700">Add Property</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

