export const DashboardStudentsSkeleton = () => {
  // Crear un array de 5 elementos para representar filas de estudiantes en el skeleton
  const skeletonRows = [1, 2, 3, 4, 5];

  return (
    <div className="mt-4 overflow-hidden rounded-lg bg-white shadow-lg">
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-gray-700">
          <tr>
            <th className="p-3">Nombre</th>
            <th className="hidden p-3 md:table-cell">Correo</th>
            <th className="hidden p-3 text-center md:table-cell">Clases</th>
            <th className="hidden p-3 text-center md:table-cell">Pendientes</th>
            <th className="p-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {skeletonRows.map((index) => (
            <tr key={index} className="-t">
              <td className="p-3">
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="mb-1 h-5 w-32 animate-pulse rounded bg-gray-200 md:mr-2 md:mb-0"></div>
                  <div className="h-4 w-40 animate-pulse rounded bg-gray-200 md:hidden"></div>
                </div>
              </td>
              <td className="hidden p-3 md:table-cell">
                <div className="h-5 w-40 animate-pulse rounded bg-gray-200"></div>
              </td>
              <td className="hidden p-3 text-center md:table-cell">
                <div className="mx-auto h-6 w-8 animate-pulse rounded-full bg-gray-200"></div>
              </td>
              <td className="hidden p-3 text-center md:table-cell">
                <div className="mx-auto h-6 w-8 animate-pulse rounded-full bg-gray-200"></div>
              </td>
              <td className="p-3 text-center">
                <div className="flex flex-col items-center justify-center gap-1 md:flex-row md:items-center">
                  <div className="h-4 w-4 animate-pulse rounded-full bg-gray-200"></div>
                  <div className="h-4 w-16 animate-pulse rounded bg-gray-200"></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
