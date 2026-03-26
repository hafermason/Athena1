import { ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: { value: string; positive: boolean };
  icon?: ReactNode;
  gradient?: boolean;
}

export default function StatCard({ title, value, subtitle, trend, icon, gradient }: StatCardProps) {
  if (gradient) {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-athena-600 via-athena-700 to-athena-900 p-6 text-white shadow-xl shadow-athena-600/20">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-8 translate-x-8" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-6 -translate-x-6" />
        <div className="relative">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-athena-200">{title}</p>
            {icon && <div className="text-athena-300">{icon}</div>}
          </div>
          <p className="text-3xl font-bold tracking-tight">{value}</p>
          {subtitle && <p className="text-sm text-athena-300 mt-1">{subtitle}</p>}
          {trend && (
            <div className={`flex items-center gap-1 mt-3 text-sm font-medium ${trend.positive ? 'text-green-300' : 'text-red-300'}`}>
              {trend.positive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span>{trend.value}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white border border-surface-200 p-6 hover:shadow-lg hover:shadow-surface-200/50 transition-shadow duration-300">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-surface-500">{title}</p>
        {icon && <div className="text-surface-400">{icon}</div>}
      </div>
      <p className="text-2xl font-bold text-surface-900 tracking-tight">{value}</p>
      {subtitle && <p className="text-sm text-surface-400 mt-1">{subtitle}</p>}
      {trend && (
        <div className={`flex items-center gap-1 mt-3 text-sm font-medium ${trend.positive ? 'text-success' : 'text-danger'}`}>
          {trend.positive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span>{trend.value}</span>
        </div>
      )}
    </div>
  );
}
