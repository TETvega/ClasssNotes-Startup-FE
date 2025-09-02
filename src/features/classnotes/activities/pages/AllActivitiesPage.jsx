import ConfirmDeleteModal from "../../../../shared/components/modals/ConfirmDeleteModal";
import BrutalPagination from "../../../../shared/components/ui/BrutalPagination";
import { TagActivityIcon } from "../../tags/components/ui";
import { ActivitiesList, InfoActivitiesCourse, SearchAndFilters } from "../components";
import { ActivitiesListSkeleton } from "../components/skeleton";
import { useAllActivities, useDeleteActivity } from "../hooks";

export const AllActivitiesPage = () => {
  const {
    activities,
    centers,
    tags,
    searchTerm,
    selectedCenter,
    selectedTag,
    isLoading,
    pageSizeOptions,
    handleSearch,
    handlePageChange,
    handlePageSizeChange,
    handleCenterChange,
    handleTagChange,
    refetchActivities,
  } = useAllActivities();

  const {
    isPending,
    isConfirmModalOpen,
    selectedActivity,
    setIsConfirmModalOpen,
    handleDeleteClick,
    handleDelete,
  } = useDeleteActivity();

  return (
    <div className="w-full">
      {/* Info del curso */}
      <div className="mb-6 flex flex-col items-start">
        <div className="flex w-full items-center justify-between">
          <InfoActivitiesCourse title="Todas las actividades" />
        </div>
      </div>

      {/* Contenido Principal */}
      <main className="flex-1 mt-6">
        <div className="container mx-auto">
          <div className="rounded-lg border shadow-xl bg-gray-50 p-3 sm:p-5">
            {/* Header de actividades */}
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-text-active-primary py-2 mb-2 text-lg font-semibold sm:mb-0 sm:text-xl">
                Actividades Académicas
              </h3>
            </div>

            {/* Barra de búsqueda y filtros */}
            <SearchAndFilters
              placeholderText="Buscar actividades..."
              searchTerm={searchTerm}
              onSearch={handleSearch}
              selectedUnit={selectedCenter}
              onUnitChange={handleCenterChange}
              selectedTag={selectedTag}
              onTagChange={handleTagChange}
              filterType="center"
              unitOptions={centers}
              tagOptions={tags}
            />

            {/* Lista de actividades */}
            {isLoading ? (
              // Skeleton de carga
              <ActivitiesListSkeleton />
            ) : (
              <>
                {activities && (
                  <>
                    <ActivitiesList
                      activities={activities.items || []}
                      TagActivityIcon={TagActivityIcon}
                      showCenterName={true}
                      showCourseName={true}
                      showUnit={false}
                      handleDeleteClick={handleDeleteClick}
                    />

                    {/* Paginación */}
                    {activities.items && activities.items.length > 0 && (
                      <div className="mt-4">
                        <BrutalPagination
                          currentPage={activities.currentPage}
                          pageSize={activities.pageSize}
                          totalItems={activities.totalItems}
                          totalPages={activities.totalPages}
                          hasPreviousPage={activities.hasPreviousPage}
                          hasNextPage={activities.hasNextPage}
                          onPageChange={handlePageChange}
                          onPageSizeChange={handlePageSizeChange}
                          pageSizeOptions={[...pageSizeOptions, activities.totalItems]}
                          itemLabel="actividades"
                        />
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      {/* Modal de confirmación de eliminación */}
      <ConfirmDeleteModal
        isOpen={isConfirmModalOpen}
        onClose={() => !isPending && setIsConfirmModalOpen(false)}
        itemType="actividad"
        itemName={selectedActivity?.name}
        description="Al eliminar esta actividad, todos los datos asociados se perderán permanentemente."
        onConfirm={async () => {
          await handleDelete(selectedActivity?.id, true);
          refetchActivities(); // Esto actualizará la lista de actividades
          setIsConfirmModalOpen(false);
        }}
        isPending={isPending}
      />
    </div>
  );
};
