import { NotFound } from "../../../../../shared/components/ui";
import { CourseLabel } from "./CourseLabel";
import { PendingActivities } from "./PendingActivities";

export const CourseActivities = ({ courses }) => {
  return (
    <div className="max-h-60 overflow-y-auto rounded-md bg-gray-100 p-2">
      {/* Encabezado sticky con fondo */}
      <div className="sticky top-0 z-10 grid grid-cols-12 items-center justify-center border-b border-gray-300 bg-gray-100 pb-1 font-medium">
        <div className="col-span-8 text-left text-2xl">Cursos</div>
        <div className="col-span-4 mr-2 text-center">
          Actividades Pendientes
        </div>
      </div>

      {courses.length === 0 ? (
        <NotFound message="No hay actividades pendientes" className="w-full" />
      ) : (
        // Cursos mapeados
        courses.map((course) => (
          <div
            key={course.courseId}
            className="grid grid-cols-12 border-b border-gray-200 px-2 py-1.5"
          >
            <CourseLabel course={course} />
            <PendingActivities pendingActivities={course?.pendingActivities} />
          </div>
        ))
      )}
    </div>
  );
};
