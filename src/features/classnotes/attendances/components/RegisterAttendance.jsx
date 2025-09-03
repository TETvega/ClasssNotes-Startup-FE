import { RiUserSearchLine } from "react-icons/ri";
import { IoPersonSharp } from "react-icons/io5";
import { useStudentsFilter } from "../hooks";
import BrutalSearchBar from "../../../../shared/components/ui/BrutalSearchBar";
import { NotFound } from "../../../../shared/components/ui";
import BrutalPagination from "../../../../shared/components/ui/BrutalPagination";

export const RegisterAttendanceComponents = ({
  students,
  pageSizeOptions,
  handlePageChange,
  handlePageSizeChange,
  handleSearch,
}) => {
  const {
    filter,
    filterOptions,
    filteredStudents,
    getNotFoundMessage,
    getStatusColorClass,
    getStatusIcon,
    setFilter,
  } = useStudentsFilter(students);

  return (
    <section className="space-y-6">
      <div className="w-full rounded-2xl border-2 border-gray-200 bg-white p-4 shadow-xl sm:p-6 lg:p-8">
        <h2 className="mb-4 text-xl font-bold sm:text-2xl">
          Registro de Asistencias
        </h2>

        {/* Barra de búsqueda y filtros */}
        <div className="mb-6 flex flex-col gap-4 sm:items-center sm:justify-between md:flex-row">
          <div className="relative w-full md:w-1/3">
            <BrutalSearchBar showButtonText={false} onSearch={handleSearch} />
          </div>
          <div className="flex gap-1 whitespace-nowrap sm:w-full md:gap-2">
            {filterOptions.map((item) => (
              <button
                key={item.text}
                title={item.text}
                className={`flex w-full cursor-pointer items-center justify-center px-2 py-2 text-sm font-medium transition-all sm:px-4 ${
                  filter === item.value
                    ? "border-gray-400 bg-gray-400 text-white shadow-md"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                } rounded-lg`}
                onClick={() => setFilter(item.value)}
              >
                <span className="hidden items-center gap-1 lg:inline-flex">
                  {item.icon}
                  <span>{item.text}</span>
                </span>

                <span className="lg:hidden">{item.icon}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Lista de estudiantes */}
        <div className="w-full">
          {filteredStudents.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className="relative flex flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                >
                  {/* Indicador de estado */}
                  <div
                    className={`absolute top-0 left-0 h-full w-2 rounded-l-lg ${getStatusColorClass(
                      student.status,
                    )}`}
                  ></div>

                  {/* Información del estudiante */}
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                      <IoPersonSharp className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-bold text-gray-900">
                        {student.firstName} {student.lastName}
                      </h3>
                      <p className="truncate text-xs text-gray-500">
                        {student.email}
                      </p>
                    </div>
                    <div>{getStatusIcon(student.status)}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <NotFound
              message={`${getNotFoundMessage()}`}
              icon={<RiUserSearchLine size={40} />}
            />
          )}
        </div>
      </div>

      <div className="w-full rounded-2xl border-2 border-gray-200 bg-white p-4 shadow-xl">
        <BrutalPagination
          currentPage={students.currentPage}
          pageSize={students.pageSize}
          totalItems={students.totalItems}
          totalPages={students.totalPages}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          hasPreviousPage={students.hasPreviousPage}
          hasNextPage={students.hasNextPage}
          pageSizeOptions={[...pageSizeOptions, students.totalItems]}
          itemLabel="estudiantes"
        />
      </div>
    </section>
  );
};
