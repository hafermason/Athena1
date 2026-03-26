import { useState } from 'react';
import { Sparkles, DollarSign, Filter } from 'lucide-react';
import OpportunityCard from '../components/OpportunityCard';
import { mockOpportunities } from '../data/mockData';
import type { Opportunity } from '../types';

type FilterType = '' | 'tax' | 'insurance' | 'bills' | 'budget';

export default function Opportunities() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(mockOpportunities);
  const [filterType, setFilterType] = useState<FilterType>('');

  const filtered = filterType ? opportunities.filter((o) => o.type === filterType) : opportunities;
  const totalSavings = filtered.reduce((sum, o) => (o.status === 'active' ? sum + o.estimatedSavings : sum), 0);
  const activeCount = filtered.filter((o) => o.status === 'active').length;

  const handleDismiss = (id: string) => {
    setOpportunities((prev) => prev.map((o) => (o.id === id ? { ...o, status: 'dismissed' as const } : o)));
  };

  const handleComplete = (id: string) => {
    setOpportunities((prev) => prev.map((o) => (o.id === id ? { ...o, status: 'completed' as const } : o)));
  };

  const filters: { label: string; value: FilterType }[] = [
    { label: 'All', value: '' },
    { label: 'Tax', value: 'tax' },
    { label: 'Insurance', value: 'insurance' },
    { label: 'Bills', value: 'bills' },
    { label: 'Budget', value: 'budget' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Opportunities</h1>
          <p className="text-surface-400 text-sm mt-1">AI-powered savings recommendations</p>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-gradient-to-r from-success/10 to-emerald-50 border border-success/20">
          <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-success" />
          </div>
          <div>
            <p className="text-xs text-surface-500">Potential Savings</p>
            <p className="text-xl font-bold text-success">${totalSavings.toLocaleString()}<span className="text-sm font-normal">/yr</span></p>
          </div>
        </div>
      </div>

      {/* Summary banner */}
      <div className="rounded-2xl bg-gradient-to-r from-athena-600 via-athena-700 to-athena-900 p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-16 translate-x-16" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-12 -translate-x-12" />
        <div className="relative flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-athena-200" />
          </div>
          <div>
            <p className="font-semibold text-lg">Athena found {activeCount} opportunities</p>
            <p className="text-sm text-athena-200">
              Based on analysis of your accounts, bills, and spending patterns. Review and take action to start saving.
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-surface-400" />
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilterType(f.value)}
            className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filterType === f.value
                ? 'bg-athena-600 text-white shadow-lg shadow-athena-600/25'
                : 'bg-white border border-surface-200 text-surface-600 hover:bg-surface-50'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Opportunities list */}
      <div className="space-y-4">
        {filtered.map((o) => (
          <OpportunityCard
            key={o.id}
            opportunity={o}
            onDismiss={handleDismiss}
            onComplete={handleComplete}
          />
        ))}
        {filtered.length === 0 && (
          <div className="rounded-2xl bg-white border border-surface-200 py-16 text-center">
            <Sparkles className="w-8 h-8 text-surface-300 mx-auto mb-3" />
            <p className="text-surface-500 font-medium">No opportunities in this category</p>
            <p className="text-sm text-surface-400 mt-1">Check back later — Athena is always looking for ways to save.</p>
          </div>
        )}
      </div>
    </div>
  );
}
