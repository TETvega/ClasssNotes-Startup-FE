import { FileText } from "lucide-react";
import BrutalSearchBar from "../../../../../shared/components/ui/BrutalSearchBar";

export const StudentTableSkeleton = () => {
  return (
    <>
      {/* Header y buscador (siempre visibles) */}
      <div className="flex items-center justify-between border-b border-gray-300 bg-white px-4 py-3 text-gray-800">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <FileText className="h-7 w-7 text-green-500" />
          </div>
          <span className="text-lg font-semibold">
            Calificaciones por estudiante
          </span>
        </div>
        <BrutalSearchBar
          placeholder="Buscar..."
          className="w-full rounded-md px-3 pl-10 md:w-[30rem]"
        />
      </div>

      {/* Tabla para pantallas grandes */}
      <div className="hidden min-w-full animate-pulse rounded-lg border border-gray-300 lg:block">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase"
              >
                #
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase"
              >
                Estudiante
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase"
              >
                Unidad I
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase"
              >
                Unidad II
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase"
              >
                Unidad III
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase"
              >
                Unidad VI
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase"
              >
                Promedio
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
              >
                Estado
              </th>
              <th
                scope="col"
                className="py-3 pr-6 text-center text-xs font-medium tracking-wider text-gray-500 uppercase"
              >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {[...Array(6)].map((_, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                <td className="py-4 pl-4 text-center whitespace-nowrap">
                  <div className="h-4 w-4 rounded bg-gray-300"></div>
                </td>
                <td className="px-6 py-4 text-center text-sm whitespace-nowrap">
                  <div className="h-4 w-32 rounded bg-gray-300"></div>
                </td>
                <td className="px-6 py-4 text-center text-sm whitespace-nowrap">
                  <div className="h-4 w-16 rounded bg-gray-300"></div>
                </td>
                <td className="px-6 py-4 text-center text-sm whitespace-nowrap">
                  <div className="h-4 w-16 rounded bg-gray-300"></div>
                </td>
                <td className="px-6 py-4 text-center text-sm whitespace-nowrap">
                  <div className="h-4 w-16 rounded bg-gray-300"></div>
                </td>
                <td className="px-6 py-4 text-center text-sm whitespace-nowrap">
                  <div className="h-4 w-16 rounded bg-gray-300"></div>
                </td>
                <td className="px-6 py-4 text-center text-sm whitespace-nowrap">
                  <div className="h-4 w-16 rounded bg-gray-300"></div>
                </td>
                <td className="px-6 py-4 text-left text-sm whitespace-nowrap">
                  <div className="h-4 w-24 rounded bg-gray-300"></div>
                </td>
                <td className="px-6 text-center text-sm whitespace-nowrap">
                  <div className="h-4 w-6 rounded bg-gray-300"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards para pantallas pequeñas */}
      <div className="mt-4 animate-pulse space-y-4 lg:hidden">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-300 bg-white p-4 shadow-sm"
          >
            {/* Header de la tarjeta */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="h-4 w-4 rounded bg-gray-300"></div>
                <div className="h-4 w-32 rounded bg-gray-300"></div>
              </div>
              <div className="h-4 w-6 rounded bg-gray-300"></div>
            </div>
            {/* Contenido principal de la tarjeta */}
            <div className="space-y-2">
              {[...Array(6)].map((_, itemIndex) => (
                <div
                  key={itemIndex}
                  className="flex items-center justify-between"
                >
                  <div className="h-4 w-24 rounded bg-gray-300"></div>
                  <div className="h-4 w-16 rounded bg-gray-300"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
