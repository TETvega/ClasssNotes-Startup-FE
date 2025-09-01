export const DashboardActivitiesSkeleton = () => {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {/* Skeleton para Actividades no Evaluadas */}
      <div className="rounded-lg bg-white p-4 shadow-xl">
        {/* Título y subtítulo */}
        <div className="mb-2 h-8 w-3/4 animate-pulse rounded bg-gray-200"></div>
        <div className="mb-4 h-4 w-2/3 animate-pulse rounded bg-gray-200"></div>

        {/* Placeholder para el gráfico */}
        <div className="mt-3 flex items-center justify-center rounded-lg">
          <div className="h-[335px] w-full animate-pulse rounded bg-gray-100"></div>
        </div>

        {/* Botón */}
        <div className="mt-4 mb-4 flex justify-center">
          <div className="h-10 w-32 animate-pulse rounded bg-gray-200"></div>
        </div>
      </div>

      {/* Skeleton para Próximas Actividades */}
      <div className="rounded-lg bg-white p-4 shadow-xl">
        {/* Título y subtítulo */}
        <div className="mb-2 h-8 w-3/4 animate-pulse rounded bg-gray-200"></div>
        <div className="mb-4 h-4 w-2/3 animate-pulse rounded bg-gray-200"></div>

        {/* Lista de actividades */}
        <ul className="mt-3 space-y-2">
          {[1, 2, 3, 4].map((item) => (
            <li key={item} className="rounded-lg bg-gray-100 px-3 py-2">
              <div className="mb-1 h-5 w-3/4 animate-pulse rounded bg-gray-200"></div>
              <div className="mb-1 h-4 w-1/2 animate-pulse rounded bg-gray-200"></div>
              <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200"></div>
            </li>
          ))}
        </ul>

        {/* Botón */}
        <div className="mt-4 mb-4 flex justify-center">
          <div className="h-10 w-32 animate-pulse rounded bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
};
