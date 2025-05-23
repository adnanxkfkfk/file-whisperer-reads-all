
import { Skeleton } from "@/components/ui/skeleton";

const TrackingSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
      {/* Order Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <Skeleton className="h-7 w-48 mb-2" />
          <Skeleton className="h-5 w-36" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Customer Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-6 w-full" />
          </div>
        ))}
      </div>

      {/* Timeline */}
      <Skeleton className="h-6 w-32 mb-4" />
      <div className="space-y-8 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-full max-w-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackingSkeleton;
