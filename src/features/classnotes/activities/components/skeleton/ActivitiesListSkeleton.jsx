export const ActivitiesListSkeleton = () => {
  return (
    <div className="mt-4 animate-pulse space-y-3">
      {/* Placeholder para cada actividad */}
      {[...Array(5)].map((_, index) => (
        <div key={index} className="rounded-lg bg-gray-200 p-3 sm:p-4">
          <div className="mb-2 flex items-center gap-2">
            <div className="h-4 w-24 rounded-full bg-gray-300"></div>
            <div className="h-4 w-24 rounded-full bg-gray-300"></div>
          </div>
          <div className="flex flex-col text-xs sm:text-sm md:flex-row md:gap-6">
            <div className="h-4 w-24 rounded-full bg-gray-300"></div>
            <div className="h-4 w-36 rounded-full bg-gray-300"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
