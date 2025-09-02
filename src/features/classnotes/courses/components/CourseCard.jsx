import { useNavigate } from "react-router-dom";
import { GoPeople } from "react-icons/go";
import { useBreadcrumbStore } from "../../../../shared/store/useBreadcrumbStore";
import BrutalButton from "../../../../shared/components/ui/BrutalButton";

export const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { setCurrentCenter, setCurrentCourse } = useBreadcrumbStore();
  const formatCourseObject = (course) => {
    return {
      id: course.id,
      name: course.name,
      code: course.code,
    };
  };
  const formatCenterObject = (course) => {
    return {
      id: course.centerId,
      name: course.centerName,
      abb: course.abbCenter,
    };
  };
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="p-4">
        {/* Condicionar el tamaño de la altura segun el largo del nombre */}
        <h3 className="line-clamp mb-1 truncate text-lg font-bold" title={name}>
          {course.name}
        </h3>
        <div className="mb-3 flex justify-between text-sm text-gray-500">
          <span>{course.code}</span>
          <span>{course.abbCenter}</span>
        </div>

        <div className="mb-3 flex items-center gap-2">
          <GoPeople size={20} />
          <span>{course.activeStudents} Estudiantes</span>
        </div>

        <div className="mb-2">
          <div className="mb-1 flex justify-between text-sm">
            <span>Progreso de actividades</span>
            <span>
              {course.activities.totalEvaluated}/{course.activities.total}
            </span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-gray-200">
            <div
              className="h-2.5 rounded-full bg-gray-800"
              style={{
                width: `${(course.activities.totalEvaluated / course.activities.total) * 100}%`,
              }}
              //
            ></div>
          </div>
        </div>

        <BrutalButton
          variant="primary"
          disabled={!course.isActive}
          onClick={() => {
            setCurrentCenter(formatCenterObject(course));
            setCurrentCourse(formatCourseObject(course));
            navigate(`/courses/${course.id}`);
          }}
        >
          Ver curso
        </BrutalButton>
      </div>
    </div>
  );
};
