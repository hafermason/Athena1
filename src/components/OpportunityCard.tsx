import type { Opportunity } from '../types';
import { Sparkles, X, Check, ArrowRight, DollarSign, Shield, Receipt, PiggyBank } from 'lucide-react';

interface OpportunityCardProps {
  opportunity: Opportunity;
  onDismiss?: (id: string) => void;
  onComplete?: (id: string) => void;
  compact?: boolean;
}

const typeIcons = {
  tax: Shield,
  insurance: Shield,
  bills: Receipt,
  budget: PiggyBank,
  credit: Shield,
};

const typeColors = {
  tax: 'from-blue-500 to-indigo-600',
  insurance: 'from-purple-500 to-violet-600',
  bills: 'from-amber-500 to-orange-600',
  budget: 'from-emerald-500 to-teal-600',
  credit: 'from-cyan-500 to-blue-600',
};

const typeBadgeColors = {
  tax: 'bg-blue-100 text-blue-700',
  insurance: 'bg-purple-100 text-purple-700',
  bills: 'bg-amber-100 text-amber-700',
  budget: 'bg-emerald-100 text-emerald-700',
  credit: 'bg-cyan-100 text-cyan-700',
};

export default function OpportunityCard({ opportunity, onDismiss, onComplete, compact }: OpportunityCardProps) {
  const Icon = typeIcons[opportunity.type];

  if (compact) {
    return (
      <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-surface-50 to-white border border-surface-200 hover:shadow-md transition-shadow">
        <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${typeColors[opportunity.type]} flex items-center justify-center shrink-0`}>
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-surface-800">{opportunity.title}</p>
          <p className="text-xs text-surface-400 mt-0.5 line-clamp-2">{opportunity.description}</p>
          <div className="flex items-center gap-1 mt-2 text-success">
            <DollarSign className="w-3 h-3" />
            <span className="text-xs font-semibold">Save ~{opportunity.estimatedSavings.toLocaleString()}/yr</span>
          </div>
        </div>
        <ArrowRight className="w-4 h-4 text-surface-300 shrink-0 mt-1" />
      </div>
    );
  }

  return (
    <div className={`rounded-2xl bg-white border border-surface-200 overflow-hidden hover:shadow-lg transition-all duration-300 ${
      opportunity.status === 'dismissed' ? 'opacity-50' : ''
    } ${opportunity.status === 'completed' ? 'ring-2 ring-success/30' : ''}`}>
      {/* Header accent */}
      <div className={`h-1.5 bg-gradient-to-r ${typeColors[opportunity.type]}`} />

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${typeColors[opportunity.type]} flex items-center justify-center shrink-0`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-surface-900">{opportunity.title}</h3>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${typeBadgeColors[opportunity.type]}`}>
                  {opportunity.type.charAt(0).toUpperCase() + opportunity.type.slice(1)}
                </span>
              </div>
              <p className="text-sm text-surface-500 mt-1 leading-relaxed">{opportunity.description}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-surface-100">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-success/10 text-success">
              <DollarSign className="w-4 h-4" />
              <span className="text-sm font-bold">~{opportunity.estimatedSavings.toLocaleString()}/yr</span>
            </div>
            <span className="text-xs text-surface-400">· {opportunity.source}</span>
          </div>

          <div className="flex items-center gap-2">
            {opportunity.status === 'active' && (
              <>
                <button
                  onClick={() => onDismiss?.(opportunity.id)}
                  className="p-2 rounded-lg text-surface-400 hover:text-surface-600 hover:bg-surface-100 transition-colors"
                  title="Dismiss"
                >
                  <X className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onComplete?.(opportunity.id)}
                  className="p-2 rounded-lg text-success hover:bg-success/10 transition-colors"
                  title="Mark Complete"
                >
                  <Check className="w-4 h-4" />
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-athena-600 text-white text-sm font-medium hover:bg-athena-700 transition-colors">
                  Learn More
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </>
            )}
            {opportunity.status === 'completed' && (
              <span className="flex items-center gap-1 text-sm font-medium text-success">
                <Check className="w-4 h-4" /> Completed
              </span>
            )}
            {opportunity.status === 'dismissed' && (
              <span className="text-sm text-surface-400">Dismissed</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
