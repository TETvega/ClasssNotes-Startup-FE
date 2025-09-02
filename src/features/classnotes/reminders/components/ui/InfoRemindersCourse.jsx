import BackBrutalButton from "../../../../../shared/components/ui/BackBrutalButton";

export const InfoRemindersCourse = ({ abv = "", name = "", title = "" }) => {
  return (
    <div className="flex flex-col items-start gap-2 p-3 sm:flex-row sm:items-center">
      {/* Botón de retroceso */}
      <BackBrutalButton className="mr-5" />

      {/* Abreviación del centro */}
      {abv && (
        <div className="bg-secondary-bg text-text-tertiary mr-5 rounded-lg px-4 py-2 text-3xl font-bold">
          {abv}
        </div>
      )}

      {/* Nombre del curso */}
      {name && (
        <div className="text-text-active-primary mr-6 text-3xl font-bold">
          {name}
        </div>
      )}

      {/* Título del curso */}
      {title && (
        <div className="text-text-active-primary mr-6 text-3xl font-bold">
          {title}
        </div>
      )}
    </div>
  );
};
