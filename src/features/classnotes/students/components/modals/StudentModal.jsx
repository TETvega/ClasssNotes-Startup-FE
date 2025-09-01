import { Dialog, Transition, TransitionChild, DialogPanel } from "@headlessui/react";
import { Fragment } from "react";
import BrutalButton from "../../../../../shared/components/ui/BrutalButton";
import { useStudentPendingActivitiesCourses } from "../../hooks";
import { CourseActivities, StudentInformation } from "../ui";
import { CourseActivitiesSkeleton } from "../skeleton";

export const StudentModal = ({
  studentId,
  studentName,
  studentEmail,
  isOpen,
  onClose,
}) => {
  const { data: courses = [], isLoading } = useStudentPendingActivitiesCourses(
    studentId,
    6,
  );

  return (
    // * Transición para la animación de apertura y cierre del modal
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            {/* Contenedor del modal */}
            <DialogPanel className="mx-auto max-w-3xl rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
              {/* Título del modal */}
              <h1 className="mb-4 text-center text-xl font-semibold">
                Perfil de Estudiante
              </h1>
              <div className="mb-4 border-t border-gray-300"></div>

              {/* Información del estudiante */}
              <StudentInformation
                studentName={studentName}
                studentEmail={studentEmail}
              />

              {/* Lista de cursos y actividades pendientes */}
              {/* Si la lista aun no ha terminado de cargar se muestra el skeleton correspondiente. */}
              {isLoading ? (
                <CourseActivitiesSkeleton />
              ) : (
                <CourseActivities courses={courses} />
              )}

              {/* Botón para cerrar el modal */}
              <div className="mt-4 grid items-center justify-center">
                <BrutalButton
                  variant="secondary"
                  className="px-7 py-2"
                  onClick={onClose}
                >
                  Cerrar
                </BrutalButton>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
