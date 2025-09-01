import { useNavigate, useParams } from "react-router-dom";
import { CiCirclePlus, CiEdit } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { PiStudent } from "react-icons/pi";
import { BsBook } from "react-icons/bs";
import { WiTime4 } from "react-icons/wi";
import { BiArchiveIn } from "react-icons/bi";
import { MdOutlineFactCheck } from "react-icons/md";
import { useCenters, useDashboardCenter, useDeleteCenter } from "../hooks";
import { CenterDashboardSectionSkeleton, CenterDashboardSkeleton } from "../components/skeleton";
import { CardStates, ClassCard, InfoNameCenter } from "../components/ui";
import { MoreActions } from "../../../../shared/components";
import BrutalSearchBar from "../../../../shared/components/ui/BrutalSearchBar";
import BrutalButton from "../../../../shared/components/ui/BrutalButton";
import { NotFound } from "../../../../shared/components/ui";
import { generateId } from "../../../../shared/utils/generate-id";
import { formatDate } from "../../../../shared/utils";
import BrutalPagination from "../../../../shared/components/ui/BrutalPagination";
import { EditCenterModal } from "../components/modals";
import ConfirmDeleteModal from "../../../../shared/components/modals/ConfirmDeleteModal";

export const CenterCoursesPage = () => {
  const { centerId } = useParams();
  const navigate = useNavigate();
  const {
    center,
    summary,
    activeClasses,
    classType,
    initialLoading,
    coursesLoading,
    error,
    searchTerm,
    pagination,
    refreshData,
    handleSearch,
    handlePageChange,
    handlePageSizeChange,
    handleFilterChange,
    toggleArchiveCenter,
  } = useDashboardCenter(centerId);

  const { isEditOpen, setIsEditOpen, handleCenterEdited } = useCenters({
    refreshData,
  });

  const {
    isPending,
    isConfirmationModalOpen,
    openDeleteModal,
    onConfirmDeleteWithRedirect,
    setIsConfirmationModalOpen,
  } = useDeleteCenter();

  // Mostrar skeleton completo durante la carga inicial
  if (initialLoading) return <CenterDashboardSkeleton />;

  // Mostrar posibles errores
  if (error)
    return navigate("/not-found", {
      state: { message: "Ha ocurrido un error" },
    });

  // Función para cambiar el titulo según el filtro
  const getFilterTitle = () => {
    switch (classType) {
      case "ACTIVE":
        return "Cursos Activos";
      case "INACTIVE":
        return "Cursos Inactivos";
      case "ALL":
      default:
        return "Todos los Cursos";
    }
  };

  return (
    <div className="flex-grow">
      {/* Header */}
      <div className="mb-4 flex justify-between sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <InfoNameCenter
          name={center.name}
          abv={center.abbreviation}
          img={center.logo}
        />

        <div className="self-end sm:self-auto">
          <MoreActions
            actions={[
              {
                icon: <CiEdit />,
                label: "Editar información",
                className: "text-gray-700",
                onClick: () => setIsEditOpen(true),
              },
              {
                icon: <BiArchiveIn size={20} />,
                label: "Archivar Centro",
                onClick: toggleArchiveCenter,
              },
              {
                icon: <FaRegTrashAlt />,
                label: "Eliminar elemento",
                className: "text-red-600",
                onClick: () => openDeleteModal(center),
              },
            ]}
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mb-4 grid gap-2 sm:mb-6 sm:gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CardStates
          label="Total Estudiantes"
          count={summary.totalStudents}
          icon={PiStudent}
        />
        <CardStates
          label="Total Cursos"
          count={summary.totalCourses}
          icon={BsBook}
        />
        <CardStates
          label="Actividades Pendientes"
          count={summary.pendingActivities}
          icon={WiTime4}
        />
        <CardStates
          label="Asistencia Promedio"
          count={summary.averageAttendance.toFixed(2)}
          icon={MdOutlineFactCheck}
        />
      </div>

      {/* Clases Activas */}
      <div className="container mx-auto px-0 sm:p-4">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-bold">
            {getFilterTitle()} ({activeClasses.totalItems})
          </h2>

          {/* Contenedor para búsqueda, filtro y botón */}
          <div className="flex flex-wrap items-center gap-2 sm:justify-end sm:gap-3">
            {/* Barra de búsqueda */}
            <div className="w-full sm:w-64">
              <BrutalSearchBar
                placeholder="Buscar cursos..."
                onSearch={handleSearch}
                initialValue={searchTerm}
                buttonText="Buscar"
              />
            </div>

            {/* Filtro de tipo de curso */}
            <select
              className="h-[42px] rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none"
              value={classType}
              onChange={(e) => handleFilterChange(e.target.value)}
              aria-label="Filtrar por tipo de curso"
              disabled={coursesLoading}
            >
              <option value="ALL">Todos</option>
              <option value="ACTIVE">Activos</option>
              <option value="INACTIVE">Inactivos</option>
            </select>

            {/* Botón de nuevo curso */}
            <BrutalButton
              variant="icon"
              icon={<CiCirclePlus size={20} />}
              className="h-10"
              disabled={coursesLoading}
              onClick={() => navigate("/courses/new")}
            >
              <span className="inline">Nuevo Curso</span>
            </BrutalButton>
          </div>
        </div>

        {/* Mostrar skeleton de cursos durante la carga de cursos */}
        {coursesLoading ? (
          <CenterDashboardSectionSkeleton />
        ) : (
          <>
            {/* Tarjetas de Cursos */}
            {summary.totalCourses === 0 ? (
              <div className="h-96">
                <NotFound message="No se encontraron cursos" />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                {activeClasses.items.map((course) => (
                  <ClassCard
                    key={generateId()}
                    course={course}
                    nextActivityDate={formatDate(
                      course.activityStatus.nextActivityDate,
                    )}
                  />
                ))}
              </div>
            )}

            {/* Paginación */}
            {activeClasses.totalItems > 0 ? (
              <div className="mt-6">
                <BrutalPagination
                  currentPage={pagination.currentPage}
                  pageSize={pagination.pageSize}
                  totalItems={pagination.totalItems}
                  totalPages={pagination.totalPages}
                  hasPreviousPage={pagination.hasPreviousPage}
                  hasNextPage={pagination.hasNextPage}
                  onPageChange={handlePageChange}
                  onPageSizeChange={handlePageSizeChange}
                  itemLabel="cursos"
                  className="py-4"
                />
              </div>
            ) : (
              summary.totalCourses != 0 && (
                <div className="h-96">
                  <NotFound message="No se encontraron cursos" />
                </div>
              )
            )}
          </>
        )}
      </div>

      <EditCenterModal
        center={center}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onCenterEdited={handleCenterEdited}
      />

      <ConfirmDeleteModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        itemType="center"
        itemName={center?.name}
        description="Al eliminar este centro, se eliminarán también sus cursos y actividades asociadas."
        onConfirm={onConfirmDeleteWithRedirect}
        isPending={isPending}
      />
    </div>
  );
};
