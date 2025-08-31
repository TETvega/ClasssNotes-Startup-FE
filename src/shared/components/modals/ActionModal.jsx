/**
 * Componente ActionModal
 *
 * Componente utilizado para mostrar cada accion del modal
 *
 * @param {Object} props - Propiedades del componente
 * @param {IconType} props.icon - Icono del modal proporcionado por la libreria React Icons
 * @param {string} props.label - Texto de lo que hace la acción
 * @param {string | undefined} props.link - Ruta donde redirige presionar la acción
 * @param {Function | undefined} props.onClick -
 *
 * @returns {JSX.Element} Componente de tarjeta de acción de un modal
 */

import React from "react";
import { Link } from "react-router-dom";

const ActionModal = ({ icon, label, className, link, onClick }) => {
  if (link && onClick) {
    console.warn(
      `Usted ha enviado una ruta link y una función onClick en la acción con el label: "${label}". Tenga en consideración que unicamente funcionará el onClick`,
    );
  }

  if (!link && !onClick) {
    console.error(
      `Usted no ha enviado una ruta link o una funcion onClick en la acción con el label: "${label}", esta acción no se renderizará. Necesita enviar una ruta para link o una función para onClick para que la acción en el modal tenga funcionalidad`,
    );
    return;
  }

  return (
    <div className="p-1">
      {onClick ? (
        <button
          className={`flex min-h-full w-full items-center gap-2 rounded-md p-1 px-2 text-left hover:cursor-pointer hover:bg-gray-100 ${className}`}
          onClick={onClick}
        >
          {icon && React.cloneElement(icon, { className: "size-5" })}
          <span>{label}</span>
        </button>
      ) : (
        <Link
          to={`${link}`}
          className={`flex w-full items-center gap-2 rounded-md px-2 text-left hover:cursor-pointer hover:bg-gray-100 ${className}`}
        >
          {icon && React.cloneElement(icon, { className: "h-5 w-5" })}
          <span>{label}</span>
        </Link>
      )}
    </div>
  );
};

export default ActionModal;
