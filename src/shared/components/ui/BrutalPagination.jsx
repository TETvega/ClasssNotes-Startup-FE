import usePagination from "@mui/material/usePagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BrutalButton from "./BrutalButton";
import { generateId } from "../../utils/generate-id";

/**
 * Componente reutilizable de paginación con estilos brutales.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {number} props.currentPage - Página actual.
 * @param {number} props.pageSize - Elementos por página.
 * @param {number} props.totalItems - Número total de elementos.
 * @param {number} props.totalPages - Número total de páginas.
 * @param {boolean} props.hasPreviousPage - Indica si hay página anterior.
 * @param {boolean} props.hasNextPage - Indica si hay página siguiente.
 * @param {function} props.onPageChange - Función que se ejecuta al cambiar de página.
 * @param {function} props.onPageSizeChange - Función que se ejecuta al cambiar elementos por página.
 * @param {function} props.itemLabel - Indica el texto que se muestra junto a la cantidad de items.
 * @param {array} [props.pageSizeOptions=[6, 9, 12, 24]] - Opciones de tamaño de página.
 * @param {string} [props.className=""] - Clases CSS adicionales.
 * @returns {JSX.Element} Componente de paginación con estilos brutales.
 */

const BrutalPagination = ({
  currentPage = 1,
  pageSize = 4,
  totalItems = 0,
  totalPages = 1,
  hasPreviousPage = false,
  hasNextPage = false,
  onPageChange,
  onPageSizeChange,
  itemLabel,
  className = "",
  pageSizeOptions = [6, 9, 12, 24], 
  showBackground = true,
}) => {

  // Sanitización: convertir a enteros, quitar duplicados, ordenar
  let sanitizedPageSizeOptions = Array.from(
    new Set(
      pageSizeOptions.filter(Number.isInteger), 
    ),
  ).sort((a, b) => a - b); 

  // Si después de limpiar quedó vacío, asignamos un valor por defecto
  sanitizedPageSizeOptions =
    sanitizedPageSizeOptions.length > 0 ? sanitizedPageSizeOptions : [1];

  const { items } = usePagination({
    count: totalPages, 
    page: currentPage, 
    onChange: (_, value) => onPageChange && onPageChange(value), 
    showFirstButton: true,
    showLastButton: true, 
  });

  // Calcula el rango de elementos mostrados en la página actual
  const startItem = totalItems > 0 ? (currentPage - 1) * pageSize + 1 : 0;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Clases Tailwind CSS para estilos de los botones
  const baseButtonStyles =
    "size-8 flex items-center justify-center rounded border";
  const activeButtonStyles = "bg-green-50 border-green-600 text-green-600";
  const inactiveButtonStyles = "border-gray-200 hover:bg-gray-50";

  return (
    <div
      className={`mx-auto w-full rounded-lg ${showBackground && "shadow-s bg-white p-2"} p-2 ${className}`}
    >
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        {/* Muestra información sobre los elementos visibles en la página actual */}
        <div className="text-sm text-gray-700">
          {totalItems > 0
            ? `Mostrando ${startItem}-${endItem} de ${totalItems} ${itemLabel}`
            : `No hay ${itemLabel} para mostrar`}
        </div>

        {/* Renderiza los botones de paginación generados por usePagination */}
        <div className="flex items-center gap-2">
          {items.map(({ page, type, selected, ...item }, index) => {
            let children = null;

            switch (type) {
              case "start-ellipsis":
              case "end-ellipsis":
                // Representa los puntos suspensivos cuando hay muchas páginas
                children = (
                  <span
                    key={generateId()}
                    className={`${baseButtonStyles} ${inactiveButtonStyles} pointer-events-none`}
                  >
                    ...
                  </span>
                );
                break;

              case "page":
                // Botón de número de página
                children = (
                  <button
                    key={generateId()}
                    {...item}
                    className={`${baseButtonStyles} ${selected ? activeButtonStyles : inactiveButtonStyles} cursor-pointer`}
                  >
                    {page}
                  </button>
                );
                break;

              case "previous":
                // Botón para ir a la página anterior
                children = (
                  <BrutalButton
                    key={generateId()}
                    variant="icon"
                    icon={<ChevronLeft className="size-4" />}
                    disabled={!hasPreviousPage}
                    {...item}
                    className="size-8"
                  />
                );
                break;

              case "next":
                // Botón para ir a la página siguiente
                children = (
                  <BrutalButton
                    key={generateId()}
                    variant="icon"
                    icon={<ChevronRight className="size-4" />}
                    disabled={!hasNextPage}
                    {...item}
                    className="size-8"
                  />
                );
                break;

              default:
                break;
            }
            // Renderiza el item
            return <div key={index}>{children}</div>;
          })}
        </div>

        {/* Selector de cantidad de elementos por página */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Items por página</span>
            <select
              id="select-page-size"
              value={pageSize || sanitizedPageSizeOptions[0]} // Valor por defecto
              onChange={(e) =>
                onPageSizeChange && onPageSizeChange(Number(e.target.value))
              }
              className="h-9 w-16 rounded border border-green-600 px-2 py-1"
            >
              {sanitizedPageSizeOptions.map((option) => (
                <option key={generateId()} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrutalPagination;
