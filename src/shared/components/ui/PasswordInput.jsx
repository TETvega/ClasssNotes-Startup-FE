import { useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";

/**
 * Componente PasswordInput
 *
 * Este componente renderiza un campo de entrada de contraseña con la funcionalidad de mostrar u ocultar la contraseña.
 * Utiliza Formik para manejar el estado del formulario y la validación.
 *
 * @param {object} props - Las propiedades del componente.
 * @param {object} props.formik - El objeto Formik que maneja el estado del formulario.
 * @param {string} props.name - El nombre del campo de entrada de contraseña.
 *
 * @returns {JSX.Element} Un campo de entrada de contraseña con un botón para mostrar/ocultar la contraseña y un mensaje de error si existe.
 */

const PasswordInput = ({ formik, name }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <div className="relative w-full">
        {/* Campo de entrada de contraseña */}
        <input
          className="mt-1 mb-1 w-full rounded-xs border bg-gray-200 px-3 py-2 text-sm"
          type={isVisible ? "text" : "password"} 
          name={name}
          id={name}
          placeholder="••••••••"
          value={formik.values[name]} 
          onChange={formik.handleChange} 
          onBlur={formik.handleBlur} 
          autoComplete="new-password" 
        />
        {/* Botón para mostrar/ocultar la contraseña */}
        <button
          type="button"
          onClick={() => setIsVisible((prev) => !prev)} 
          aria-label={isVisible ? "Ocultar contraseña" : "Mostrar contraseña"}
          className="absolute top-1/2 right-3 flex -translate-y-1/2 cursor-pointer items-center"
        >
          {isVisible ? (
            <LuEyeClosed size={23} color="#000" />
          ) : (
            <LuEye size={23} color="#000" />
          )}
        </button>
      </div>
      {/* Mensaje de error si existe */}
      <div className="min-h-[20px] text-xs text-red-500">
        {formik.touched[name] && formik.errors[name] && (
          <span>{formik.errors[name]}</span>
        )}
      </div>
    </div>
  );
};

export default PasswordInput;
