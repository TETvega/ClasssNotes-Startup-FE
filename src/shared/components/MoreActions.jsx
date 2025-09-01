/**
 * Componente MoreActions con posicionamiento usando useFloating
 *
 * @param {Object} props
 * @param {Array} props.actions - Array de acciones a mostrar en el modal
 * @param {JSX.Element} [props.trigger] - Elemento personalizado para activar el modal
 * @returns {JSX.Element}
 */

import { IoEllipsisVerticalSharp } from "react-icons/io5";
import ActionModal from "./modals/ActionModal";
import { Transition } from "@headlessui/react";
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
} from "@floating-ui/react";
import useClickOutside from "../hooks/useClickOutside";

export const MoreActions = ({ actions = [], trigger = null }) => {
  // Custom Hook para detectar clics fuera del modal
  const { isOpen, ref, buttonRef, setIsOpen } = useClickOutside(false, "btn");

  // Configuración de useFloating para posicionamiento inteligente
  const { refs, floatingStyles } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "bottom-end", // Posición inicial preferida
    middleware: [
      offset(8), // Espacio entre el botón y el modal
      flip(), // Cambia automáticamente entre top/bottom según espacio disponible
      shift(), // Previene que el modal se salga de la pantalla
    ],
    whileElementsMounted: autoUpdate, // Actualiza la posición cuando sea necesario
  });

  // Toggle para abrir/cerrar el menú
  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Botón trigger */}
      <span
        ref={(node) => {
          buttonRef.current = node; // Para useClickOutside
          refs.setReference(node); // Para useFloating
        }}
        onClick={toggleMenu}
        id="btn"
        className="relative cursor-pointer"
      >
        {trigger ? (
          trigger
        ) : (
          <button
            className="rounded-full p-2 hover:cursor-pointer hover:bg-gray-100"
            onClick={toggleMenu}
            id="btn"
          >
            <IoEllipsisVerticalSharp className="size-6 text-gray-700" />
          </button>
        )}
      </span>

      {/* Modal con las acciones */}
      <Transition
        show={isOpen}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-2 scale-95"
        enterTo="opacity-100 translate-y-0 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="opacity-100 translate-y-0 scale-100"
        leaveTo="opacity-0 translate-y-2 scale-95"
      >
        <div
          ref={(node) => {
            ref.current = node; // Para useClickOutside
            refs.setFloating(node); // Para useFloating
          }}
          style={floatingStyles}
          className="absolute z-50 w-auto max-w-max min-w-[10rem] rounded-md border bg-white shadow-lg"
        >
          {actions.map((action, index) => (
            <ActionModal
              key={index}
              icon={action.icon}
              label={action.label}
              className={`flex whitespace-nowrap ${action.className}`}
              onClick={() => {
                if (action.onClick) action.onClick();
                setIsOpen(false);
              }}
            />
          ))}
        </div>
      </Transition>
    </>
  );
};
