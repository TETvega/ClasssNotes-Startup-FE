export const DashboardSummarySkeleton = () => {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-3">
      {/* Card 1 - Total Centros */}
      <div className="rounded-lg bg-white p-4 shadow-xl">
        <div className="mb-2 h-6 w-32 animate-pulse rounded bg-gray-200"></div>
        <div className="mb-2 h-8 w-16 animate-pulse rounded bg-gray-200"></div>
        <div className="h-4 w-48 animate-pulse rounded bg-gray-200"></div>
      </div>

      {/* Card 2 - Total Clases */}
      <div className="rounded-lg bg-white p-4 shadow-xl">
        <div className="mb-2 h-6 w-32 animate-pulse rounded bg-gray-200"></div>
        <div className="mb-2 h-8 w-16 animate-pulse rounded bg-gray-200"></div>
        <div className="h-4 w-48 animate-pulse rounded bg-gray-200"></div>
      </div>

      {/* Card 3 - Total Estudiantes */}
      <div className="rounded-lg bg-white p-4 shadow-xl">
        <div className="mb-2 h-6 w-32 animate-pulse rounded bg-gray-200"></div>
        <div className="mb-2 h-8 w-16 animate-pulse rounded bg-gray-200"></div>
        <div className="h-4 w-48 animate-pulse rounded bg-gray-200"></div>
      </div>
    </div>
  );
};
