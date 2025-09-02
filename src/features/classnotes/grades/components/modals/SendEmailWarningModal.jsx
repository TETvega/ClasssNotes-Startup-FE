import { Dialog } from "@headlessui/react";
import BrutalButton from "../../../../../shared/components/ui/BrutalButton";

export const SendEmailWarningModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Dialog
      as="div"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      open={isOpen}
      onClose={onClose}
    >
      {/* Contenedor principal del modal */}
      <div className="mx-4 w-full rounded-lg border border-black bg-white p-6 shadow-lg sm:mx-auto sm:max-w-[520px] sm:p-9">
        {/* Título del modal */}
        <h2 className="mb-2 text-center text-2xl font-bold">¡Atención!</h2>
        {/* Línea gris debajo del título */}
        <div className="mb-4 border-b border-gray-300"></div>
        {/* Mensaje de advertencia */}
        <p className="mb-4 text-center text-sm text-gray-700">
          Este curso no ha finalizado. ¿Seguro quieres enviar las
          calificaciones?
        </p>
        <p className="mb-6 px-8 text-center text-sm font-bold text-black">
          Es posible que las calificaciones no estén listas para ser enviadas.
        </p>
        {/* Botones de acción */}
        <div className="flex justify-between gap-4">
          <BrutalButton
            onClick={onClose}
            variant="primary"
            className="bg-disabled-bg relative flex-1 hover:bg-gray-300"
          >
            <span className="text-text-active-primary font-extrabold">
              Cancelar
            </span>
          </BrutalButton>
          <BrutalButton
            type="button"
            variant="primary"
            className="flex-1"
            onClick={onConfirm}
          >
            Enviar Calificaciones
          </BrutalButton>
        </div>
      </div>
    </Dialog>
  );
};
