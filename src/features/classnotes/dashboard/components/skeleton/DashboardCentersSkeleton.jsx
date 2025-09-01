export const DashboardCentersSkeleton = () => {
  // Crear un array de 3 elementos para representar los posibles centros
  const skeletonCenters = [1, 2, 3];

  return (
    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {skeletonCenters.map((index) => (
        <div
          key={index}
          className="flex flex-col overflow-hidden rounded-lg bg-white p-4 shadow-xl"
        >
          {/* Contenedor del logo y texto alineado a la izquierda */}
          <div className="flex items-center justify-center gap-4">
            {/* Contenedor fijo y circular del logo */}
            <div className="flex h-20 w-30 items-center justify-center overflow-hidden rounded-full bg-gray-100 md:w-35 2xl:w-28">
              <div className="h-20 w-20 animate-pulse rounded-full bg-gray-200"></div>
            </div>
            {/* Información de la universidad */}
            <div className="flex w-full min-w-0 flex-col">
              <div className="mb-2 h-7 w-3/4 animate-pulse rounded bg-gray-200"></div>
              <div className="h-5 w-full animate-pulse rounded bg-gray-200"></div>
            </div>
          </div>

          {/* Sección de estadísticas */}
          <div className="mt-3 flex items-center justify-center gap-2 md:flex-wrap">
            {/* Clases */}
            <div className="flex h-14 items-center gap-2 rounded-2xl bg-gray-200 px-4 md:min-w-[150px]"></div>
            {/* Estudiantes */}
            <div className="flex h-14 items-center gap-2 rounded-2xl bg-gray-200 px-4 md:min-w-[150px]"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
