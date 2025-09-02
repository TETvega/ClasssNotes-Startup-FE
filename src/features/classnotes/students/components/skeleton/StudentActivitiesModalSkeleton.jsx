const ActivitySkeleton = () => {
  return (
    <div className="animate-pulse rounded-lg border border-gray-200 p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="h-6 w-40 rounded bg-gray-300" />
        <div className="h-6 w-16 rounded bg-gray-300" />
      </div>
      <div className="mt-2 h-4 w-3/4 rounded bg-gray-300" />
      <div className="mt-2 h-3 w-1/2 rounded bg-gray-300" />
    </div>
  );
};

export default function StudentActivitiesSkeleton() {
  return (
    <div>
      <h3 className="flex justify-center text-center text-xl font-bold text-gray-900">
        <div className="h-6 w-80 animate-pulse rounded bg-gray-300" />
      </h3>

      <div className="flex flex-col gap-4 pt-4">
        <div className="flex animate-pulse items-center gap-4 rounded-lg bg-gray-50 p-4">
          <div className="h-16 w-16 rounded-full bg-gray-300" />
          <div>
            <div className="h-4 w-32 rounded bg-gray-300" />
            <div className="mt-1 h-3 w-24 rounded bg-gray-300" />
          </div>
          <div className="ml-auto h-6 w-20 rounded bg-gray-300" />
        </div>

        <div>
          <div className="flex justify-center space-x-1 rounded-xl bg-gray-100 p-1">
            <div className="h-8 w-80 animate-pulse rounded bg-gray-300" />
            <div className="h-8 w-80 animate-pulse rounded bg-gray-300" />
          </div>

          <div className="mt-4 overflow-y-visible">
            <div className="rounded-xl"></div>

            <div className="rounded-xl">
              <div className="h-[350px] space-y-3 overflow-y-auto pr-2">
                {[...Array(3)].map((_, index) => (
                  <ActivitySkeleton key={index} />
                ))}
              </div>
            </div>
          </div>
          <div className="flex animate-pulse items-center justify-center rounded-lg bg-gray-50 p-4">
            <div className="h-4 w-32 rounded bg-gray-300" />
          </div>
        </div>
      </div>
    </div>
  );
}
