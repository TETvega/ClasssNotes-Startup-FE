import { Link, useNavigate } from "react-router-dom";
import { FaUsers, FaPlusCircle } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import { generateId } from "../../../../shared/utils";
import { useBreadcrumbStore } from "../../../../shared/store/useBreadcrumbStore";
import { DashboardCoursesSkeleton } from "./skeleton";
import FormBrutalButton from "../../../../shared/components/ui/FormBrutalButton";

export const DashboardCourses = ({ activeCourses, isLoading }) => {
  const navigate = useNavigate();
  const tooltipId = generateId();
  const { setCurrentCenter, setCurrentCourse } = useBreadcrumbStore();

  if (isLoading) return <DashboardCoursesSkeleton />;

  // Funcion para mapear ciertas propiedades de activeCourses a un nuevo objeto
  const formatCenterObject = (activeCourse) => {
    return {
      id: activeCourse.centerId,
      name: activeCourse.centerName,
      abb: activeCourse.centerAbb,
    };
  };

  const formatCourseObject = (course) => {
    return {
      id: course.courseId,
      name: course.courseName,
      code: course.courseCode,
    };
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
      {activeCourses.length > 0 ? (
        <>
          {activeCourses.map((course) => {
            // Limitando a 4 clases
            const progreso = course.totalActivities
              ? (course.totalActivitiesDone / course.totalActivities) * 100
              : 0;

            return (
              <div
                key={course.courseId}
                className="flex h-full flex-col rounded-lg border bg-white p-4 shadow-xl md:min-h-[230px]"
              >
                <h3 className="truncate text-base font-semibold md:text-lg">
                  {course.courseName || "Dato no encontrado"}
                </h3>
                <div className="mt-2 flex justify-between border-b border-gray-800 pt-2 text-xs font-medium text-gray-700 md:text-sm">
                  <span>{course.courseCode || "Dato no encontrado"}</span>
                  <span
                    data-tooltip-id={tooltipId}
                    data-tooltip-content={
                      course.centerName || "Dato no encontrado"
                    }
                    data-tooltip-place="top"
                    className="cursor-pointer"
                  >
                    {course.centerAbb || "Dato no encontrado"}
                  </span>
                </div>

                <div className="mt-2 flex items-center gap-2 text-xs text-gray-700 md:text-sm">
                  <FaUsers size={14} className="md:h-5 md:w-5" />
                  <span>
                    {course.activeStudentsCount >= 0
                      ? `${course.activeStudentsCount} ${
                          course.activeStudentsCount > 1
                            ? "estudiantes"
                            : "estudiante"
                        }`
                      : "Dato no encontrado"}
                  </span>
                </div>

                <p className="mt-2 text-xs text-gray-600 md:text-sm">
                  Progreso: {course.totalActivitiesDone}/
                  {course.totalActivities}
                </p>
                <div className="mt-1 h-3 w-full overflow-hidden rounded-full bg-gray-200 md:h-4">
                  <div
                    className="h-full bg-gray-800"
                    style={{ width: `${progreso}%` }}
                  ></div>
                </div>

                <div className="mt-4 flex justify-center">
                  <div className="w-32">
                    <FormBrutalButton
                      onClick={() => {
                        if (course.courseId && course.centerId) {
                          navigate(`/courses/${course.courseId}`);
                          setCurrentCenter(formatCenterObject(course));
                          setCurrentCourse(formatCourseObject(course));
                        } else {
                          console.error("Datos del curso incompletos");
                        }
                      }}
                    >
                      Ver Curso
                    </FormBrutalButton>
                  </div>
                </div>
              </div>
            );
          })}

          {activeCourses.length < 4 && (
            <Link
              to={"#"}
              className="flex h-full flex-col items-center justify-center rounded-lg border bg-white p-4 text-gray-500 shadow-xl md:min-h-[230px]"
            >
              <FaPlusCircle size={50} className="mb-2 text-green-700" />
              <p className="text-center text-sm font-medium md:text-base">
                Agregar nueva clase
              </p>
            </Link>
          )}
        </>
      ) : (
        <div className="col-span-1 flex sm:col-span-2 md:col-span-1 lg:col-span-1">
          <div className="flex h-full w-full flex-col items-center justify-center rounded-lg border bg-white p-4 text-gray-500 shadow-xl md:min-h-[230px]">
            <FaPlusCircle size={50} className="mb-2 text-gray-400" />
            <p className="text-center text-sm font-medium md:text-base">
              Primero debes crear un centro educativo
            </p>
          </div>
        </div>
      )}
      <Tooltip id={tooltipId} />
    </div>
  );
};
