import { NotFound } from "../../../../shared/components/ui";
import { useStudentAttendances } from "../hooks/useStudentAttendances";

export const CalendarAttendance = ({
  studentAttendancesDate,
  isCurrentMonth,
  setIsCurrentMonth,
}) => {
  const { getAttendanceColors } = useStudentAttendances();

  return (
    <div className="flex flex-col items-center justify-center bg-white p-8">
      {/* Botones de filtro */}
      <div className="bg-disabled-bg mb-5 flex min-w-full rounded-xl p-1 md:w-72">
        <button
          onClick={() => {
            setIsCurrentMonth(false);
          }}
          className={`flex-1 rounded-l-xl py-2 text-sm font-semibold transition-colors md:text-base ${
            !isCurrentMonth
              ? "bg-white text-black shadow-sm"
              : "cursor-pointer text-gray-500 hover:bg-gray-50"
          }`}
        >
          Todo el tiempo
        </button>
        <button
          onClick={() => {
            setIsCurrentMonth(true);
          }}
          className={`flex-1 rounded-r-xl py-2 text-sm font-semibold transition-colors md:text-base ${
            isCurrentMonth
              ? "bg-white text-black shadow-sm"
              : "cursor-pointer text-gray-500 hover:bg-gray-50"
          }`}
        >
          Este mes
        </button>
      </div>

      {/* Mostrar mensaje cuando no hay datos filtrados */}
      {isCurrentMonth && studentAttendancesDate?.items?.length === 0 && (
        <div className="w-full">
          <NotFound message="No hay asistencias este mes" />
        </div>
      )}

      {/* Calendario de asistencias */}
      {studentAttendancesDate?.items?.length > 0 ? (
        <div className="grid w-full max-w-screen-lg grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7">
          {studentAttendancesDate.items.map((date, index) => {
            const { cardClass, numberClass } = getAttendanceColors(date.status);
            return (
              <div
                key={index}
                className={`flex w-full max-w-[9rem] flex-col items-center rounded-lg border-2 p-4 text-black ${cardClass}`}
              >
                <span className="text-lg text-black">
                  {date.registerDate.month}
                </span>
                <div
                  className={`flex w-20 justify-center rounded-2xl p-2 ${numberClass}`}
                >
                  <span className="text-lx font-bold">
                    {date.registerDate.numberDay}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        !isCurrentMonth && (
          <div className="w-full">
            <NotFound message="No hay asistencias para mostrar" />
          </div>
        )
      )}
    </div>
  );
};
