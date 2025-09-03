import BackBrutalButton from "../../../../../shared/components/ui/BackBrutalButton";

export const HeaderStudents = ({ studentAttendanceStats }) => {
  const studentName = studentAttendanceStats?.studentFirstName.concat(
    " ",
    studentAttendanceStats?.studentLastName,
  );

  return (
    <div className="flex w-full flex-col items-start justify-between p-4 md:flex-row md:items-center">
      {/* Sección izquierda */}
      <div className="mb-4 flex w-full items-start gap-4 md:mb-0 md:w-auto">
        <div className="h-12 w-12 flex-shrink-0 md:h-16 md:w-16">
          {/* Botón de regreso con ícono */}
          <BackBrutalButton />
        </div>

        <div className="flex flex-col">
          {/* Nombre del estudiante y descripción */}
          <h1 className="text-xl font-bold text-gray-800 md:text-2xl">
            Detalles de {studentName}
          </h1>
          <p className="text-history-text-g mt-1 text-sm font-bold md:mt-2 md:text-base">
            Historial individual del estudiante seleccionado
          </p>
        </div>
      </div>
      {/* Sección derecha */}
      <div className="flex w-full flex-col items-start md:w-auto md:items-end">
        {/* Días totales de asistencia */}
        <h2 className="text-history-text-bg mb-2 text-lg font-semibold md:mb-4 md:text-xl">
          Asistencia tomada:{" "}
          <span className="text-black">
            {studentAttendanceStats?.totalAttendance}
          </span>{" "}
          dias
        </h2>
      </div>
    </div>
  );
};
