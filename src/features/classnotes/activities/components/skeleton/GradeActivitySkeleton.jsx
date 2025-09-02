export const GradeActivitySkeleton = () => {
  return (
    <div className="w-full">
      {/* Navegación - Skeleton */}
      <div className="mb-6 flex flex-wrap items-center gap-2 sm:gap-4">
        {/* Botón de regreso */}
        <div className="mr-1 flex items-center justify-center">
          <div className="h-10 w-10 animate-pulse rounded-lg bg-gray-300"></div>
        </div>

        {/* Abreviación del centro */}
        <div className="h-8 w-20 animate-pulse rounded-md bg-gray-300"></div>

        {/* Nombre de la clase */}
        <div className="h-6 w-48 animate-pulse rounded-md bg-gray-300"></div>
      </div>

      <div className="outline-disabled-text-bg mt-4 rounded-lg bg-gray-50 p-4 outline-2 sm:p-6">
        {/* Encabezado de la actividad - Skeleton */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <div className="h-8 w-64 animate-pulse rounded-md bg-gray-300 sm:h-9"></div>
            <div className="h-6 w-6 animate-pulse rounded-full bg-gray-300"></div>
          </div>
          <div className="mt-2 h-4 w-48 animate-pulse rounded-md bg-gray-300"></div>
          <div className="mt-3 h-4 w-full animate-pulse rounded-md bg-gray-300"></div>
        </div>

        {/* Sección de calificaciones - Skeleton */}
        <div className="mt-6">
          {/* Título */}
          <div className="mb-3 h-7 w-32 animate-pulse rounded-md bg-gray-300 sm:h-8 sm:w-40"></div>

          {/* Barra de herramientas - Skeleton */}
          <div className="mb-4 flex flex-col flex-wrap gap-3 sm:flex-row">
            {/* Buscador */}
            <div className="w-full flex-grow sm:w-auto">
              <div className="h-10 w-full animate-pulse rounded-lg bg-gray-300"></div>
            </div>

            {/* Filtro */}
            <div className="relative w-full sm:w-40">
              <div className="h-10 w-full animate-pulse rounded-lg bg-gray-300"></div>
            </div>

            {/* Botón de calificar seleccionados */}
            <div className="w-full sm:w-auto">
              <div className="h-10 w-full animate-pulse rounded-lg bg-gray-300"></div>
            </div>
          </div>

          {/* Tabla de estudiantes - Skeleton (desktop) */}
          <div className="hidden min-w-full rounded-lg border border-gray-300 sm:block">
            <div className="bg-gray-50">
              <div className="grid grid-cols-12 gap-4 p-3">
                <div className="col-span-1 h-5 w-5 animate-pulse rounded-md bg-gray-300"></div>
                <div className="col-span-1 h-5 animate-pulse rounded-md bg-gray-300"></div>
                <div className="col-span-3 h-5 animate-pulse rounded-md bg-gray-300"></div>
                <div className="col-span-3 hidden h-5 animate-pulse rounded-md bg-gray-300 md:block"></div>
                <div className="col-span-2 h-5 animate-pulse rounded-md bg-gray-300"></div>
                <div className="col-span-2 h-5 animate-pulse rounded-md bg-gray-300"></div>
              </div>
            </div>
            <div className="bg-white">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="grid grid-cols-12 gap-4 border-t border-gray-200 p-3"
                >
                  <div className="col-span-1 flex items-center">
                    <div className="h-4 w-4 animate-pulse rounded-md bg-gray-300"></div>
                  </div>
                  <div className="col-span-1 flex items-center">
                    <div className="h-4 w-4 animate-pulse rounded-md bg-gray-300"></div>
                  </div>
                  <div className="col-span-3 flex items-center">
                    <div className="h-4 w-full animate-pulse rounded-md bg-gray-300"></div>
                  </div>
                  <div className="col-span-3 hidden items-center md:flex">
                    <div className="h-4 w-full animate-pulse rounded-md bg-gray-300"></div>
                  </div>
                  <div className="col-span-2 flex items-center justify-end">
                    <div className="h-8 w-20 animate-pulse rounded-md bg-gray-300"></div>
                  </div>
                  <div className="col-span-2 flex items-center justify-center">
                    <div className="h-8 w-16 animate-pulse rounded-md bg-gray-300"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lista de estudiantes - Skeleton (mobile) */}
          <div className="mt-4 space-y-4 sm:hidden">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-300 bg-white p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-4 w-4 animate-pulse rounded-md bg-gray-300"></div>
                    <div className="h-4 w-32 animate-pulse rounded-md bg-gray-300"></div>
                  </div>
                  <div className="h-4 w-4 animate-pulse rounded-md bg-gray-300"></div>
                </div>
                <div className="mb-3 h-4 w-48 animate-pulse rounded-md bg-gray-300"></div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-8 w-16 animate-pulse rounded-md bg-gray-300"></div>
                    <div className="ml-2 h-4 w-8 animate-pulse rounded-md bg-gray-300"></div>
                  </div>
                  <div className="h-8 w-16 animate-pulse rounded-md bg-gray-300"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Paginación - Skeleton */}
          <div className="mt-4">
            <div className="rounded-lg bg-white p-3 shadow-sm">
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <div className="h-5 w-48 animate-pulse rounded-md bg-gray-300"></div>
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, index) => (
                    <div
                      key={index}
                      className="h-8 w-8 animate-pulse rounded-md bg-gray-300"
                    ></div>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-5 w-32 animate-pulse rounded-md bg-gray-300"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Botones de acción - Skeleton */}
          <div className="mt-4 flex w-full justify-end">
            <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:justify-end">
              <div className="h-10 w-full animate-pulse rounded-lg bg-gray-300 sm:w-32"></div>
              <div className="h-10 w-full animate-pulse rounded-lg bg-gray-300 sm:w-60"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
