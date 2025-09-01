import { useNavigate } from "react-router-dom";
import { useBreadcrumbStore } from "../../../../../shared/store/useBreadcrumbStore";

export const CourseLabel = ({ course }) => {
  const navigate = useNavigate();
  const { setCurrentCenter, setCurrentCourse } = useBreadcrumbStore();

  // funcion para mapear ciertas propiedades de activeCourses a un nuevo objeto
  const formatCenterObject = (course) => {
    return {
      id: course.centerId,
      name: course.centerName,
      abb: course.centerAbb,
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
    <div className="col-span-8 text-left">
      <span
        onClick={() => {
          if (course.courseId && course.centerId) {
            navigate(`/courses/${course.courseId}`);
            setCurrentCenter(formatCenterObject(course));
            setCurrentCourse(formatCourseObject(course));
          } else {
            console.error("Datos del curso incompletos");
          }
        }}
        className="cursor-pointer text-gray-800 hover:underline"
      >
        {course?.courseName ?? "Name Not Found"}
      </span>
    </div>
  );
};
