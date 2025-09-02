import { GoPlusCircle } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import BrutalSearchBar from "../../../../shared/components/ui/BrutalSearchBar";
import BrutalButton from "../../../../shared/components/ui/BrutalButton";

export const ListFiltersAndSearch = ({
  handleSearch,
  toggleSidebar,
  activeCoursesFilter,
  toggleFilter,
}) => {
  const navigate = useNavigate();
  return (
    <div className="mb-6 flex flex-col gap-4">
      <div className="flex flex-col gap-4 md:flex-row md:flex-wrap lg:flex-nowrap lg:items-stretch">
        {/* Controles de búsqueda y filtros */}
        <div className="flex flex-col items-stretch gap-4 md:flex-grow md:flex-row lg:w-full xl:w-3/4">
          <div className="h-full w-full">
            <BrutalSearchBar
              onSearch={handleSearch}
              placeholder="Buscar cursos..."
              initialValue=""
              buttonText="Buscar"
              className="h-full"
            />
          </div>

          <div className="flex h-full flex-col gap-4 sm:gap-4 md:flex-row md:items-center">
            <button
              className="min-h-full rounded-md border border-gray-300 bg-white px-4 py-2 whitespace-nowrap hover:cursor-pointer hover:bg-gray-50 active:border-green-600 sm:w-full md:w-auto"
              onClick={toggleSidebar}
            >
              Centros Educativos
            </button>
            <select
              className="h-full flex-grow appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 pr-10 hover:cursor-pointer hover:bg-gray-50 focus:ring-2 focus:ring-green-500 focus:outline-none sm:w-full md:w-auto"
              value={activeCoursesFilter}
              onChange={(e) => toggleFilter(e.target.value)}
              id="status-filter"
            >
              <option value="ALL">Todos</option>
              <option value="ACTIVE">Activos</option>
              <option value="INACTIVE">Inactivos</option>
            </select>
          </div>
        </div>

        {/* Botón Nuevo Curso */}
        <div>
          <BrutalButton
            variant="icon"
            className="h-full min-w-full whitespace-nowrap md:w-auto"
            onClick={() => navigate("/courses/new")}
          >
            <GoPlusCircle size={20} />
            Nuevo curso
          </BrutalButton>
        </div>
      </div>
    </div>
  );
};
