export const ActivityFormSkeleton = () => {
  return (
    <div className="w-full">
      <div className="mt-6 animate-pulse rounded-lg border bg-gray-50 p-4 shadow-xl sm:p-6">
        {/* Título */}
        <div className="mb-4 h-6 w-1/3 rounded bg-gray-300 sm:h-8" />

        {/* Formulario */}
        <div className="space-y-4">
          {/* Nombre */}
          <div>
            <div className="mb-2 h-4 w-40 rounded bg-gray-300" />
            <div className="h-10 w-full rounded-lg bg-gray-200" />
          </div>

          {/* Descripción */}
          <div>
            <div className="mb-2 h-4 w-44 rounded bg-gray-300" />
            <div className="h-24 w-full rounded-lg bg-gray-200" />
          </div>

          {/* Selectores */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <div className="mb-2 h-4 w-20 rounded bg-gray-300" />
              <div className="h-10 w-full rounded-lg bg-gray-200" />
            </div>
            <div>
              <div className="mb-2 h-4 w-20 rounded bg-gray-300" />
              <div className="h-10 w-full rounded-lg bg-gray-200" />
            </div>
            <div>
              <div className="mb-2 h-4 w-32 rounded bg-gray-300" />
              <div className="h-10 w-full rounded-lg bg-gray-200" />
            </div>
          </div>

          {/* Toggle de sobre 100 */}
          <div className="mt-4 flex items-center gap-4">
            <div className="h-4 w-52 rounded bg-gray-300" />
            <div className="relative h-6 w-12 rounded-full bg-gray-300">
              <div className="absolute top-0 left-0 h-6 w-6 rounded-full border border-gray-300 bg-white shadow" />
            </div>
            <div className="ml-2 h-4 w-4 rounded-full bg-gray-300" />
          </div>

          {/* Calificación máxima */}
          <div>
            <div className="mb-2 h-4 w-36 rounded bg-gray-300" />
            <div className="h-10 w-full rounded-lg bg-gray-200" />
          </div>

          {/* Botones */}
          <div className="mt-6 flex w-full flex-col justify-between gap-3 sm:flex-row">
            <div className="w-full sm:w-auto">
              <div className="h-10 w-full rounded-lg bg-gray-300 sm:w-40" />
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <div className="h-10 w-full rounded-lg bg-gray-300 sm:w-32" />
              <div className="h-10 w-full rounded-lg bg-gray-300 sm:w-60" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
