import { useNavigate, useParams } from "react-router-dom";
import { Plus, Upload, UserPlus } from "lucide-react";
import BrutalButton from "../../../../shared/components/ui/BrutalButton";
import { MoreActions } from "../../../../shared/components";

export const SectionList = ({
  title,
  data = [],
  renderItem,
  emptyMessage = "No hay elementos para mostrar",
  addButtonLabel = "Añadir",
  viewAllButtonLabel = "Ver todos",
  maxItemsBeforeViewAll = 5,
  onClick = "/",
  isStudents = false,
  setIsModalOpen,
  setIsImportModalOpen,
}) => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  return (
    <div className="min-w-[300px] flex-1 rounded-lg bg-white p-5 shadow-[0px_1px_4px_1px_rgba(0,_0,_0,_0.8)]">
      <div className="flex items-center justify-between">
        {/* Título */}
        <div className="mb-3 text-xl font-bold text-gray-800">{title}</div>
        {/* Botones */}
        <div className="mb-5 flex items-center justify-between">
          {data.length < maxItemsBeforeViewAll ? (
            <div className="flex gap-4">
              {!isStudents ? (
                // Botón de crear actividades
                <BrutalButton
                  variant="icon"
                  className="bg-action-primary"
                  icon={<Plus size={18} />}
                  onClick={() => navigate(`/activities/${courseId}/new`)}
                >
                  {addButtonLabel}
                </BrutalButton>
              ) : (
                // Botón de crear estudiantes
                <div className="relative w-full">
                  <MoreActions
                    actions={[
                      {
                        icon: <UserPlus />,
                        label: "Añadir manualmente",
                        onClick: () => setIsModalOpen(true),
                      },
                      {
                        icon: <Upload />,
                        label: "Añadir desde Excel",
                        onClick: () => setIsImportModalOpen(true),
                      },
                    ]}
                    trigger={
                      <BrutalButton
                        type="icon"
                        icon={<Plus size={18} />}
                        className="w-full px-4"
                      >
                        {addButtonLabel}
                      </BrutalButton>
                    }
                  />
                </div>
              )}
            </div>
          ) : (
            // Botón de ver todos
            <BrutalButton
              variant="icon"
              className="bg-action-primary"
              onClick={() => {
                navigate(onClick);
              }}
            >
              {viewAllButtonLabel}
            </BrutalButton>
          )}
        </div>
      </div>

      {/* Lista de elementos */}
      <div className="custom-scrollbar custom-scrollbar2 flex max-h-[250px] min-h-[150px] flex-col overflow-y-auto">
        {data.length > 0 ? (
          data.map((item) => renderItem(item))
        ) : (
          <div className="flex h-full flex-1 items-center justify-center">
            <h4 className="text-gray-500">{emptyMessage}</h4>
          </div>
        )}
      </div>
    </div>
  );
};
