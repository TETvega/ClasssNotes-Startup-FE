import BrutalSearchBar from "../../../../shared/components/ui/BrutalSearchBar";

export const SearchAndFilters = ({
  placeholderText = "Buscar",
  searchTerm = "",
  onSearch,
  selectedUnit = "",
  onUnitChange,
  selectedTag = "",
  onTagChange,
  filterType = "unit", // Disponibles estan unit y center
  unitOptions = [],
  tagOptions = [],
}) => {
  // Determinar el texto del label del primer filtro según el tipo
  const unitFilterLabel =
    filterType === "unit" ? "Todas las unidades" : "Todos los centros";

  return (
    <div>
      {/* Barra de búsqueda */}
      <div className="mb-4">
        <BrutalSearchBar
          placeholder={placeholderText}
          onSearch={onSearch}
          initialValue={searchTerm}
          buttonText="Buscar"
        />
      </div>

      {/* Filtros */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        {/* Filtrar por unidades o centros */}
        <div className="relative w-full sm:w-auto">
          <select
            value={selectedUnit}
            onChange={(e) => onUnitChange(e.target.value)}
            className="bg-primary-bg w-full rounded-lg border border-gray-200 px-3 py-2 shadow-sm sm:w-48"
          >
            <option value="">{unitFilterLabel}</option>
            {unitOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        {/* Filtrar por etiquetas */}
        <div className="relative w-full sm:w-auto">
          <select
            value={selectedTag}
            onChange={(e) => onTagChange(e.target.value)}
            className="bg-primary-bg w-full rounded-lg border border-gray-200 px-3 py-2 shadow-sm sm:w-48"
          >
            <option value="">Todas las etiquetas</option>
            {tagOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name === "Undefined" ? "Sin etiqueta" : option.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
