import { Dialog } from "@headlessui/react";
import { formatDate } from "../../../../../shared/utils";
import BrutalButton from "../../../../../shared/components/ui/BrutalButton";

export const ViewReminderModal = ({ isOpen, onClose, reminder }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      {/* Contenedor principal del modal */}
      <div
        className="mx-4 w-full rounded-lg border border-black bg-white p-6 shadow-lg sm:mx-auto sm:max-w-2xl sm:p-8" // Margen horizontal en pantallas pequeñas
      >
        {/* Título del modal */}
        <h2 className="mb-4 text-xl font-bold">
          {reminder?.title || "Sin título"}
        </h2>

        {/* Fecha de notificación */}
        <p className="text-inactive-primary-text mb-4 text-sm">
          Fecha de notificación: {formatDate(reminder?.useDate) || "Sin fecha"}
        </p>
        <hr className="my-4" />

        {/* Descripción del recordatorio */}
        <p className="text-sm">{reminder?.content || "Sin descripción"}</p>

        {/* Botón de Cerrar */}
        <div className="mt-4 flex justify-end">
          <BrutalButton
            onClick={onClose}
            variant="icon"
            className="bg-disabled-bg relative hover:bg-gray-300"
          >
            <span className="text-text-active-primary font-extrabold">
              Cerrar
            </span>
          </BrutalButton>
        </div>
      </div>
    </Dialog>
  );
};
