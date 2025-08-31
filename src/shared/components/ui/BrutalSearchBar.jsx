import { useState } from "react";
import { Search, X } from "lucide-react";
import BrutalButton from "./BrutalButton";

/**
 * Componente principal de barra de búsqueda con estilo brutalista
 *
 * Props:
 * @param {string} [placeholder] - Texto de placeholder para el input
 * @param {function} [onSearch] - Callback que se ejecuta al realizar búsqueda
 * @param {string} [initialValue] - Valor inicial del campo de búsqueda
 * @param {string} [buttonText] - Texto del botón de búsqueda
 * @param {string} [className] - Clases CSS adicionales para el contenedor
 * @param {boolean} [showButtonText] - Mostrar texto del botón de búsqueda
 * @param {boolean} [compact] - Modo compacto para espacios reducidos
 *
 * @returns {JSX.Element} Barra de búsqueda reutilizable con estilo brutalista
 */

const BrutalSearchBar = ({
  placeholder = "Buscar...",
  onSearch,
  initialValue = "",
  buttonText = "Buscar",
  showButtonText = true,
  className = "",
  compact = false,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialValue);

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery.trim());
    }
  };

  const handleClear = () => {
    setSearchQuery("");
    onSearch("");
  };

  return (
    <div className={`w-full max-w-full ${className}`}>
      <div className="relative">
        <input
          type="text"
          className={`w-full rounded-lg border border-gray-300 bg-white px-2 py-2.5 text-sm text-gray-900 focus:border-transparent focus:ring-2 focus:ring-green-500 focus:outline-none ${compact ? "pr-16" : "pr-20"}`}
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />

        {searchQuery && (
          <button
            onClick={handleClear}
            className={`absolute top-1/2 flex -translate-y-1/2 transform items-center justify-center ${compact ? "right-10 size-6" : "right-12 size-8 md:right-16"}`}
            aria-label="Limpiar búsqueda"
          >
            <X
              className={`${compact ? "size-3" : "size-4"} hover:text-black/70`}
            />
          </button>
        )}

        <div className="absolute end-2 top-1/2 -translate-y-1/2">
          <BrutalButton
            variant="icon"
            onClick={handleSearch}
            icon={<Search size={compact ? 16 : 18} />}
            className={compact ? "h-7" : "h-8"}
            shadow={false}
          >
            {showButtonText && !compact && (
              <span className="hidden md:inline">{buttonText}</span>
            )}
          </BrutalButton>
        </div>
      </div>
    </div>
  );
};

export default BrutalSearchBar;
