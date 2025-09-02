import { FileText, Mail } from "lucide-react";
import { useEffect } from "react";
import BrutalSearchBar from "../../../../../shared/components/ui/BrutalSearchBar";
import { NotFound } from "../../../../../shared/components/ui";

export const StudentTable = ({
  students,
  selectedStudents,
  onSelectStudent,
  onOpenModalFromMailIcon,
  onFilterChange,
  setSearchTerm,
}) => {
  // Determinar las unidades disponibles (dinámicamente)
  const getUnits = () => {
    const units = new Set();
    students.forEach((student) => {
      Object.keys(student.grades).forEach((key) => {
        if (key.startsWith("unidad")) {
          units.add(key);
        }
      });
    });
    return Array.from(units).sort((a, b) => {
      const numA = parseInt(a.replace("unidad", ""));
      const numB = parseInt(b.replace("unidad", ""));
      return numA - numB;
    });
  };

  const units = getUnits();

  // Manejar el evento de búsqueda
  const handleSearch = (query) => {
    setSearchTerm(query);
  };

  // Manejar la selección de estudiantes
  const handleSelectStudent = (studentId) => {
    onSelectStudent(studentId);
  };

  // Notificar al componente padre sobre el número de estudiantes filtrados
  useEffect(() => {
    if (onFilterChange) {
      onFilterChange({
        filteredCount: students.length,
        isFiltering: false,
      });
    }
  }, [students.length, onFilterChange]);

  return (
    <>
      {/* Tabla para pantallas grandes */}
      <div className="hidden min-w-full rounded-lg border border-gray-300 xl:block">
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
            onSearch={handleSearch}
            initialValue=""
          />
        </div>
        {students.length === 0 ? (
          <NotFound message="No se encontraron estudiantes" />
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-bold tracking-wider text-gray-500 uppercase"
                >
                  #
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold tracking-wider text-gray-500 uppercase"
                >
                  Estudiante
                </th>
                {units.map((unitKey) => (
                  <th
                    key={unitKey}
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-bold tracking-wider text-gray-500 uppercase"
                  >
                    Unidad {unitKey.replace("unidad", "")}
                  </th>
                ))}
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-bold tracking-wider text-gray-500 uppercase"
                >
                  Promedio
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold tracking-wider text-gray-500 uppercase"
                >
                  Estado
                </th>
                <th
                  scope="col"
                  className="py-3 pr-6 text-center text-xs font-bold tracking-wider text-gray-500 uppercase"
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="py-4 pl-4 text-center whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600"
                      checked={selectedStudents.includes(student.id)}
                      onChange={() => handleSelectStudent(student.id)}
                    />
                  </td>
                  <td className="px-6 py-4 text-left text-sm font-medium whitespace-nowrap text-gray-900">
                    {student.name}
                  </td>
                  {units.map((unitKey) => (
                    <td
                      key={unitKey}
                      className="px-6 py-4 text-center text-sm whitespace-nowrap text-gray-500"
                    >
                      {Number(student.grades[unitKey] || 0).toFixed(1)}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-center text-sm whitespace-nowrap text-gray-500">
                    {Number(student.average).toFixed(1)}
                  </td>
                  <td className="px-6 py-4 text-left text-sm whitespace-nowrap">
                    <span
                      className={`rounded-md px-2 py-1 ${
                        student.status === "Excelente"
                          ? "bg-green-500 text-white"
                          : student.status === "Bueno"
                            ? "bg-blue-500 text-white"
                            : student.status === "Bajo"
                              ? "bg-yellow-500 text-white"
                              : student.status === "Reprobado"
                                ? "bg-red-500 text-white"
                                : "bg-gray-500 text-white"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 text-center text-sm whitespace-nowrap text-gray-500">
                    <Mail
                      className="cursor-pointer"
                      onClick={() => {
                        onOpenModalFromMailIcon(student.id);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* Cards para pantallas pequeñas */}
      <div className="mt-4 space-y-4 xl:hidden">
        <div className="flex flex-col items-start rounded-lg border-b border-gray-300 bg-white px-4 py-3 text-gray-800">
          <div className="flex w-full items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-7 w-7 text-green-500" />
            </div>
            <span className="text-sm font-semibold">
              Calificaciones por estudiante
            </span>
          </div>
          <div className="mt-2 w-full">
            <BrutalSearchBar
              placeholder="Buscar..."
              className="w-full rounded-md px-3 pl-10"
              onSearch={handleSearch}
              initialValue=""
            />
          </div>
        </div>
        {students.length === 0 ? (
          <NotFound message="No se encontraron estudiantes" />
        ) : (
          students.map((student) => (
            <div
              key={student.id}
              className="rounded-lg border border-gray-300 bg-white p-4 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600"
                    checked={selectedStudents.includes(student.id)}
                    onChange={() => handleSelectStudent(student.id)}
                  />
                  <span className="font-medium text-gray-900">
                    {student.name}
                  </span>
                </div>
                <Mail
                  className="cursor-pointer"
                  onClick={() => {
                    onOpenModalFromMailIcon(student.id);
                  }}
                />
              </div>
              <div className="space-y-2">
                {units.map((unitKey) => (
                  <div
                    key={unitKey}
                    className="flex items-center justify-between"
                  >
                    <p className="text-sm font-medium text-gray-700">
                      Unidad {unitKey.replace("unidad", "")}:
                    </p>
                    <p className="text-sm text-gray-500">
                      {Number(student.grades[unitKey] || 0).toFixed(1)}
                    </p>
                  </div>
                ))}
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-700">Promedio:</p>
                  <p className="text-sm text-gray-500">
                    {Number(student.average).toFixed(1)}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-700">Estado:</p>
                  <span
                    className={`rounded-md px-2 py-1 ${
                      student.status === "Excelente"
                        ? "bg-green-500 text-white"
                        : student.status === "Bueno"
                          ? "bg-blue-500 text-white"
                          : student.status === "Bajo"
                            ? "bg-yellow-500 text-white"
                            : student.status === "Reprobado"
                              ? "bg-red-500 text-white"
                              : "bg-gray-500 text-white"
                    }`}
                  >
                    {student.status}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};
