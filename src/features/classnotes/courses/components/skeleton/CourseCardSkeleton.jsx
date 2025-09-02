export const CourseCardSkeleton = () => {
  return (
    <div className="animate-pulse w-full">

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="p-4">
          <div className="h-7 w-50 mb-2 rounded-lg bg-gray-300"></div>  {/* Nombre del curso */}
          <div className="mb-3 flex justify-between text-sm text-gray-500">
            <div className="h-4 w-10 rounded-lg bg-gray-300"></div> {/* Código del curso */}
            <div className="h-4 w-10 rounded-lg bg-gray-300"></div> {/* Abreviación del centro educativo */}
          </div>

          {/* Cantidad de estudiantes */}
          <div className="h-6 w-32 mb-2 rounded-lg bg-gray-300"></div>

          <div className="h-5 w-full mb-1 rounded-lg bg-gray-300"></div>  {/* Progreso de actividades */}
          <div className="h-3 w-full mb-2 rounded-lg bg-gray-300"></div>  {/* Barra de progreso */}

          {/* Botón Ver Curso*/}
          <div className="h-10 w-full mb-2 rounded-lg bg-gray-300"></div>

        </div>
      </div>

    </div>
  )
}
