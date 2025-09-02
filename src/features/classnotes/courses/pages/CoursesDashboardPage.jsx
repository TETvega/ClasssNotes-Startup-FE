import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuNotebookText } from "react-icons/lu";
import { useParams } from "react-router-dom";
import { useDashboardCourse, useDeleteCourse } from "../hooks";
import { useBreadcrumbStore } from "../../../../shared/store/useBreadcrumbStore";
import { useAttendanceStatusStore } from "../../attendances/store";
import { CourseDashboardSkeleton } from "../components/skeleton";
import { Breadcrumb } from "../../../../shared/components/ui";
import BrutalButton from "../../../../shared/components/ui/BrutalButton";
import { MoreActions } from "../../../../shared/components";
import { ActionCard, ActivityPreviewCard, CountingCard, SectionList, StudentCard } from "../components";
import { StudentModal } from "../../students/components/modals";
import ConfirmDeleteModal from "../../../../shared/components/modals/ConfirmDeleteModal";

export const CoursesDashboardPage = () => {
  const { courseId } = useParams();
  const { navigate, dashboardData, isLoading } = useDashboardCourse(courseId);
  const {
    isPending,
    isConfirmationModalOpen,
    openDeleteModal,
    onConfirmDeleteWithRedirect,
    setIsConfirmationModalOpen,
  } = useDeleteCourse();
  const { currentCourse } = useBreadcrumbStore();
  const CourseName = currentCourse.name;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const {
    isCourseAttendanceTaken,
    getAttendanceStatus,
    isAttendanceInProgress,
  } = useAttendanceStatusStore();
  const [isAttendanceTaken, setIsAttendanceTaken] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  useEffect(() => {
    getAttendanceStatus();
    const taken = isCourseAttendanceTaken(courseId);
    const inProgress = isAttendanceInProgress(courseId);
    setInProgress(inProgress);
    setIsAttendanceTaken(taken);
  }, [courseId, isCourseAttendanceTaken]);

  // Mostrar skeleton de carga
  if (isLoading) return <CourseDashboardSkeleton />;

  const handleOpenStudentModal = (student) => {
    setSelectedStudent(student);
    setIsStudentModalOpen(true);
  };

  const handleCloseStudentModal = () => {
    setIsStudentModalOpen(false);
    setSelectedStudent(null);
  };

  return (
    <div className="w-full">
      {/* Encabezado */}
      <div className="relative mb-6 flex flex-col items-start gap-2 sm:gap-3 md:flex-row md:items-center md:justify-between">
        {/* Componente del Breadcrumb */}
        <Breadcrumb />

        {/* Botones de acciones */}
        <div className="flex items-center gap-4">
          {/* Botón de Recordatorios */}
          <BrutalButton
            variant="icon"
            className="bg-disabled-bg relative hover:bg-gray-300"
            onClick={() => navigate(`/courses/${courseId}/reminders`)}
          >
            <LuNotebookText className="text-text-active-primary mr-2 h-5 w-5" />
            <span className="text-text-active-primary font-extrabold">
              Recordatorios
            </span>
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {dashboardData.pendingNotesRemenbers}
            </span>
          </BrutalButton>

          {/* Menú de Más Acciones */}
          <MoreActions
            actions={[
              {
                icon: <CiEdit />,
                label: "Editar curso",
                className: "text-gray-700",

                onClick: () => navigate(`/courses/${courseId}/edit`),
              },
              {
                icon: <FaRegTrashAlt />,
                label: "Eliminar elemento",
                className: "text-red-600",
                onClick: () => openDeleteModal(currentCourse),
              },
            ]}
          />
        </div>
      </div>

      {/* Información contable */}
      <div className="mb-5 flex flex-wrap justify-between gap-4">
        <CountingCard
          label="Total Alumnos:"
          value={dashboardData.studentsCount}
        />
        <CountingCard
          label="Puntuación Evaluada:"
          value={`${dashboardData.scoreEvaluated} / ${dashboardData.maxScoreEvaluated}`}
        />
        <CountingCard
          label="Actividades Pendientes:"
          value={dashboardData.pendingActivitiesCount}
          pendingActivities={dashboardData.pendingActivitiesCount}
        />
      </div>

      {/* Acciones del curso */}
      <div className="mb-5 flex flex-wrap justify-between gap-4">
        <ActionCard
          title="Control de Asistencia"
          description="Registra la asistencia de los estudiantes"
          isDisabled={dashboardData.students.length === 0}
          buttons={[
            {
              label: inProgress
                ? "Asistencia en Curso"
                : isAttendanceTaken
                  ? "Asistencia ya tomada"
                  : "Iniciar Asistencia",

              className: "bg-action-primary",

              onClick:
                inProgress || !isAttendanceTaken
                  ? `/attendance/${courseId}/now`
                  : undefined,

              isDisabled:
                isAttendanceTaken || dashboardData.students.length === 0,

              title: inProgress
                ? "La asistencia está actualmente en curso"
                : isAttendanceTaken
                  ? "La asistencia ya fue tomada por el día de hoy."
                  : "Iniciar asistencia",
            },
            {
              label: "Ver historial",
              className: "bg-action-primary",
              onClick: `/attendance/${courseId}/history`,
              isDisabled: dashboardData.students.length === 0,
              title:
                dashboardData.students.length === 0
                  ? "No hay estudiantes registrados para mostrar historial"
                  : "Ver el historial de asistencia",
            },
          ]}
        />

        <ActionCard
          title="Calificaciones"
          description="Gestiona las calificaciones de tus estudiantes"
          isDisabled={dashboardData.activities.length === 0}
          buttons={[
            {
              label: "Ver calificaciones",
              variant: "icon",
              className: "bg-action-primary p-2",
              onClick: `/courses/${courseId}/grades`,
            },
          ]}
        />

        <ActionCard
          title="Nueva actividad"
          description="Gestiona las actividades de tus estudiantes"
          buttons={[
            {
              label: "Crear actividad",
              variant: "icon",
              className: "bg-action-primary",
              onClick: `/activities/${courseId}/new`,
            },
          ]}
        />
      </div>

      {/* Actividades y Estudiantes */}
      <div className="flex flex-wrap gap-5">
        {/* Seccion de actividades */}
        <SectionList
          title="Calificar actividades"
          data={dashboardData.activities}
          renderItem={(activity) => (
            <ActivityPreviewCard
              key={activity.id}
              activityId={activity.id}
              name={activity.name}
              qualificationDate={activity.qualificationDate}
            />
          )}
          emptyMessage="No hay actividades para mostrar"
          addButtonLabel="Añadir"
          viewAllButtonLabel="Ver todas"
          maxItemsBeforeViewAll={1}
          onClick={`/activities/${courseId}`}
        />

        {/* Seccion de estudiantes */}
        <SectionList
          title="Estudiantes matriculados"
          data={dashboardData.students}
          renderItem={(student) => (
            <StudentCard
              key={student.id}
              name={student.fullName}
              handleOpenStudentModal={() => handleOpenStudentModal(student)}
            />
          )}
          emptyMessage="No hay estudiantes para mostrar"
          addButtonLabel="Añadir"
          viewAllButtonLabel="Ver todos"
          maxItemsBeforeViewAll={1}
          onClick={`/courses/${courseId}/students`}
          isStudents={true}
          setIsModalOpen={setIsModalOpen}
          setIsImportModalOpen={setIsImportModalOpen}
        />
      </div>

      {/* Modal para añadir estudiantes manualmente 
      <AddStudents isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Modal papra añadir estudiantes por excel 
      <ImportFromExcel
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
      />
      */}

      {/* Modal para ver información del estudiante */}
      <StudentModal
        isOpen={isStudentModalOpen}
        onClose={handleCloseStudentModal}
        studentId={selectedStudent?.id}
        studentName={selectedStudent?.fullName}
        studentEmail={selectedStudent?.email}
      />

      <ConfirmDeleteModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        itemType="course"
        itemName={CourseName}
        description="Al eliminar este curso, se eliminarán también sus cursos y actividades asociadas."
        onConfirm={onConfirmDeleteWithRedirect}
        isPending={isPending}
      />
    </div>
  );
};
