import { Dialog } from "@headlessui/react";
import { FiAlertTriangle } from "react-icons/fi";
import BrutalButton from "../ui/BrutalButton";

/**
 *
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} [props.isOpen] - Indica si el modal esta abierto.
 * @param {function} [props.onClose] - Función que se ejecuta para cerrar el modal.
 * @param {"center" | "course" | "user" | "student" | "activity"} [props.itemType] - Tipo de elemento a eliminar. Afecta al mensaje mostrado. Ej: "course", "user", "student".
 * @param {string} [props.itemName] - Nombre del elemento a eliminar. Aparece en el mensaje del modal.
 * @param {string} [props.description] - Descripción breve adicional sobre la eliminación.
 * @param {function} [onConfirm] - Función que se ejecuta cuando el usuario confirma la eliminación.
 * @param {boolean} [isPending] - Indica si hay una operación en curso, como la eliminación del elemento.
 *
 * @returns {JSX.Element} Modal reutilizable con mensajes y variables.
 */

const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  itemType,
  itemName,
  description,
  onConfirm,
  isPending,
}) => {
  const generateMessage = (itemType, itemName) => {
    switch (itemType) {
      case "center":
        return `¿Eliminar el centro educativo “${itemName}”?`;
      case "course":
        return `¿Eliminar el curso “${itemName}”?`;
      case "user":
        return `¿Eliminar su cuenta “${itemName}”?`;
      case "student":
        return `¿Eliminar al estudiante “${itemName}”?`;
      case "activity":
        return `¿Eliminar la actividad “${itemName}”?`;
      default:
        return `¿Eliminar ${itemType} “${itemName}”?`;
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition duration-300"
    >
      <div className="w-full max-w-lg rounded-lg border-2 bg-white p-6 shadow-xl">
        <div className="flex items-center justify-center">
          <FiAlertTriangle className="text-error-bg mb-4 h-12 w-12" />
        </div>
        <div className="text-center">
          <h2 className="text-lg font-semibold text-black">
            Confirmar eliminación
          </h2>
          <p className="mt-4 text-base text-black">
            {generateMessage(itemType, itemName)}{" "}
            <span className="text-error-bg font-semibold">
              Esta acción es irreversible.
            </span>
          </p>
          {description && (
            <p className="mt-2 text-sm leading-snug text-gray-500">
              {description}
            </p>
          )}
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <BrutalButton
            variant="primary"
            className="bg-error-text hover:bg-red-900"
            onClick={onConfirm}
            disabled={isPending}
          >
            {isPending ? "Eliminando..." : "Eliminar"}
          </BrutalButton>
          <BrutalButton
            variant="secondary"
            onClick={onClose}
            disabled={isPending}
          >
            Cancelar
          </BrutalButton>
        </div>
      </div>
    </Dialog>
  );
};

export default ConfirmDeleteModal;
