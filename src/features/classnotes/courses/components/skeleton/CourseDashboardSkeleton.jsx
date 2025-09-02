// Skeleton para las tarjetas de conteo (CountingCard)
const CountingCardSkeleton = () => (
  <div className="min-w-[250px] flex-1 animate-pulse flex-col rounded-lg border border-gray-200 bg-white p-5 shadow-[0px_1px_4px_1px_rgba(0,_0,_0,_0.8)] sm:p-3 md:p-4">
    <div className="mb-2 h-6 w-32 rounded bg-gray-200"></div>
    <div className="h-9 w-16 rounded bg-gray-200 text-3xl sm:text-xl md:text-2xl"></div>
  </div>
);

// Skeleton para las tarjetas de acción (ActionCard)
const ActionCardSkeleton = () => (
  <div className="min-w-[250px] flex-1 animate-pulse rounded-lg bg-gray-100 p-5 text-center shadow-sm sm:p-3 md:p-4">
    <div className="mx-auto mb-4 h-7 w-40 rounded bg-gray-200"></div>
    <div className="mx-auto mb-5 h-[50px] w-3/4 rounded bg-gray-200 sm:h-[20px]"></div>
    <div className="flex justify-center gap-2">
      <div className="h-10 w-32 rounded bg-gray-200"></div>
      <div className="h-10 w-32 rounded bg-gray-200"></div>
    </div>
  </div>
);

// Skeleton para los elementos de lista (actividades o estudiantes)
const ListItemSkeleton = () => (
  <div className="mb-2 animate-pulse rounded-md border bg-white p-3">
    <div className="mb-2 h-5 w-3/4 rounded bg-gray-200"></div>
    <div className="h-4 w-1/2 rounded bg-gray-200"></div>
  </div>
);

// Skeleton para las secciones de lista (SectionList)
const SectionListSkeleton = () => (
  <div className="min-w-[300px] flex-1 animate-pulse rounded-lg bg-white p-5 shadow-[0px_1px_4px_1px_rgba(0,_0,_0,_0.8)]">
    <div className="flex items-center justify-between">
      <div className="mb-3 h-7 w-48 rounded bg-gray-200"></div>
      <div className="mb-5 flex items-center justify-between">
        <div className="flex gap-4">
          <div className="h-9 w-24 rounded bg-gray-200"></div>
          <div className="h-9 w-32 rounded bg-gray-200"></div>
        </div>
      </div>
    </div>
    <div className="custom-scrollbar custom-scrollbar2 flex max-h-[250px] min-h-[150px] flex-col overflow-y-auto">
      {[...Array(3)].map((_, index) => (
        <ListItemSkeleton key={index} />
      ))}
    </div>
  </div>
);

// Skeleton para el Breadcrumb
const BreadcrumbSkeleton = () => (
  <div className="flex animate-pulse flex-col items-start gap-2 py-3 sm:flex-row sm:items-center">
    <div className="mr-5 h-9 w-9 rounded-md bg-gray-200"></div>
    <div className="h-8 w-24 rounded-md bg-gray-200"></div>
    <div className="mx-1 h-8 w-8 rounded-full bg-gray-200"></div>
    <div className="h-8 w-40 rounded-md bg-gray-200"></div>
  </div>
);

// Componente principal de Skeleton para todo el dashboard
export const CourseDashboardSkeleton = () => {
  return (
    <div className="w-full">
      {/* Encabezado con Breadcrumb */}
      <div className="relative mb-6 flex flex-col items-start gap-2 sm:gap-3 md:flex-row md:items-center md:justify-between">
        {/* Breadcrumb skeleton */}
        <BreadcrumbSkeleton />

        {/* Botones de acciones skeleton */}
        <div className="flex items-center gap-4">
          <div className="relative h-10 w-40 animate-pulse rounded-md bg-gray-200">
            <div className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-gray-300"></div>
          </div>
          <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200"></div>
        </div>
      </div>

      {/* Información contable skeleton */}
      <div className="mb-5 flex flex-wrap justify-between gap-4">
        <CountingCardSkeleton />
        <CountingCardSkeleton />
        <CountingCardSkeleton />
      </div>

      {/* Acciones del curso skeleton */}
      <div className="mb-5 flex flex-wrap justify-between gap-4">
        <ActionCardSkeleton />
        <ActionCardSkeleton />
        <ActionCardSkeleton />
      </div>

      {/* Actividades y Estudiantes skeleton */}
      <div className="flex flex-wrap gap-5">
        <SectionListSkeleton />
        <SectionListSkeleton />
      </div>
    </div>
  );
};
