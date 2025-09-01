export const CenterDashboardCardSkeleton = () => {
  return (
    <div className="relative overflow-hidden rounded-lg bg-white shadow-[0px_6px_23px_-10px_rgba(0,_0,_0,_0.8)]">
      {/* Barra lateral de estado */}
      <div className="absolute top-0 left-0 h-full w-1 bg-gray-200"></div>

      <div className="px-6 pt-4 pb-1">
        <section className="flex animate-pulse flex-row justify-between">
          {/* Header Nombre y Código de Clase */}
          <div className="mb-4">
            <div className="mb-2 h-6 w-32 rounded-md bg-gray-200"></div>
            <div className="h-4 w-20 rounded-md bg-gray-200"></div>
          </div>

          <div className="mb-4">
            <div className="h-6 w-16 rounded-full bg-gray-200"></div>
          </div>
        </section>

        {/* Cantidad de Estudiantes y Promedio */}
        <div className="mb-2 flex animate-pulse items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="h-4 w-4 rounded-full bg-gray-200"></div>
            <div className="h-4 w-24 rounded-md bg-gray-200"></div>
          </div>
          <div className="h-4 w-20 rounded-md bg-gray-200"></div>
        </div>

        {/* Body de la card */}
        <div className="mb-4 animate-pulse">
          {/* Muestra el progreso de actividades */}
          <div className="mb-2 flex items-center justify-between">
            <div className="h-4 w-40 rounded-md bg-gray-200"></div>
            <div className="h-4 w-8 rounded-md bg-gray-200"></div>
          </div>

          {/* Barra de progreso */}
          <div className="mb-4 h-2 w-full rounded-full bg-gray-200"></div>

          {/* Próxima actividad skeleton */}
          <div className="mb-4 rounded-md bg-gray-100 p-3">
            <div className="mb-2 h-4 w-32 rounded-md bg-gray-200"></div>
            <div className="flex justify-between">
              <div className="h-4 w-24 rounded-md bg-gray-200"></div>
              <div className="h-4 w-20 rounded-md bg-gray-200"></div>
            </div>
          </div>

          {/* Botón para ver el Curso */}
          <div className="h-10 w-full rounded-md bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
};
