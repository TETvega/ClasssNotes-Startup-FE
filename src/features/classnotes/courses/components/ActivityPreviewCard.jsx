import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../../shared/utils";

export const ActivityPreviewCard = ({
  activityId,
  name = "",
  qualificationDate,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between gap-4 border-t border-b border-gray-200 p-4">
      <div className="min-w-0 flex-1 truncate overflow-hidden text-ellipsis whitespace-nowrap">
        {name}
      </div>
      <div className="truncate overflow-hidden text-ellipsis">
        {/* La fecha se debe recibir como string debido a que esta función mapeará la respuesta de BE a un formato mejor entendible */}
        {formatDate(qualificationDate)}
      </div>
      <div className="flex-shrink-0">
        {/* aqui se debe redirigir a ver informacion mas detallada acerca de la actividad */}
        <button
          title="Calificar Actividad"
          className="w-full rounded-sm border-1 border-gray-200 p-1 text-sm hover:cursor-pointer hover:bg-gray-50"
          onClick={() => navigate(`/activities/${activityId}/grade`)}
        >
          <span className="hidden w-full rounded-sm p-1 text-sm hover:cursor-pointer lg:block">
            Calificar
          </span>
          <FaRegEdit size={16} color="#4a5565" className="block lg:hidden" />
        </button>
      </div>
    </div>
  );
};
