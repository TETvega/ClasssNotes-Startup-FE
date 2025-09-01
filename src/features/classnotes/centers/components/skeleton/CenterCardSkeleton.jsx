export const CenterCardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
      <div className="flex min-h-[220px] min-w-[330px] animate-pulse flex-col rounded-lg border border-gray-300 bg-white p-4 shadow-sm">
        <div className="mb-2 flex items-start justify-between">
          <div className="flex items-start space-x-3 overflow-hidden">
            <div className="h-16 w-16 rounded-full bg-gray-300 sm:h-20 sm:w-20"></div>
            <div className="flex flex-col space-y-2">
              <div className="h-8 w-45 rounded bg-gray-300"></div>
              <div className="h-3 w-24 rounded bg-gray-200"></div>
              <div className="h-3 w-16 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>
        <div className="mt-auto flex flex-col gap-3">
          <div className="flex justify-between px-2 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <div className="h-7 w-7 rounded bg-gray-300"></div>
              <div className="flex flex-col gap-1">
                <div className="h-3 w-16 rounded bg-gray-200"></div>
                <div className="h-3 w-10 rounded bg-gray-300"></div>
              </div>
            </div>
            <div className="mr-15 flex items-center gap-1">
              <div className="h-7 w-7 rounded bg-gray-300"></div>
              <div className="flex flex-col gap-1">
                <div className="h-3 w-16 rounded bg-gray-200"></div>
                <div className="h-3 w-10 rounded bg-gray-300"></div>
              </div>
            </div>
          </div>
          <div className="mt-1">
            <div className="h-10 w-full rounded-lg bg-gray-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
