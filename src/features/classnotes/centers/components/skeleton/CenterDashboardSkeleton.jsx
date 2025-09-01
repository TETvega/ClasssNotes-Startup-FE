import { CenterDashboardCardSkeleton } from "./CenterDashboardCardSkeleton";

export const CenterDashboardSkeleton = () => {
  // Número de tarjetas de skeleton a mostrar
  const cardCount = 6;

  return (
    <div className="w-full">
      {/* Header Skeleton */}
      <div className="relative mb-4 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-center">
        <div className="flex animate-pulse items-start gap-4 sm:items-center">
          {/* Botón de regreso */}
          <div className="h-10 w-10 rounded-md bg-gray-200"></div>

          {/* Logo del centro */}
          <div className="flex size-16 items-center justify-center rounded-full border bg-white shadow-sm">
            <div className="h-12 w-12 rounded-full bg-gray-200"></div>
          </div>
        </div>

        <div className="flex animate-pulse flex-col items-start gap-4 sm:flex-row sm:items-center">
          <div>
            {/* Nombre del centro */}
            <div className="mb-1 h-6 w-64 rounded-md bg-gray-200"></div>
            {/* Abreviatura */}
            <div className="h-4 w-16 rounded-md bg-gray-200"></div>
          </div>
        </div>

        {/* Botón de acciones (en la esquina superior derecha) */}
        <div className="absolute top-0 right-0 h-8 w-8 animate-pulse rounded-md bg-gray-200"></div>
      </div>

      {/* Stats Cards Skeleton */}
      <div className="mb-4 grid gap-2 sm:mb-6 sm:gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-center gap-3">
              {/* Icono */}
              <div className="h-10 w-10 rounded-full bg-gray-200"></div>
              <div className="flex flex-col gap-2">
                {/* Etiqueta */}
                <div className="h-3 w-24 rounded-md bg-gray-200"></div>
                {/* Valor */}
                <div className="h-6 w-12 rounded-md bg-gray-200"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sección de cursos */}
      <div className="container mx-auto px-0 sm:p-4">
        {/* Header de sección y controles */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Título */}
          <div className="h-7 w-48 animate-pulse rounded-md bg-gray-200"></div>

          {/* Controles */}
          <div className="flex w-full flex-col items-start gap-2 sm:w-auto sm:flex-row sm:items-center">
            <div className="flex w-full items-center gap-2 sm:w-auto">
              {/* Barra de búsqueda */}
              <div className="h-[42px] flex-grow animate-pulse rounded-lg bg-gray-200 sm:w-64"></div>
              {/* Selector de filtro */}
              <div className="h-[42px] w-24 animate-pulse rounded-lg bg-gray-200"></div>
            </div>
            {/* Botón de nuevo curso */}
            <div className="h-10 w-10 animate-pulse rounded-lg bg-gray-200 sm:ml-2 sm:w-32"></div>
          </div>
        </div>

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
      </div>
    </div>
  );
};
