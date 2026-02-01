import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
}

export function LoadingSkeleton({ className }: LoadingSkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-lg bg-secondary',
        className
      )}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="card-elevated p-4 space-y-3">
      <LoadingSkeleton className="h-4 w-1/3" />
      <LoadingSkeleton className="h-8 w-2/3" />
      <LoadingSkeleton className="h-4 w-full" />
      <LoadingSkeleton className="h-4 w-4/5" />
    </div>
  );
}

export function ListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 card-elevated">
          <LoadingSkeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <LoadingSkeleton className="h-4 w-1/3" />
            <LoadingSkeleton className="h-3 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 p-4">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <LoadingSkeleton className="h-6 w-32" />
          <LoadingSkeleton className="h-4 w-48" />
        </div>
        <LoadingSkeleton className="h-10 w-10 rounded-full" />
      </div>

      {/* Main card skeleton */}
      <div className="card-elevated p-6 space-y-4">
        <LoadingSkeleton className="h-5 w-1/4" />
        <LoadingSkeleton className="h-12 w-3/4" />
        <LoadingSkeleton className="h-10 w-32" />
      </div>

      {/* Stats grid skeleton */}
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="card-elevated p-4 space-y-2">
            <LoadingSkeleton className="h-4 w-1/2" />
            <LoadingSkeleton className="h-8 w-2/3" />
          </div>
        ))}
      </div>
    </div>
  );
}
