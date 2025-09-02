import { useNavigate } from "react-router-dom";
import BackBrutalButton from "../../../../shared/components/ui/BackBrutalButton";

export const InfoActivitiesCourse = ({ abv = "", name = "", title = "" }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-start gap-2 py-3 sm:flex-row sm:items-center">
      {/* Grupo: Botón y Título */}
      <div className="mr-3 flex gap-4 sm:flex-row">
        <BackBrutalButton onClick={() => navigate("/dashboard")} />
      </div>

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
