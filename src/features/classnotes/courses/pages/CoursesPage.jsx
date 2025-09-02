import { NotFound } from "../../../../shared/components/ui";
import BackBrutalButton from "../../../../shared/components/ui/BackBrutalButton";
import BrutalPagination from "../../../../shared/components/ui/BrutalPagination";
import { CenterSidebar, CourseCard, ListFiltersAndSearch } from "../components";
import { CoursePageSkeleton } from "../components/skeleton";
import { useCourses } from "../hooks";

export const CoursesPage = () => {
  const {
    centers,
    courses,
    showSidebar,
    activeCoursesFilter,
    selectedCenters,
    isLoading,
    currentPage,
    pageSize,
    pageSizeOptions,
    toggleSidebar,
    toggleFilter,
    toggleSelectedCenter,
    handleSearch,
    setPageSize,
    setPage,
  } = useCourses();

  return (
    <div className="w-full">
      {/* Fondo oscuro sobre la vista principal cuando el sidebar está abierto */}
      {showSidebar && (
        <div
          className="fixed inset-0 z-10 bg-black/50"
          onClick={toggleSidebar}
        ></div>
      )}

      {isLoading ? (
        <CoursePageSkeleton />
      ) : (
        <div className="w-full">
          {/* Contenido principal */}
          <div>
            {/* Encabezado con botón de retroceso */}
            <div className="mb-4 flex items-center sm:mb-6">
              <BackBrutalButton className="mr-2" />
              <h1 className="ml-2 text-xl font-semibold sm:text-2xl">
                Todos los cursos
              </h1>
            </div>

            {/* Barra de búsqueda y filtros */}
            <div className="mb-4 sm:mb-6">
              <ListFiltersAndSearch
                activeCoursesFilter={activeCoursesFilter}
                toggleFilter={toggleFilter}
                handleSearch={handleSearch}
                toggleSidebar={toggleSidebar}
              />
            </div>

            {/* Grid de cursos - ajustado a 4 columnas en pantallas XL */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
              {courses?.items.length > 0 ? (
                courses?.items.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))
              ) : (
                <div className="col-span-1 h-96 sm:col-span-2 lg:col-span-3 xl:col-span-4">
                  <NotFound message="No se encontraron cursos" />
                </div>
              )}
            </div>

            {/* Paginación */}
            <div className="mt-6 flex w-full flex-wrap justify-center gap-2 px-2">
              <BrutalPagination
                currentPage={currentPage}
                pageSize={pageSize}
                totalItems={courses.totalItems}
                totalPages={courses.totalPages}
                hasPreviousPage={courses.hasPreviousPage}
                hasNextPage={courses.hasNextPage}
                onPageChange={setPage}
                onPageSizeChange={setPageSize}
                pageSizeOptions={[...pageSizeOptions, courses.totalItems]}
                itemLabel={"cursos"}
              />
            </div>
          </div>
        </div>
      )}

      {/* Sidebar / Panel lateral */}
      <CenterSidebar
        showSidebar={showSidebar}
        centers={centers || 0}
        selectedCenters={selectedCenters}
        toggleSelectedCenter={toggleSelectedCenter}
      />
    </div>
  );
};
