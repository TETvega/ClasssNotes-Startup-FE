export const AttendanceSummary = ({ stats }) => {
  const attendanceRate = stats?.attendanceRating * 100;
  const absenceRate = 100 - attendanceRate;
  const totalDays = stats?.attendanceTakenDays;

  return (
    <div className="mt-2 mb-6 w-full rounded-lg bg-white p-6 shadow-lg">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-col gap-4 sm:flex-row">
          <h2 className="text-xl font-semibold">Historial de Asistencia</h2>
        </div>
        {totalDays === 0 ? (
          <div />
        ) : (
          <p className="text-lg font-semibold text-gray-600">
            Asistencia tomada <span className="text-black">{totalDays}</span>{" "}
            días
          </p>
        )}
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="border-disabled-text rounded border p-2">
          <p className="text-text-active-primary mb-1 text-lg font-bold">
            Tasa de Asistencia
          </p>
          <p className="text-disabled-text mb-2 text-sm">
            Tasa de asistencia general
          </p>
          {totalDays === 0 ? (
            <p className="text-disabled-text text-3xl font-bold">--</p>
          ) : (
            <p className="text-success-text text-3xl font-bold">
              {attendanceRate}%
            </p>
          )}
          <div className="bg-disabled-bg mt-2 mb-2 h-2 rounded">
            {totalDays === 0 ? (
              <div />
            ) : (
              <div
                className="bg-success-text h-full rounded"
                style={{ width: `${attendanceRate}%` }}
              />
            )}
          </div>
        </div>
        <div className="border-disabled-text rounded border p-2">
          <p className="text-text-active-primary mb-1 text-lg font-bold">
            Tasa de Ausencia
          </p>
          <p className="text-disabled-text mb-2 text-sm">
            Ausentes injustificados
          </p>
          {totalDays === 0 ? (
            <p className="text-disabled-text text-3xl font-bold">--</p>
          ) : (
            <p className="text-error-text text-3xl font-bold">{absenceRate}%</p>
          )}
          <div className="bg-disabled-bg mt-2 mb-2 h-2 rounded">
            {totalDays === 0 ? (
              <div />
            ) : (
              <div
                className="bg-error-text h-full rounded"
                style={{ width: `${absenceRate}%` }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
