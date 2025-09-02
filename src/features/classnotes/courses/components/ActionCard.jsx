import { useNavigate } from "react-router-dom";
import BrutalButton from "../../../../shared/components/ui/BrutalButton";

export const ActionCard = ({
  title,
  description,
  buttons = [],
  isDisabled = false,
  disabledBg = "bg-disabled-bg",
  disabledText = "text-inactive-primary-text",
  enabledBg = "bg-brand-primary-soft",
  enabledText = "text-black",
  enabledDescriptionText = "text-black",
}) => {
  const navigate = useNavigate();
  return (
    <div
      // se evalua si la accion esta deshabilitada o no, en base a eso se renderiza graficamente una tarjeta habilitada o deshabilitada
      className={`min-w-[250px] flex-1 rounded-lg p-5 text-center shadow-sm sm:p-3 md:p-4 ${
        isDisabled ? disabledBg : enabledBg
      } ${isDisabled ? disabledText : enabledText}`}
    >
      {/* Título */}
      <div className="mb-4 text-xl font-bold sm:text-base md:text-lg">
        {title}
      </div>

      {/* Descripción */}
      <div
        // se evalua si la accion esta deshabilitada o no, en base a eso se renderiza graficamente una descripción habilitada o deshabilitada
        className={`mb-5 h-[50px] text-sm opacity-90 sm:h-[20px] ${
          isDisabled ? disabledText : enabledDescriptionText
        } font-clamp`}
      >
        {description}
      </div>

      {/* Botones */}
      <div className="flex justify-center gap-2">
        {buttons.map((button, index) => (
          // se evaluan todas las props que vengan de cada objeto del arreglo, como su variante y clases, asi como saber si el botón estará habilitado o deshabilitado
          <BrutalButton
            key={index}
            variant={button.variant || "primary"}
            className={isDisabled ? "" : button.className}
            disabled={
              button.isDisabled != undefined ? button.isDisabled : isDisabled
            }
            onClick={() => navigate(button.onClick, { state: button.state })}
            title={button.title || ""}
          >
            {button.label}
          </BrutalButton>
        ))}
      </div>
    </div>
  );
};
