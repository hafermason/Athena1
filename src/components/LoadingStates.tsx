export function LoadingSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-xl bg-surface-200 ${className}`} />
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-2xl bg-white border border-surface-200 p-6 space-y-4">
      <LoadingSkeleton className="h-4 w-1/3" />
      <LoadingSkeleton className="h-8 w-2/3" />
      <LoadingSkeleton className="h-3 w-1/2" />
    </div>
  );
}

export function TransactionSkeleton() {
  return (
    <div className="flex items-center gap-4 py-3.5 px-4">
      <LoadingSkeleton className="w-10 h-10 rounded-xl" />
      <div className="flex-1 space-y-2">
        <LoadingSkeleton className="h-4 w-1/3" />
        <LoadingSkeleton className="h-3 w-1/4" />
      </div>
      <LoadingSkeleton className="h-5 w-20 rounded-full" />
      <LoadingSkeleton className="h-4 w-16" />
    </div>
  );
}

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-2xl bg-surface-100 flex items-center justify-center text-surface-400 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-surface-800 mb-1">{title}</h3>
      <p className="text-sm text-surface-400 max-w-sm">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
