export const DashboardCoursesSkeleton = () => {
  // Crear un array de 4 elementos para representar los posibles cursos
  const skeletonCourses = [1, 2, 3, 4];

  return (
    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
      {skeletonCourses.map((index) => (
        <div
          key={index}
          className="flex h-full flex-col rounded-lg bg-white p-4 shadow-xl md:min-h-[230px]"
        >
          {/* Nombre del curso */}
          <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-gray-200"></div>

          {/* Código y abreviatura del centro */}
          <div className="-b -gray-200 mt-2 flex justify-between pt-2 pb-2">
            <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200"></div>
            <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200"></div>
          </div>

          {/* Número de estudiantes */}
          <div className="mt-2 flex items-center gap-2">
            <div className="h-5 w-5 animate-pulse rounded-full bg-gray-200"></div>
            <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200"></div>
          </div>

          {/* Progreso de texto */}
          <div className="mt-2 h-4 w-1/3 animate-pulse rounded bg-gray-200"></div>

          {/* Barra de progreso */}
          <div className="mt-1 h-3 w-full overflow-hidden rounded-full bg-gray-200 md:h-4"></div>

          {/* Botón */}
          <div className="mt-4 flex justify-center">
            <div className="h-10 w-32 animate-pulse rounded bg-gray-200"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
