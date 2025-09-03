import { useBreadcrumbStore } from "../../../../../shared/store/useBreadcrumbStore";

export const ProgressAttendance = ({ allStudents }) => {
  const { currentCourse } = useBreadcrumbStore();
  
  const totalStudents = allStudents.length || 0;
  const present = allStudents.filter(
    (student) => student.status === "PRESENT",
  ).length;

  const percentagePresent = totalStudents > 0 ? (present / totalStudents) * 100 : 0;

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return "bg-green-500";
    if (percentage >= 50) return "bg-yellow-400";
    if (percentage > 0) return "bg-red-500";
    return "bg-gray-400";
  };

  return (
    <div className="mb-6 w-full max-w-full rounded-2xl bg-white p-4 shadow-2xl sm:p-6">
      {/* Título */}
      <h2 className="mb-1 text-center text-xl font-bold sm:text-2xl md:text-left">
        Progreso de Asistencia
      </h2>
      <p className="text-disabled-text text-center text-sm font-semibold sm:text-base md:text-left">
        {currentCourse.code && <>{currentCourse.code} - </>}
        {currentCourse.name}
      </p>

      {/* Estadísticas de asistencia */}
      <div className="mt-4 flex flex-wrap justify-center gap-4 md:justify-start">
        <div className="flex min-w-[120px] flex-1 items-center justify-center space-x-2 rounded bg-gray-100 p-2 text-center font-bold sm:min-w-[150px]">
          <p className="text-xl text-green-600 sm:text-2xl">
            {Math.round(percentagePresent)}%
          </p>
          <p className="text-sm text-gray-700 sm:text-base">Presentes</p>
        </div>

        <div className="flex min-w-[120px] flex-1 items-center justify-center space-x-2 rounded bg-gray-100 p-2 text-center font-bold sm:min-w-[150px]">
          <p className="text-xl text-red-500 sm:text-2xl">
            {Math.round(100 - percentagePresent)}%
          </p>
          <p className="text-sm text-gray-700 sm:text-base">Ausentes</p>
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="relative mt-4 h-4 w-full overflow-hidden rounded bg-gray-200">
        <div
          className={`h-full rounded transition-all duration-500 ease-in-out ${getProgressColor(percentagePresent)}`}
          style={{ width: `${percentagePresent}%` }}
        ></div>
      </div>
    </div>
  );
};
