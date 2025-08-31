/**
 * Componente reutilizable de botón con estilos basados en FormBrutalButton.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {"primary" | "secondary" | "icon"} [props.variant="primary"] - Tipo de botón.
 * @param {React.ReactNode} [props.icon] - Icono opcional para el botón.
 * @param {React.ReactNode} props.children - Contenido del botón.
 * @param {function} [props.onClick] - Función que se ejecuta al hacer clic.
 * @param {boolean} [props.disabled=false] - Indica si el botón está deshabilitado.
 * @param {string} [props.className=""] - Clases CSS adicionales.
 * @param {string} [props.type="button"] - Tipo de botón (por defecto "button").
 * @param {boolean} [props.shadow=true] - Mostrar botón con sombra
 *
 * @returns {JSX.Element} Botón reutilizable con estilos y variantes.
 */

const BrutalButton = ({
  variant = "primary",
  icon,
  children,
  onClick,
  disabled = false,
  className = "",
  type = "button",
  shadow = true,
  title = "",
}) => {
  const isWidthFull =
    (variant === "primary" || variant === "secondary") && "w-full";

  const baseStyles = `inline-flex items-center justify-center gap-2 rounded-lg py-2.5 text-center font-sans text-sm font-bold ${shadow && "shadow-[5px_5px_0px_rgba(0,0,0,1)] transition duration-200"} ${isWidthFull}`;

  const variants = {
    primary: disabled
      ? "text-black"
      : "bg-brand-primary hover:bg-action-primary text-white ",
    secondary: disabled
      ? "text-black"
      : "bg-white border border-gray-400 text-gray-700 hover:bg-gray-100",
    icon: disabled
      ? "text-black"
      : "bg-brand-primary hover:bg-action-primary text-white px-4",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`${baseStyles} ${variants[variant]} ${
        disabled
          ? "cursor-not-allowed bg-gray-300 text-black"
          : "hover:cursor-pointer hover:shadow-md"
      } ${className}`}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};

export default BrutalButton;
