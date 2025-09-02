import { CourseCardSkeleton } from "./CourseCardSkeleton";

export const CoursePageSkeleton = () => {
  return (
    <div className="flex-grow w-full">
      <div className="animate-pulse w-full">
      <div className="w-full ">
        {/* Encabezado */}
        <div className="mb-6 flex items-center">
          <div className="h-10 w-10 rounded-lg bg-gray-300 mr-2"></div>
          <div className="h-8 w-48 rounded-lg bg-gray-300 ml-2"></div>
        </div>

        {/* Barra de búsqueda y filtros */}
        <div className="mb-6 flex flex-col gap-4">
          {/* Versión mobile/tablet */}
          <div className="w-full md:block lg:hidden">
            <div className="h-14 w-full rounded-lg bg-gray-300"></div>
          </div>

          {/* Contenedor principal de filtros */}
          <div className="flex flex-col gap-4 md:flex-row md:flex-wrap lg:flex-nowrap">
            {/* Grupo izquierdo (SearchBar + Filtros) */}
            <div className="flex flex-col gap-4 sm:gap-4 md:flex-row md:flex-grow lg:w-full lg:flex-row xl:w-3/4">
              {/* SearchBar desktop (hidden en mobile/tablet) */}
              <div className="hidden w-full lg:block lg:flex-grow">
                <div className="h-14 w-full rounded-lg bg-gray-300"></div>
              </div>

              {/* Filtros */}
              <div className="flex flex-col gap-4 sm:gap-4 md:flex-row md:items-center">
                {/* Botón Centros Educativos */}
                <div className="h-12 w-full rounded-lg bg-gray-300 sm:w-48"></div>
                
                {/* Select Filtro */}
                <div className="h-12 w-full rounded-lg bg-gray-300 sm:w-48"></div>
              </div>
            </div>

            {/* Botón Nuevo Curso */}
            <div className="h-12 w-full rounded-lg bg-gray-300 sm:w-48 md:ml-auto lg:w-48 xl:w-48"></div>
          </div>
        </div>

        {/* Grid de cursos */}
        <div className="px-4 sm:px-6 lg:px-8">
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    {[...Array(8)].map((_, index) => (
      <CourseCardSkeleton key={index} />
    ))}
  </div>
</div>

      </div>
    </div>
    </div>
  );
};