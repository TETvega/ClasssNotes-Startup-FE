import { FaRegTrashAlt } from "react-icons/fa";
import { BookOpenCheck, FilePenLine } from "lucide-react";
import { LuUserCheck, LuUserX } from "react-icons/lu";
import { useState } from "react";
import { useStudentEditForm } from "../../hooks";
import { MoreActions } from "../../../../../shared/components";
import { StudentActivitiesModal, StudentEditModal } from "../modals";
import ConfirmDeleteModal from "../../../../../shared/components/modals/ConfirmDeleteModal";

export const StudentTableRow = ({
  student,
  selectedStudents,
  handleSelectStudent,
  handleDeleteStudents,
  handleChangeStudentsState,
  isDeleting,
  isChangingState,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { formik } = useStudentEditForm(student);

  return (
    <tr
      className={student.isActive === false ? "bg-gray-50 text-gray-500" : ""}
    >
      {/* CheckBox */}
      <td className="px-6 py-4 whitespace-nowrap">
        <input
          type="checkbox"
          className="size-4 rounded border-gray-300"
          checked={selectedStudents.includes(student.studentId)}
          onChange={() => handleSelectStudent(student.studentId)}
        />
      </td>

      {/* Nombre Estudiante */}
      <td className="pointer-events-none px-6 py-4 whitespace-nowrap max-[1024px]:px-0">
        <div className="flex items-center gap-2">
          <span className="relative inline-block font-medium">
            {student.firstName} {student.lastName}
            <span
              className={`absolute top-0 right-[-15px] hidden h-3 w-3 rounded-full border-2 border-white max-[500px]:inline-flex ${
                student.isActive === false
                  ? "bg-gray-400"
                  : student.pendingActivities > 0
                    ? "border border-red-600 bg-red-300"
                    : "border border-green-600 bg-green-300"
              }`}
            ></span>
          </span>
        </div>
      </td>

      {/* Email */}
      <td className="pointer-events-none px-6 py-4 whitespace-nowrap max-[1024px]:hidden">
        {student.eMail}
      </td>

      {/* Actividades */}
      <td className="pointer-events-none px-4 py-4 max-[500px]:hidden">
        <span
          className={`inline-flex items-center truncate rounded-full ${
            student.isActive === false
              ? "border border-gray-300 bg-gray-100 text-gray-500"
              : student.pendingActivities > 0
                ? "bg-red-100 text-red-800"
                : "border border-green-200 bg-green-100 text-green-800"
          } px-2.5 py-0.5 text-xs font-medium`}
        >
          {student.isActive === false ? (
            <span className="px-2 py-0.5 text-xs font-medium text-gray-800">
              Inactivo
            </span>
          ) : student.pendingActivities > 0 ? (
            `${student.pendingActivities} pendientes`
          ) : (
            "Al día"
          )}
        </span>
      </td>

      {/* Menú de acciones */}
      <td className="px-6 py-4 text-right text-sm font-medium whitespace-normal">
        <div className="relative">
          <MoreActions
            actions={[
              {
                icon: <BookOpenCheck />,
                label: "Ver actividades",
                className: "text-gray-700",
                onClick: () => setIsModalOpen(true),
              },
              {
                icon: <FilePenLine />,
                label: "Editar información",
                className: "text-gray-700",
                onClick: () => setIsEditModalOpen(true),
              },
              {
                icon:
                  student.isActive === false ? <LuUserCheck /> : <LuUserX />,
                label: `${
                  student.isActive === false ? "Activar" : "Desactivar"
                } estudiante`,
                className: "text-gray-700",
                onClick: () => handleChangeStudentsState([student.studentId]),
                disabled: isChangingState,
              },
              {
                icon: <FaRegTrashAlt />,
                label: "Eliminar estudiante",
                className: "text-red-600",
                onClick: () => setIsDeleteModalOpen(true),
              },
            ]}
          />
        </div>
      </td>

      {/* Modal de Actividades */}
      <td>
        <StudentActivitiesModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          student={{
            studentId: student.studentId,
            name: `${student.firstName} ${student.lastName}`,
            email: student.eMail,
          }}
        />
      </td>

      {/* Modal de Edición */}
      <td>
        <StudentEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          formik={formik}
          student={student}
        />
      </td>

      {/* Modal de Confirmación de Eliminación */}
      <td>
        <ConfirmDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => {
            handleDeleteStudents([student.studentId]);
            setIsDeleteModalOpen(false);
          }}
          itemType="student"
          itemName={`${student.firstName} ${student.lastName}`}
          description="El estudiante será eliminado permanentemente del curso."
          isPending={isDeleting}
        />
      </td>
    </tr>
  );
};
