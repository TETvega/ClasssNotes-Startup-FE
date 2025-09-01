import { FaEye } from "react-icons/fa";
import { useState } from "react";
import { DashboardStudentsSkeleton } from "./skeleton";
import { StudentModal } from "../../students/components/modals/StudentModal";

export const DashboardStudents = ({ students, isLoading }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  if (isLoading) return <DashboardStudentsSkeleton />;

  const handleOpenModal = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  return (
    <>
      {students.length === 0 ? (
        <div className="flex h-40 flex-col items-center justify-center rounded-lg bg-gray-100 text-gray-500 shadow-md">
          <p className="text-center text-xl font-semibold">
            No hay estudiantes para mostrar
          </p>
        </div>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-lg border bg-white shadow-lg">
          <table className="w-full table-fixed text-left">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="w-1/3 p-3">Nombre</th>
                <th className="hidden w-1/3 p-3 md:table-cell">Correo</th>
                <th className="hidden w-1/6 p-3 text-center md:table-cell">
                  Clases
                </th>
                <th className="hidden w-1/6 p-3 text-center md:table-cell">
                  Pendientes
                </th>
                <th className="w-1/6 p-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.map((student) => (
                <tr
                  key={student.studentId}
                  className="border-t transition hover:bg-green-100"
                >
                  <td className="truncate p-3">
                    <div className="flex flex-col md:flex-row md:items-center">
                      <span className="truncate">
                        {student.studentFullName}
                      </span>
                      <span className="truncate text-sm text-gray-500 md:hidden">
                        {student.studentEmail}
                      </span>
                    </div>
                  </td>
                  <td className="hidden truncate p-3 md:table-cell">
                    {student.studentEmail}
                  </td>
                  <td className="hidden p-3 text-center md:table-cell">
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-sm">
                      {student.studentActiveClasesCount}
                    </span>
                  </td>
                  <td className="hidden p-3 text-center md:table-cell">
                    {student.studentPendingActivitiesCount > 0 ? (
                      <span className="rounded-full bg-red-500 px-2 py-1 text-sm text-white">
                        {student.studentPendingActivitiesCount}
                      </span>
                    ) : (
                      <span className="rounded-full bg-gray-200 px-2 py-1 text-sm text-gray-700">
                        0
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-center">
                    <div
                      className="group flex cursor-pointer flex-col items-center justify-center gap-1 md:flex-row md:items-center"
                      onClick={() => handleOpenModal(student)}
                    >
                      <FaEye
                        size={16}
                        className="text-gray-600 group-hover:text-gray-900"
                      />
                      <span className="text-sm group-hover:text-gray-900">
                        Ver perfil
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedStudent && (
        <StudentModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          studentEmail={selectedStudent.studentEmail}
          studentName={selectedStudent.studentFullName}
          studentId={selectedStudent.studentId}
        />
      )}
    </>
  );
};
