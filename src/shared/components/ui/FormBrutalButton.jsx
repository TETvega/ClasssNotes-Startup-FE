/**
 * Componente de botón personalizado con estilos y comportamiento específicos.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Contenido del botón.
 * @param {function} props.onClick - Función que se ejecuta al hacer clic en el botón.
 * @param {boolean} [props.disabled=false] - Indica si el botón está deshabilitado.
 * @param {string} [props.className=""] - Clases CSS adicionales para el botón.
 * @param {string} [props.type="button"] - Tipo de botón (por defecto es "button").
 *
 * @returns {JSX.Element} Botón con estilos y comportamiento personalizados.
 */

const FormBrutalButton = ({
  children,
  onClick,
  disabled = false,
  className = "",
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-block w-full rounded-lg py-2.5 text-center text-sm font-bold shadow-[5px_5px_0px_rgba(0,0,0,1)] transition duration-200 ${
        disabled
          ? "bg-disabled-bg cursor-not-allowed text-black"
          : "bg-brand-primary text-text-tertiary hover:bg-action-primary hover:cursor-pointer hover:shadow-md"
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default FormBrutalButton;
