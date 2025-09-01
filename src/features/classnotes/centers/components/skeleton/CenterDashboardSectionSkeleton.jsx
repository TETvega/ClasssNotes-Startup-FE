import { CenterDashboardCardSkeleton } from "./CenterDashboardCardSkeleton";

export const CenterDashboardSectionSkeleton = () => {
  // Número de tarjetas de skeleton a mostrar
  const cardCount = 6;

  return (
    <>
      {/* Grid de tarjetas skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(cardCount)].map((_, index) => (
          <CenterDashboardCardSkeleton key={index} />
        ))}
      </div>

      {/* Paginación skeleton */}
      <div className="mt-6 animate-pulse">
        <div className="mx-auto h-10 w-full max-w-md rounded-lg bg-gray-200"></div>
      </div>
    </>
  );
};
