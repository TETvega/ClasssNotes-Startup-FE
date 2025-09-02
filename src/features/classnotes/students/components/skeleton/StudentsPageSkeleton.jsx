export const StudentsPageSkeleton = ({ pageSize }) => {
  return (
    <div className="w-full animate-pulse">
      <div className="flex flex-col gap-4 sm:gap-6">
        {/* Header y Controles */}
        <div className="flex flex-col items-start justify-between gap-2 sm:gap-4 md:flex-row md:items-center">
          <div className="flex w-full items-center gap-2 md:w-auto">
            <div className="flex items-center gap-2">
              <button className="size-8 rounded-lg bg-gray-300 sm:size-10"></button>
              <h1 className="h-6 w-8 rounded-md bg-gray-300 sm:h-8 sm:w-10"></h1>
              <h1 className="h-6 w-8 rounded-md bg-gray-300 sm:h-8 sm:w-10"></h1>
            </div>
            <p className="mt-1 h-4 w-20 rounded-md bg-gray-300 sm:w-40"></p>
          </div>
        </div>

        {/* Filtros y búsqueda */}
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
          <div className="relative h-10 w-full flex-grow">
            <div className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400"></div>
            <input
              type="text"
              disabled
              className="h-10 w-full rounded-md bg-gray-300 py-2 pr-4 pl-10 focus:ring-2 focus:outline-none"
            />
          </div>

          <div className="mt-2 flex gap-2 whitespace-nowrap sm:mt-0">
            <button className="h-10 w-16 rounded-md bg-gray-300 sm:w-24"></button>

            <div className="flex h-10 w-full items-center gap-2 rounded-md border border-gray-300 px-3 py-2 sm:w-32 md:w-40">
              <div className="h-5 w-full bg-gray-300"></div>
            </div>
            <div className="flex h-10 w-full items-center gap-2 rounded-md border border-gray-300 px-3 py-2 sm:w-32 md:w-40">
              <div className="h-5 w-full bg-gray-300"></div>
            </div>
          </div>
        </div>

        {/* Tabla de estudiantes */}
        <div className="w-full overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-12 px-2 py-2 text-left sm:px-6 sm:py-3"></th>
                <th className="w-[50%] px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase sm:w-[40%] sm:px-6 sm:py-3">
                  Nombre
                </th>
                <th className="hidden w-[40%] px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase sm:table-cell sm:px-6 sm:py-3">
                  Email
                </th>
                <th className="hidden px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase sm:px-6 sm:py-3 md:table-cell">
                  Actividades
                </th>
                <th className="w-12 px-2 py-2 sm:px-6 sm:py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {[...Array(pageSize)].map((_, index) => (
                <tr key={index}>
                  <td className="px-2 py-3 sm:px-6 sm:py-4">
                    <div className="h-4 w-4 animate-pulse rounded bg-gray-200"></div>
                  </td>
                  <td className="px-2 py-3 sm:px-6 sm:py-4">
                    <div className="h-4 w-20 animate-pulse rounded bg-gray-200 sm:w-32"></div>
                  </td>
                  <td className="hidden px-2 py-3 sm:table-cell sm:px-6 sm:py-4">
                    <div className="h-4 w-28 animate-pulse rounded bg-gray-200 sm:w-40"></div>
                  </td>
                  <td className="hidden px-2 py-3 sm:px-6 sm:py-4 md:table-cell">
                    <div className="h-4 w-16 animate-pulse rounded bg-gray-200 sm:w-24"></div>
                  </td>
                  <td className="px-2 py-3 text-right sm:px-6 sm:py-4">
                    <div className="h-4 w-6 animate-pulse rounded bg-gray-200 sm:w-8"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
