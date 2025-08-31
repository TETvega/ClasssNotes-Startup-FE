import { FaRegQuestionCircle } from "react-icons/fa";

/**
 * @param {Object} props - Propiedades del componente.
 * @param {string} [props.message] - Mensaje informativo que se muestra al usuario.
 * @param {"bottom" | "top" | "left" | "right"} [props.position] - Dirección hacía la que se quiere mostrar el cuadro de texto respecto al icono.
 * @param {string} [props.width] - Anchura del cuadro de texto
 * @param {string} [props.height] - Altura del cuadro de texto.
 * @param {React.ReactNode} [props.icon] - Icono del componente.
 *
 * @returns {JSX.Element} Componente reutilizable con variantes.
 */

export const HelpIcon = ({
  message,
  position = "bottom",
  width = "50",
  height = "50",
  icon = <FaRegQuestionCircle size={16} />,
}) => {
  const positionClasses = {
    bottom: "top-full mt-2 left-1/2 transform -translate-x-1/2",
    top: "bottom-full mb-2 left-1/2 transform -translate-x-1/2",
    left: "right-full mr-2 top-1/2 transform -translate-y-1/2",
    right: "left-full ml-2 top-1/2 transform -translate-y-1/2",
  };

  const arrowClasses = {
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-0 border-b-4 border-l-transparent border-r-transparent border-b-black",
    top: "top-full left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-b-0 border-t-4 border-l-transparent border-r-transparent border-t-black",
    left: "left-full top-1/2 -translate-y-1/2 border-t-4 border-b-4 border-r-0 border-l-4 border-t-transparent border-b-transparent border-l-black",
    right: "right-full top-1/2 -translate-y-1/2 border-t-4 border-b-4 border-l-0 border-r-4 border-t-transparent border-b-transparent border-r-black",
  };

  return (
    <div
      className="group relative inline-block"
      aria-describedby="tooltip-content"
    >
      <span className="hover:text-disabled-text flex items-center justify-center">
        {icon}
      </span>

      <div
        id="tooltip-content"
        role="tooltip"
        className={`absolute z-10 ${positionClasses[position]} hidden group-hover:block w-${width} h-${height} rounded bg-black px-2 py-3 text-xs text-white shadow-lg`}
      >
        <div className="text-center">{message}</div>

        <div className={`absolute h-0 w-0 ${arrowClasses[position]}`}></div>
      </div>
    </div>
  );
};
