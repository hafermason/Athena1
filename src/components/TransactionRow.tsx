import type { Transaction } from '../types';

interface TransactionRowProps {
  transaction: Transaction;
  onClick?: (transaction: Transaction) => void;
  showProperty?: boolean;
}

const categoryColors: Record<string, string> = {
  'Groceries': 'bg-green-100 text-green-700',
  'Auto & Transport': 'bg-cyan-100 text-cyan-700',
  'Entertainment': 'bg-orange-100 text-orange-700',
  'Income': 'bg-emerald-100 text-emerald-700',
  'Home': 'bg-violet-100 text-violet-700',
  'Insurance': 'bg-purple-100 text-purple-700',
  'Utilities': 'bg-amber-100 text-amber-700',
  'Shopping': 'bg-pink-100 text-pink-700',
  'Food & Drink': 'bg-red-100 text-red-700',
  'Subscriptions': 'bg-lime-100 text-lime-700',
  'Health & Fitness': 'bg-teal-100 text-teal-700',
  'Taxes': 'bg-slate-100 text-slate-700',
  'Housing': 'bg-indigo-100 text-indigo-700',
};

export function CategoryBadge({ category }: { category: string }) {
  const colors = categoryColors[category] || 'bg-surface-100 text-surface-600';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors}`}>
      {category}
    </span>
  );
}

export default function TransactionRow({ transaction, onClick, showProperty = true }: TransactionRowProps) {
  const isPositive = transaction.amount > 0;

  return (
    <div
      onClick={() => onClick?.(transaction)}
      className="flex items-center justify-between py-3.5 px-4 hover:bg-surface-50 rounded-xl cursor-pointer transition-colors group"
    >
      <div className="flex items-center gap-4 min-w-0 flex-1">
        {/* Merchant initial */}
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-semibold shrink-0 ${
          isPositive ? 'bg-emerald-100 text-emerald-600' : 'bg-surface-100 text-surface-500'
        }`}>
          {transaction.merchant[0]}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-surface-800 truncate">{transaction.merchant}</p>
            {transaction.pending && (
              <span className="text-[10px] font-medium text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                Pending
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <p className="text-xs text-surface-400">{new Date(transaction.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
            {showProperty && transaction.propertyId && (
              <span className="text-[10px] text-surface-400 bg-surface-100 px-1.5 py-0.5 rounded">
                Property
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0 ml-4">
        <CategoryBadge category={transaction.category} />
        <p className={`text-sm font-semibold tabular-nums ${isPositive ? 'text-success' : 'text-surface-800'}`}>
          {isPositive ? '+' : ''}{transaction.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
        </p>
      </div>
    </div>
  );
}
