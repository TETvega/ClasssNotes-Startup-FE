import { GoPeople } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useBreadcrumbStore } from "../../../../../shared/store/useBreadcrumbStore";
import { getStateClassColor, getStateClassColorBard } from "../../utils";
import { ProgressBard } from "./ProgressBard";
import BrutalButton from "../../../../../shared/components/ui/BrutalButton";

export const ClassCard = ({ course = {}, nextActivityDate = "00/00/0000" }) => {
  const navigate = useNavigate();
  const { setCurrentCourse } = useBreadcrumbStore();

  const formatCourseObject = (course) => {
    return {
      id: course.idCourse,
      name: course.courseName,
      code: course.courseCode,
    };
  };

  return (
    <div className="relative overflow-hidden rounded-lg bg-white shadow-[0px_6px_23px_-10px_rgba(0,_0,_0,_0.8)]">
      {/* Cambia de Color según el estado  */}
      <div
        className={`absolute top-0 left-0 h-full w-1 ${getStateClassColorBard(course.isActive)}`}
      ></div>
      <div className="px-6 pt-4 pb-1">
        <section className="flex flex-row justify-between">
          {/* Header Nombre y Código de Clase */}
          <div className="mb-4">
            <h3 className="text-lg font-bold">{course.courseName}</h3>
            <p className="text-sm text-gray-500">{course.courseCode}</p>
          </div>

          <div className="mb-4">
            <span
              className={`rounded-full px-2 py-1 text-xs ${getStateClassColor(course.isActive)}`}
            >
              {course.isActive ? "Activo" : "Inactivo"}
            </span>
          </div>
        </section>

        {/* Cantidad de Estudiantes y Promedio */}
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <GoPeople className="h-4 w-4" />
            <span className="text-sm">{`${course.studentCount} estudiantes`}</span>
          </div>
          <div className="text-sm">{`Promedio: ${course.averageAttendance}%`}</div>
        </div>

        {/* Body de la card */}
        <div className="mb-4">
          {/* Muestra el progreso de actividades */}
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm text-gray-600">Progreso de Actividades</p>
            <span className="text-xs text-gray-500">{`${course.activityStatus.completedCount}/${course.activityStatus.completedCount}`}</span>
          </div>
          <ProgressBard
            percentage={
              (course.activityStatus.completedCount /
                course.activityStatus.total) *
              100
            }
          />
          {/* Muestra la Proxima Actividad */}
          {course.activityStatus.nextActivity != "Ninguna" ? (
            <div className="mb-4 rounded-md bg-gray-100 p-3">
              <p className="text-sm font-medium">Próxima Actividad:</p>
              {/* Nombre de la Actividad Y la Fecha */}
              <div className="flex justify-between">
                <p className="text-sm">{course.activityStatus.nextActivity}</p>
                <p className="text-sm text-gray-500">{nextActivityDate}</p>
              </div>
            </div>
          ) : (
            <div className="mb-4 rounded-md bg-gray-100 p-3 py-5.5">
              <p className="text-center text-sm font-medium">Sin actividades</p>
            </div>
          )}

          {/* Botón para ver el Curso */}
          <BrutalButton
            variant="secondary"
            onClick={() => {
              navigate(`/courses/${course.idCourse}`);
              setCurrentCourse(formatCourseObject(course));
            }}
            disabled={!course.isActive}
          >
            Ver Curso
          </BrutalButton>
        </div>
      </div>
    </div>
  );
};
