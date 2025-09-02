import { Transition } from "@headlessui/react";
import { Eye, Trash2 } from "lucide-react";

export const StudentsSelected = ({
  selectedStudents,
  setSelectedStudents,
  handleDeleteStudents,
  handleChangeStudentsState,
  isDeleting,
  isChangingState,
}) => {
  return (
    <Transition
      appear
      show={selectedStudents.length > 0}
      enter="transition ease-out duration-200"
      enterFrom="opacity-0 translate-y-2 scale-95"
      enterTo="opacity-100 translate-y-0 scale-100"
      leave="transition ease-in duration-150"
      leaveFrom="opacity-100 translate-y-0 scale-100"
      leaveTo="opacity-0 translate-y-2 scale-95"
    >
      <div className="bg-gray-50denly flex w-full flex-col items-center justify-between gap-3 rounded-lg p-4 shadow sm:flex-row">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium whitespace-nowrap text-green-800">
            {selectedStudents.length} seleccionados
          </span>
          <button
            onClick={() => setSelectedStudents([])}
            className="cursor-pointer text-xs whitespace-nowrap text-gray-500 hover:text-gray-700 hover:underline"
            disabled={isDeleting || isChangingState}
          >
            Deseleccionar todos
          </button>
        </div>
        <div className="flex justify-center gap-2">
          <button
            onClick={() => handleChangeStudentsState(selectedStudents)}
            className="flex min-w-[118px] cursor-pointer items-center rounded border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700 transition hover:bg-amber-100"
            disabled={
              isDeleting || isChangingState || selectedStudents.length === 0
            }
          >
            <Eye className="mr-2 h-4 w-4" />
            {isChangingState ? "Procesando..." : "Activar/Desactivar"}
          </button>
          <button
            onClick={() => handleDeleteStudents(selectedStudents)}
            className="flex min-w-[118px] cursor-pointer items-center rounded border border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
            disabled={
              isDeleting || isChangingState || selectedStudents.length === 0
            }
          >
            <Trash2 className="mr-2 h-4 w-4" />
            {isDeleting ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      </div>
    </Transition>
  );
};
