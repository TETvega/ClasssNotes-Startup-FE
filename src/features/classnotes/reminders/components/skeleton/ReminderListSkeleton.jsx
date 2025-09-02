export const ReminderListSkeleton = () => {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="bg-contrast-primary-bg animate-pulse rounded-md border border-gray-600 px-4 pt-4 pb-6"
        >
          <div className="flex items-center justify-between">
            <div className="h-6 w-1/3 rounded bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-gray-300"></div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="h-4 w-3/4 rounded bg-gray-300"></div>
            <div className="h-4 w-1/2 rounded bg-gray-300"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
