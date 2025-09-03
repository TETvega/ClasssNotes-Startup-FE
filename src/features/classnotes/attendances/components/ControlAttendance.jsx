import { FaSearch } from "react-icons/fa";
import { TbCalendarClock } from "react-icons/tb";
import { FaUsers } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa";
import { FaUserTimes } from "react-icons/fa";
import { useBreadcrumbStore } from "../../../../shared/store/useBreadcrumbStore";

export const ControlAttendance = () => {
  const { currentCourse } = useBreadcrumbStore();
  return (
    <div>
      <div className="mb-6 rounded-2xl bg-white p-6 shadow-2xl">
        <h2 className="mb-1 text-2xl font-bold">Progreso de Asistencia</h2>
        <p className="text-disabled-text font-semibold">
          {currentCourse.code && <>{currentCourse.code} - </>}
          {currentCourse.name}
        </p>
        <div className="mt-4 flex items-center space-x-4">
          <div className="bg-disabled-bg text-text-active-primary w-1/2 rounded p-2 text-center font-bold">
            -- Presentes
          </div>
          <div className="bg-disabled-bg text-text-active-primary w-1/2 rounded p-2 text-center font-bold">
            -- Ausentes
          </div>
        </div>
        <div className="bg-disabled-bg relative mt-4 h-8 w-full rounded"></div>
      </div>
      <div className="flex w-full flex-col rounded-2xl bg-white p-6 shadow-2xl">
        {/* Label */}
        <h2 className="mb-4 text-2xl font-bold">Registro de Asistencias</h2>
        <div className="mb-4 flex w-full flex-col justify-between md:flex-row md:items-center">
          {/* Buscador alineado a la izquierda */}
          <div className="relative flex w-full md:w-1/3">
            <FaSearch className="text-inactive-primary-text absolute top-1/2 left-3 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar alumno..."
              className="w-full rounded-lg border py-2 pr-3 pl-10 shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>
          {/* Botones de filtro alineados a la derecha - Responsivos */}
          <div className="mt-4 flex w-full space-x-2 md:mt-2 md:w-auto md:justify-end">
            <button className="bg-disabled-bg text-inactive-primary-text flex w-full cursor-not-allowed items-center justify-center rounded px-3 py-2">
              <FaUsers className="text-xl md:hidden" />
              <span className="hidden md:inline">Todos</span>
              <span className="ml-2 inline sm:inline md:hidden">
                <span className="sr-only">Todos</span>
              </span>
            </button>
            <button className="bg-disabled-bg text-inactive-primary-text flex w-full cursor-not-allowed items-center justify-center rounded px-3 py-2">
              <FaUserCheck className="text-xl md:hidden" />
              <span className="hidden md:inline">Presentes</span>
              <span className="ml-2 inline sm:inline md:hidden">
                <span className="sr-only">Presentes</span>
              </span>
            </button>
            <button className="bg-disabled-bg text-inactive-primary-text flex w-full cursor-not-allowed items-center justify-center rounded px-3 py-2">
              <FaUserTimes className="text-xl md:hidden" />
              <span className="hidden md:inline">Ausentes</span>
              <span className="ml-2 inline sm:inline md:hidden">
                <span className="sr-only">Ausentes</span>
              </span>
            </button>
          </div>
        </div>
        {/* Mensaje de asistencia no iniciada */}
        <div className="mt-10 flex flex-1 flex-col items-center justify-center text-black">
          <TbCalendarClock className="mb-4 text-6xl sm:text-7xl md:text-9xl" />
          <p className="text-center text-xl font-bold sm:text-2xl">
            La asistencia aún no inicia...
          </p>
        </div>
      </div>
    </div>
  );
};
