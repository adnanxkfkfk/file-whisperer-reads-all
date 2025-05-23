
import { Skeleton } from "@/components/ui/skeleton";

const BookingFormSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
      {/* Personal Information Section */}
      <Skeleton className="h-8 w-48 mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>

      {/* Package Details Section */}
      <Skeleton className="h-8 w-48 mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>

      {/* Pickup Information */}
      <Skeleton className="h-8 w-48 mb-6" />
      <div className="space-y-4 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>

      {/* Delivery Information */}
      <Skeleton className="h-8 w-48 mb-6" />
      <div className="space-y-4 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <Skeleton className="h-12 w-full rounded-md" />
      </div>
    </div>
  );
};

export default BookingFormSkeleton;
