import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BrutalButton from "./BrutalButton";

/**
 * Componente reutilizable para un botón de "Volver atrás".
 *
 * @param {Object} props - Propiedades del componente.
 * @param {number|string} [props.to=-1] - Ruta o paso hacia donde navegar. Por defecto, retrocede una página (-1).
 * @param {string} [props.className=""] - Clases CSS adicionales para personalizar el botón.
 * @param {Function} [props.onClick=() => {}]
 * @returns {JSX.Element} Botón con funcionalidad de navegación hacia atrás.
 */

const BackBrutalButton = ({ to = -1, className = "", onClick = () => {} }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick(); 
    }
    if (typeof to === "number") {
      navigate(to); 
    } else {
      navigate(to); 
    }
  };

  return (
    <BrutalButton
      shadow={false}
      variant="icon"
      icon={<ChevronLeft size={30} />}
      onClick={handleClick}
      className={`size-10 ${className}`}
    />
  );
};

export default BackBrutalButton;
