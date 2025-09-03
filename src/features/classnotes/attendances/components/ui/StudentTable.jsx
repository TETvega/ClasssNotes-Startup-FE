import { NotFound } from "../../../../../shared/components/ui";
import BrutalPagination from "../../../../../shared/components/ui/BrutalPagination";
import BrutalSearchBar from "../../../../../shared/components/ui/BrutalSearchBar";
import { StudentRow } from "./StudentRow";

export const StudentTable = ({
  currentCourse,
  studentStats,
  totalPages,
  pageSize,
  totalItems,
  hasPreviousPage,
  hasNextPage,
  searchTerm,
  setSearchTerm,
  page,
  setPageSize,
  pageSizeOptions,
  setPage,
}) => {
  const courseId = currentCourse.id;

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <div className="mb-4 flex justify-between">
        <div>
          <h3 className="text-lg font-semibold">Progreso de Asistencia</h3>
          <p className="text-sm text-gray-500">
            {" "}
            {currentCourse.code && <>{currentCourse.code} - </>}
            {currentCourse.name}{" "}
          </p>
        </div>
        <div>
          <BrutalSearchBar
            placeholder="Buscar estudiante..."
            initialValue={searchTerm}
            onSearch={(value) => setSearchTerm(value)}
          />
        </div>
      </div>

      {studentStats?.items?.length === 0 ? (
        <NotFound message="No se encontraron asistencias" />
      ) : (
        <table className="w-full table-fixed text-left text-sm">
          <thead>
            <tr className="text-text-active-primary border-disabled-text h-[50px] max-w-[1018px] items-center border text-lg font-bold">
              <th className="px-4 py-2 sm:min-w-[240px] md:min-w-[160px] lg:min-w-[240px] xl:min-w-[300px]">
                <span className="hidden lg:inline">Nombre del Estudiante</span>
                <span className="inline lg:hidden">Nombre</span>
              </th>
              <th className="hidden px-4 py-2 md:min-w-[230px] lg:table-cell lg:min-w-[260px] xl:min-w-[300px]">
                Email
              </th>
              <th className="px-4 py-2 sm:min-w-[130px] md:min-w-[70px] lg:min-w-[150px] xl:min-w-[150px]">
                Total
              </th>
              <th className="px-4 py-2 sm:min-w-[150px] md:min-w-[150px] lg:min-w-[250px] xl:min-w-[100px]"></th>
            </tr>
          </thead>
          <tbody>
            {studentStats?.items?.map((student, idx) => (
              <StudentRow
                key={idx}
                {...student}
                attendanceRatePercentage={student.attendanceRatePercentage}
                courseId={courseId}
              />
            ))}
          </tbody>
        </table>
      )}

      <BrutalPagination
        itemLabel={"estudiantes"}
        currentPage={page}
        pageSize={pageSize}
        totalItems={totalItems}
        totalPages={totalPages}
        hasPreviousPage={hasPreviousPage}
        hasNextPage={hasNextPage}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        pageSizeOptions={[...pageSizeOptions, studentStats.totalItems]}
        className="mt-2"
      />
    </div>
  );
};
