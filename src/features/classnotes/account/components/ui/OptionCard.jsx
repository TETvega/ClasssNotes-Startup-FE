import { AiTwotoneEdit } from "react-icons/ai";
import { FaGreaterThan } from "react-icons/fa";
import { Link } from "react-router-dom";

export const OptionCard = ({
  title,
  value,
  icon,
  borderColor,
  textColor,
  link,
  showArrow,
  onClick,
}) => {
  const content = (
    <>
      <div className="flex items-center gap-2">
        {icon && <span>{icon}</span>}
        <div>
          <p className="text-sm font-bold sm:text-sm lg:text-lg">{title}</p>
        </div>
      </div>
      <div className="p-1 text-xs sm:text-sm lg:text-lg">
        <FaGreaterThan size={18} />
      </div>
    </>
  );

  return (
    <div>
      {showArrow ? (
        // Si showArrow es verdadero, se muestra un enlace con una flecha
        onClick ? (
          // Si hay onClick, usamos un div/button con handler
          <div
            onClick={onClick}
            className={`my-2 flex w-full cursor-pointer items-center justify-between border bg-stone-200 p-4 ${borderColor || ""} ${textColor || ""} transition-transform hover:scale-102`}
          >
            {content}
          </div>
        ) : (
          // Si no hay onClick, usamos Link
          <Link
            to={link}
            className={`my-2 flex w-full items-center justify-between border bg-stone-200 p-4 ${borderColor || ""} ${textColor || ""} transition-transform hover:scale-102`}
          >
            {content}
          </Link>
        )
      ) : (
        // Si showArrow es falso, se muestra un div con un icono de edición
        <div
          className={`my-2 flex w-full items-center justify-between border bg-stone-200 p-4`}
        >
          <div className="flex items-center gap-2">
            <div>
              <p className="text-sm font-bold sm:text-sm lg:text-lg">{title}</p>
              {value && (
                <p className="text-xs text-gray-600 sm:text-sm">{value}</p>
              )}
            </div>
          </div>
          <Link to={link} className="p-1 text-xs sm:text-sm lg:text-lg">
            <AiTwotoneEdit
              size={28}
              className="border-1 bg-white text-gray-700 transition-transform hover:scale-120"
            />
          </Link>
        </div>
      )}
    </div>
  );
};
