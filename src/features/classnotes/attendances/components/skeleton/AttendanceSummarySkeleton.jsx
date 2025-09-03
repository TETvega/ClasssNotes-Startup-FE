export const AttendanceSummarySkeleton = () => {
  return (
    <div className="mb-6 w-full rounded-lg bg-white p-6 shadow">
      <div className="mb-8 flex animate-pulse flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="bg-disabled-text size-10 rounded-lg"></div>
          <div>
            <div className="bg-disabled-text-bg mb-1 h-7 w-56 rounded-lg"></div>
            <div className="bg-disabled-bg h-5 w-60 rounded-lg"></div>
          </div>
        </div>
        <div className="bg-disabled-text-bg h-7 w-60 rounded-lg"></div>
      </div>
      <div className="grid animate-pulse grid-cols-1 gap-6 md:grid-cols-2">
        <div className="border-disabled-text rounded border p-2">
          <div className="bg-disabled-text-bg mb-1 h-7 w-40 rounded-lg"></div>
          <div className="bg-disabled-bg mb-2 h-5 w-52 rounded-lg"></div>
          <div className="bg-disabled-text-bg h-9 w-15 rounded-lg"></div>
          <div className="bg-disabled-bg mt-2 mb-2 h-2 rounded"></div>
        </div>
        <div className="border-disabled-text rounded border p-2">
          <div className="bg-disabled-text-bg mb-1 h-7 w-40 rounded-lg"></div>
          <div className="bg-disabled-bg mb-2 h-5 w-52 rounded-lg"></div>
          <div className="bg-disabled-text-bg h-9 w-15 rounded-lg"></div>
          <div className="bg-disabled-bg mt-2 mb-2 h-2 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};
