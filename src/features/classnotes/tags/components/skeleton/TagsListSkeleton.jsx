export const TagsListSkeleton = () => {
  // Número de elementos de etiqueta a mostrar en el skeleton
  const tagCount = 5;

  return (
    <div className="mx-auto w-full max-w-sm rounded-lg bg-gray-50 p-6 shadow-lg sm:max-w-md md:max-w-lg">
      {/* Encabezado Skeleton */}
      <div className="mb-4 flex items-center justify-between">
        <div className="h-6 w-48 animate-pulse rounded-md bg-gray-200"></div>
        <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200"></div>
      </div>

      {/* Descripción Skeleton */}
      <div className="mb-4 h-4 w-3/4 animate-pulse rounded-md bg-gray-200"></div>

      {/* Lista de tags Skeleton */}
      <div className="max-h-[60vh] overflow-y-auto pr-1">
        <div className="space-y-2">
          {Array(tagCount)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="flex justify-between">
                {/* Tag Container Skeleton */}
                <div className="flex w-full items-center justify-between rounded-l-lg bg-white p-3 shadow-sm">
                  <div className="flex items-center">
                    {/* Icon Skeleton */}
                    <div className="h-8 w-8 animate-pulse rounded-md bg-gray-200"></div>
                    {/* Name Skeleton */}
                    <div className="ml-3 h-5 w-32 animate-pulse rounded-md bg-gray-200"></div>
                  </div>
                </div>
                {/* Edit Button Container Skeleton */}
                <div className="flex items-center justify-between rounded-r-lg bg-white px-4 py-3 shadow-sm">
                  <div className="h-6 w-6 animate-pulse rounded-md bg-gray-200"></div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Botones Skeleton */}
      <div className="mt-4 flex flex-col justify-center gap-4 px-12 sm:flex-row">
        <div className="flex w-50">
          <div className="h-10 w-full animate-pulse rounded-md bg-gray-200"></div>
        </div>
        <div className="flex w-50">
          <div className="h-10 w-full animate-pulse rounded-md bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
};
