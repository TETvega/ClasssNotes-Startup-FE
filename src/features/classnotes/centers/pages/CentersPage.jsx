import { FaCirclePlus } from "react-icons/fa6";
import { FiChevronDown } from "react-icons/fi";
import { useCenters } from "../hooks";
import { CenterCardSkeleton, CenterPageSkeleton } from "../components/skeleton";
import BackBrutalButton from "../../../../shared/components/ui/BackBrutalButton";
import BrutalSearchBar from "../../../../shared/components/ui/BrutalSearchBar";
import { MoreActions } from "../../../../shared/components";
import BrutalButton from "../../../../shared/components/ui/BrutalButton";
import { CenterCard } from "../components/ui";
import BrutalPagination from "../../../../shared/components/ui/BrutalPagination";
import { CreateCenterModal } from "../components/modals";

export const CentersPage = () => {
  const {
    centers,
    isLoading,
    isModalOpen,
    searchTerm,
    filter,
    page,
    pageSize,
    setPage,
    setIsModalOpen,
    setSearchTerm,
    handleFilterChange,
    toggleArchive,
    toggleRecover,
    onCenterCreated,
    handlePageSizeChange,
    refetch,
  } = useCenters();

  return (
    <main className="flex-grow">
      {
        <div className="flex-col space-y-4 pb-20">
          {isLoading ? (
            <CenterPageSkeleton />
          ) : (
            <>
              {/* Header */}
              <div className="mb-6 flex flex-wrap items-center gap-4 sm:flex-row sm:items-start">
                {/* Grupo: Botón y Título */}
                <div className="flex gap-4 sm:flex-row">
                  <BackBrutalButton to={"/dashboard"} />
                  <div>
                    <h1 className="text-2xl font-bold">
                      Mis Centros Educativos
                    </h1>
                    <p className="text-md text-green-600">
                      Gestiona tus centros educativos
                    </p>
                  </div>
                </div>

                {/* Cantidad de Centros */}
                <div className="w-full sm:w-auto">
                  <span className="bg-success-text rounded-lg px-3 py-1 font-semibold text-white">
                    {centers.totalItems} centros
                  </span>
                </div>
              </div>

              {/* Buscar y filtrar */}
              <div className="flex w-full flex-wrap items-center gap-4">
                {/* Buscador */}
                <div className="flex flex-1">
                  <BrutalSearchBar
                    placeholder="Buscar centros..."
                    initialValue={searchTerm}
                    onSearch={(value) => {
                      setSearchTerm(value);
                    }}
                  />
                </div>

                {/* Filtro */}
                <MoreActions
                  trigger={
                    <button className="flex cursor-pointer items-center justify-between gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm transition hover:bg-gray-50">
                      <span className="text-gray-700">
                        {filter.charAt(0).toUpperCase() + filter.slice(1)}
                      </span>
                      <FiChevronDown className="text-gray-500" />
                    </button>
                  }
                  actions={[
                    {
                      label: "Todos",
                      onClick: () => handleFilterChange("todos"),
                      className: "text-gray-700",
                    },
                    {
                      label: "Activos",
                      onClick: () => handleFilterChange("activos"),
                      className: "text-gray-700",
                    },
                    {
                      label: "Archivados",
                      onClick: () => handleFilterChange("archivados"),
                      className: "text-gray-700",
                    },
                  ]}
                />

                {/* Botón Crear */}
                <BrutalButton
                  variant="icon"
                  icon={<FaCirclePlus size={20} />}
                  className="sm:w-auto"
                  onClick={() => setIsModalOpen(true)}
                >
                  Crear Centro
                </BrutalButton>
              </div>
            </>
          )}

          {/* Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            {isLoading
              ? Array(pageSize)
                  .fill(0)
                  .map((_, index) => <CenterCardSkeleton key={index} />)
              : centers.items.map((center) => (
                  <CenterCard
                    key={center.id}
                    center={center}
                    toggleArchive={toggleArchive}
                    toggleRecover={toggleRecover}
                    refetch={refetch}
                  />
                ))}
          </div>

          <BrutalPagination
            currentPage={page}
            pageSize={pageSize}
            totalItems={centers.totalItems}
            totalPages={centers.totalPages}
            hasPreviousPage={centers.hasPreviousPage}
            hasNextPage={centers.hasNextPage}
            onPageChange={setPage}
            onPageSizeChange={handlePageSizeChange}
            itemLabel={"centros"}
          />
        </div>
      }

      <CreateCenterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCenterCreated={onCenterCreated}
      />
    </main>
  );
};
