import { IoMdAddCircleOutline } from "react-icons/io";
import { useParams } from "react-router-dom";
import { useActivitiesCourse, useDeleteActivity } from "../hooks";
import { Breadcrumb } from "../../../../shared/components/ui";
import BrutalButton from "../../../../shared/components/ui/BrutalButton";
import { ActivitiesList, SearchAndFilters } from "../components";
import { ActivitiesListSkeleton } from "../components/skeleton";
import { TagActivityIcon } from "../../tags/components/ui";
import BrutalPagination from "../../../../shared/components/ui/BrutalPagination";
import ConfirmDeleteModal from "../../../../shared/components/modals/ConfirmDeleteModal";

export const ActivitiesCoursePage = () => {
  const { courseId } = useParams();
  const {
    activities,
    tags,
    units,
    searchTerm,
    selectedUnit,
    selectedTag,
    isLoading,
    pageSizeOptions,
    handleSearch,
    handlePageChange,
    handlePageSizeChange,
    handleUnitChange,
    handleTagChange,
    navigate,
    refetchActivities,
  } = useActivitiesCourse(courseId);
  const {
    isPending,
    isConfirmModalOpen,
    selectedActivity,
    setIsConfirmModalOpen,
    handleDeleteClick,
    handleDelete,
  } = useDeleteActivity();

  // Mapear las actividades al formato esperado por ActivitiesList
  const mappedActivities = activities?.items
  ? activities.items.map((activity) => ({
    id: activity.activityId,
    name: activity.activityName,
    description: activity.activityDescription,
    qualificationDate: activity.qualificationDate,
    maxScore: activity.maxScore,
    isExtra: activity.isExtra,
    unit: `Unidad ${activity.unitNumber}`,
    unitId: activity.unitId,
    unitNumber: activity.unitNumber,
    tagActivityId: activity.tagActivityId,
  }))
  : [];

  return (
    <div className="w-full">
      {/* Navegación */}
      <Breadcrumb />

      {/* Contenido Principal */}
      <main className="flex-1 mt-6">
        <div className="container mx-auto">
          <div className="rounded-lg border shadow-xl bg-gray-50 p-3 sm:p-5">
            {/* Header de actividades */}
            <div className="mb-4 flex flex-col items-start justify-between sm:flex-row sm:items-center">
              <h3 className="text-text-active-primary mb-2 text-lg font-semibold sm:mb-0 sm:text-xl">
                Actividades Académicas
              </h3>
              <BrutalButton
                variant="icon"
                className="bg-action-primary flex items-center gap-1 text-xs sm:gap-2 sm:text-base"
                onClick={() => navigate(`/activities/${courseId}/new`)}
              >
                <IoMdAddCircleOutline className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Nueva Actividad</span>
              </BrutalButton>
            </div>

            {/* Barra de búsqueda y filtros */}
            <SearchAndFilters
              placeholderText="Buscar actividades..."
              searchTerm={searchTerm}
              onSearch={handleSearch}
              selectedUnit={selectedUnit}
              onUnitChange={handleUnitChange}
              selectedTag={selectedTag}
              onTagChange={handleTagChange}
              filterType="unit"
              unitOptions={units}
              tagOptions={tags}
              showExtraFilter={true}
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
                      activities={mappedActivities}
                      TagActivityIcon={TagActivityIcon}
                      showCenterName={false}
                      showCourseName={false}
                      showUnit={true}
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
          refetchActivities();
          setIsConfirmModalOpen(false);
        }}
        isPending={isPending}
      />
    </div>
  );
};
