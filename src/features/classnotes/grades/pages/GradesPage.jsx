import { useParams } from "react-router-dom";
import { AlertCircle, BarChart3, CheckCircle, Mail, Star } from "lucide-react";
import { useGrades } from "../hooks";
import { Breadcrumb } from "../../../../shared/components/ui";
import BrutalButton from "../../../../shared/components/ui/BrutalButton";
import { ActionsLot } from "../components";
import BrutalPagination from "../../../../shared/components/ui/BrutalPagination";
import { GenerateReportModal, SendEmailModal } from "../components/modals";
import {
  CardStatisticsSkeleton,
  GradeDistributionCardSkeleton,
  StudentTableSkeleton,
} from "../components/skeleton";
import {
  CardStatistics,
  GradeDistributionCard,
  StudentTable,
} from "../components/ui";

export const GradesPage = () => {
  const { courseId } = useParams();
  const {
    endDate,
    students,
    allStudents,
    statistics,
    gradeDistribution,
    currentPage,
    pageSize,
    totalItems,
    totalPages,
    hasPreviousPage,
    hasNextPage,
    selectedStudents,
    isModalOpen,
    studentIdFromMailIcon,
    studentNameFromMailIcon,
    isModalOpenFromActionsLot,
    isReportModalOpen,
    isLoading,
    handlePageChange,
    handlePageSizeChange,
    handleSelectStudent,
    handleOpenModalFromMailIcon,
    handleOpenModalFromActionsLot,
    handleOpenReportModal,
    setIsModalOpen,
    setIsReportModalOpen,
    setStudentIdFromMailIcon,
    setStudentNameFromMailIcon,
    setIsModalOpenFromActionsLot,
    setSearchTerm,
  } = useGrades(courseId);

  // Para mostrar el tipo de puntaje según lo que venga del backend
  const getScoreTypeDisplay = (scoreType) => {
    switch (scoreType) {
      case "GOLD_SCORE":
        return "Puntos oro";
      case "WEIGHTED_SCORE":
        return "Ponderado";
      case "ARITHMETIC_SCORE":
        return "Aritmético";
      default:
        return "...";
    }
  };

  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <div className="relative mb-6 flex flex-col items-start gap-2 sm:gap-3 md:flex-row md:items-center md:justify-between">
        <Breadcrumb />
      </div>

      {/* Header */}
      <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex flex-col items-center text-center sm:items-start sm:text-left xl:flex-row xl:items-center">
          <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">
            Calificaciones
          </h2>
          <p className="mt-1 text-sm text-gray-700 sm:mt-0 sm:ml-2 sm:text-lg xl:mt-0 xl:ml-2">
            Sistema de evaluación:{" "}
            <span className="font-semibold text-gray-600">
              {getScoreTypeDisplay(statistics.scoreTypeCourse)}
            </span>
          </p>
        </div>
        <BrutalButton
          variant="icon"
          onClick={() => setIsModalOpen(true)}
          className="mt-4 flex w-full items-center justify-center gap-1 text-xs sm:mt-0 sm:w-auto sm:justify-start sm:gap-2 sm:text-base"
        >
          <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="hidden sm:inline">Enviar Calificaciones</span>
          <span className="sm:hidden">Enviar Calificaciones</span>
        </BrutalButton>
      </div>

      {/* Contenedor principal */}
      <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-1 xl:grid-cols-2">
        <div>
          <div className="mb-4 flex flex-wrap justify-between gap-4">
            {isLoading && currentPage === 1 ? (
              <>
                <CardStatisticsSkeleton />
                <CardStatisticsSkeleton />
              </>
            ) : (
              <>
                <CardStatistics
                  label="Promedio general"
                  value={statistics.overallAvarage.toFixed(1)}
                  iconColor="green-600"
                  iconName={<BarChart3 className="h-6 w-6" />}
                />
                <CardStatistics
                  label="Aprobación"
                  value={`${statistics.approvalRating.toFixed(1)}%`}
                  iconColor="blue-500"
                  iconName={<CheckCircle className="h-6 w-6" />}
                />
              </>
            )}
          </div>
          <div className="mb-4 flex flex-wrap justify-between gap-4">
            {isLoading && currentPage === 1 ? (
              <>
                <CardStatisticsSkeleton />
                <CardStatisticsSkeleton />
              </>
            ) : (
              <>
                <CardStatistics
                  label="Peor unidad"
                  value={
                    <>
                      <p className="text-lg font-bold">
                        Unidad {statistics?.bestUnit?.unitNumber || "N/A"}
                      </p>
                      <p className="text-xs text-gray-500">
                        Promedio:{" "}
                        {statistics?.bestUnit?.avarage.toFixed(1) || "0.0"}%
                      </p>
                    </>
                  }
                  iconColor="yellow-500"
                  iconName={<Star className="h-6 w-6" />}
                />
                <CardStatistics
                  label="Peor unidad"
                  value={
                    <>
                      <p className="text-lg font-bold">
                        Unidad {statistics?.worstUnit?.unitNumber || "N/A"}
                      </p>
                      <p className="text-xs text-gray-500">
                        Promedio:{" "}
                        {statistics?.worstUnit?.avarage.toFixed(1) || "0.0"}%
                      </p>
                    </>
                  }
                  iconColor="red-500"
                  iconName={<AlertCircle className="h-6 w-6" />}
                />
              </>
            )}
          </div>
          <ActionsLot
            onSendEmails={handleOpenModalFromActionsLot}
            onGenerateReport={handleOpenReportModal}
          />
        </div>
        <div>
          {isLoading && currentPage === 1 ? (
            <GradeDistributionCardSkeleton />
          ) : (
            <GradeDistributionCard
              title="Distribución de Calificaciones"
              data={gradeDistribution}
            />
          )}
        </div>
      </div>

      {/* Tabla de estudiantes */}
      {isLoading && currentPage === 1 ? (
        <StudentTableSkeleton />
      ) : (
        <StudentTable
          students={students}
          selectedStudents={selectedStudents}
          onSelectStudent={handleSelectStudent}
          onOpenModalFromMailIcon={handleOpenModalFromMailIcon}
          setSearchTerm={setSearchTerm}
        />
      )}

      {/* Paginación */}
      <div className="mt-2">
        <BrutalPagination
          currentPage={currentPage}
          pageSize={pageSize}
          totalItems={totalItems}
          totalPages={totalPages}
          hasPreviousPage={hasPreviousPage}
          hasNextPage={hasNextPage}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          pageSizeOptions={[6, 10, 20, 50]}
          itemLabel="estudiantes"
        />
      </div>

      {/* Modales */}
      <SendEmailModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setStudentIdFromMailIcon(null);
          setStudentNameFromMailIcon("");
          setIsModalOpenFromActionsLot(false);
        }}
        isFromSendButton={!studentIdFromMailIcon && !isModalOpenFromActionsLot}
        selectedCount={
          isModalOpenFromActionsLot
            ? selectedStudents.length
            : studentIdFromMailIcon
              ? 1
              : selectedStudents.length
        }
        studentIdFromMailIcon={studentIdFromMailIcon}
        studentNameFromMailIcon={studentNameFromMailIcon}
        isFromActionsLot={isModalOpenFromActionsLot}
        students={students}
        selectedStudents={selectedStudents}
        endDate={endDate}
        courseId={courseId}
      />
      <GenerateReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        students={allStudents}
        statistics={statistics}
        courseId={courseId}
      />
    </div>
  );
};

export default GradesPage;
