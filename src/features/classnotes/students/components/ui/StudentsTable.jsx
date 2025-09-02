import { NotFound } from "../../../../../shared/components/ui";
import { StudentTableSkeleton } from "../skeleton";
import { StudentTableRow } from "./StudentTableRow";

export const StudentsTable = ({
  students = [],
  selectedStudents,
  handleSelectStudent,
  handleSelectAllStudents,
  isFiltering,
  setIsFiltering,
  pageSize = 10,
  handleDeleteStudents,
  handleChangeStudentsState,
  isDeleting,
  isChangingState,
}) => {
  if (isFiltering) {
    setTimeout(() => {
      setIsFiltering(false);
    }, 2000);
    return <StudentTableSkeleton pageSize={pageSize} />;
  }

  return (
    <table className="max-h-full min-w-full divide-y divide-gray-200">
      <thead className="sticky top-0 z-10 bg-gray-50">
        <tr>
          <th scope="col" className="w-12 px-6 py-3 text-left">
            <input
              type="checkbox"
              onChange={handleSelectAllStudents}
              checked={
                students.length > 0 &&
                selectedStudents.length === students.length
              }
              className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
              aria-label="Seleccionar todos"
            />
          </th>
          <th className="w-[40%] px-6 py-4 text-left text-xs font-medium tracking-wider text-gray-500 uppercase max-[1024px]:px-0">
            Nombre
          </th>
          <th className="w-[40%] px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase max-[1024px]:hidden max-[1024px]:px-0">
            Email
          </th>
          <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-gray-500 uppercase max-[1024px]:px-0 max-[500px]:hidden">
            Actividades
          </th>
          <th className="w-12 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase max-[1024px]:pl-0"></th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {students.length > 0 ? (
          students.map((student) => (
            <StudentTableRow
              student={student}
              key={student.studentId}
              handleSelectStudent={handleSelectStudent}
              selectedStudents={selectedStudents}
              handleDeleteStudents={handleDeleteStudents}
              handleChangeStudentsState={handleChangeStudentsState}
              isDeleting={isDeleting}
              isChangingState={isChangingState}
            />
          ))
        ) : (
          <tr>
            <td colSpan={5}>
              <div className="h-96">
                <NotFound message="No se encontraron estudiantes con los filtros aplicados." />
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
