import { Fragment } from "react";
import { Dialog, Transition, TransitionChild } from "@headlessui/react";
import BrutalButton from "../../../../../shared/components/ui/BrutalButton";

export const StudentModalSkeleton = () => {
  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {}}>
        {/* Fondo semitransparente */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </TransitionChild>

        {/* Contenedor del modal */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="mx-auto w-full max-w-3xl rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
                {/* Título del modal */}
                <h1 className="mb-4 text-center text-xl font-semibold">
                  Perfil de Estudiante
                </h1>
                <div className="mb-4 border-t border-gray-300"></div>

                {/* Skeleton para información del estudiante */}
                <StudentInformationSkeleton />

                {/* Skeleton para lista de cursos y actividades */}
                <CourseActivitiesSkeleton />

                {/* Botón para cerrar el modal */}
                <div className="mt-4 grid items-center justify-center">
                  <BrutalButton variant="secondary" className="px-7 py-2">
                    Cerrar
                  </BrutalButton>
                </div>
              </Dialog.Panel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

// Skeleton para la información del estudiante
const StudentInformationSkeleton = () => {
  return (
    <div className="mb-6 flex items-center justify-center gap-4">
      {/* Skeleton para ícono del usuario */}
      <div className="h-[86px] w-[86px] animate-pulse rounded-full bg-gray-200"></div>

      {/* Skeleton para nombre y correo */}
      <div className="flex flex-col gap-2">
        <div className="h-8 w-64 animate-pulse rounded-md bg-gray-200"></div>
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 animate-pulse rounded-full bg-gray-200"></div>
          <div className="h-4 w-48 animate-pulse rounded-md bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
};

// Skeleton para la lista de cursos y actividades
export const CourseActivitiesSkeleton = () => {
  return (
    <div className="max-h-60 overflow-y-auto rounded-md bg-gray-100 p-2">
      {/* Encabezados */}
      <div className="mb-1 grid grid-cols-12 border-b border-gray-300 pb-1 font-medium">
        <div className="col-span-8 text-left text-2xl">Cursos</div>
        <div className="col-span-4 text-center">Actividades Pendientes</div>
      </div>

      {/* Skeleton para cursos */}
      {[1, 2, 3, 4, 5].map((index) => (
        <div
          key={index}
          className="grid grid-cols-12 border-b border-gray-200 px-2 py-1.5"
        >
          {/* Skeleton para nombre del curso */}
          <div className="col-span-8">
            <div className="h-6 w-48 animate-pulse rounded-md bg-gray-200"></div>
          </div>

          {/* Skeleton para actividades pendientes */}
          <div className="col-span-4 flex justify-center">
            <div className="h-6 w-6 animate-pulse rounded-md bg-gray-200"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
