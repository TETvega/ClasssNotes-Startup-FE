import { MdContentPasteSearch } from "react-icons/md";

/**
 * Componente reutilizable cuando no hay información o estados de error.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {string} [props.message="No hay data"] - Mensaje a mostrar.
 * @param {React.ElementType} [props.icon] - Componente de icono a mostrar.
 *
 * @returns {JSX.Element} Página de error.
 */

export const NotFound = ({
  message = "No se encontraron registros",
  icon = <MdContentPasteSearch size={40} />,
}) => {
  return (
    <section className="flex min-h-full items-center rounded-lg border border-gray-300 bg-white">
      <div className="container mx-auto flex items-center p-6">
        <div className="mx-auto flex max-w-md flex-col items-center text-center">
          {/* Icono */}
          <div className="text-siidni-brown bg-disabled-bg mt-5 rounded-full p-4 text-sm font-extrabold">
            {icon}
          </div>

          {/* Mensaje de error */}
          <h1 className="mt-2 mb-5 text-lg font-semibold md:text-xl">
            {message}
          </h1>
        </div>
      </div>
    </section>
  );
};
