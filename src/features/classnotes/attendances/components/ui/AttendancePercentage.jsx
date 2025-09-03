export const AttendancePercentage = ({ studentAttendanceStats }) => {
  return (
    <div className="w-full px-4 md:px-8">
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Presnete */}
        <div className="w-full rounded-md border p-4 shadow-sm">
          <h3 className="mb-1 text-lg font-semibold text-gray-700 md:text-xl lg:text-2xl">
            Presente
          </h3>
          <p className={`text-success-text text-xl font-bold md:text-2xl`}>
            {studentAttendanceStats?.attendanceCount}
          </p>
          <div className="relative mt-1 h-3 w-full rounded-full bg-gray-300 md:h-4">
            <div
              className={`bg-success-text h-3 rounded-full md:h-4`}
              style={{ width: `${studentAttendanceStats?.attendanceRate}%` }}
            ></div>
          </div>
          <p
            className={`text-success-tex mt-1 text-sm font-semibold md:text-base`}
          >
            {studentAttendanceStats?.attendanceRate}%
          </p>
        </div>
        {/* Ausente */}
        <div className="w-full rounded-md border p-4 shadow-sm">
          <h3 className="mb-1 text-lg font-semibold text-gray-700 md:text-xl lg:text-2xl">
            Ausente
          </h3>
          <p className={`text-error-text text-xl font-bold md:text-2xl`}>
            {studentAttendanceStats?.absenceCount}
          </p>
          <div className="relative mt-1 h-3 w-full rounded-full bg-gray-300 md:h-4">
            <div
              className={`bg-error-text h-3 rounded-full md:h-4`}
              style={{ width: `${studentAttendanceStats?.absenceRate}%` }}
            ></div>
          </div>
          <p
            className={`text-error-text mt-1 text-sm font-semibold md:text-base`}
          >
            {studentAttendanceStats?.absenceRate}%
          </p>
        </div>
      </div>
    </div>
  );
};
