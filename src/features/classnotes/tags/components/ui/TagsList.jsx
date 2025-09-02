import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import { TbEdit } from "react-icons/tb";
import useClickOutside from "../../../../../shared/hooks/useClickOutside";
import { useDeleteTags } from "../../hooks";
import { MoreActions } from "../../../../../shared/components";
import { TagActivityIcon } from "./TagActivityIcon";
import { NotFound } from "../../../../../shared/components/ui";
import BrutalButton from "../../../../../shared/components/ui/BrutalButton";

export const TagsList = ({ tags, onSelectTag, onClose, goToStep }) => {
  const [mode, setMode] = useState("list");
  const { ref, isOpen, setIsOpen } = useClickOutside(false, "more-actions-id");
  const { selectedTags, setSelectedTags, handleDelete, handleTagSelection } = useDeleteTags(setMode);

  // Resetear las etiquetas seleccionadas al cambiar de modo
  useEffect(() => {
    setSelectedTags([]);
  }, [mode]);

  return (
    <div className="mx-auto w-full max-w-sm rounded-lg bg-gray-50 p-6 shadow-lg sm:max-w-md md:max-w-lg">
      {/* Encabezado */}
      <div className="mb-0 flex items-center justify-between">
        <h4 className="text-lg font-bold text-gray-800">
          {mode === "list" ? "Etiqueta de Actividad" : "Eliminar Etiquetas"}
        </h4>

        {/* Botón de menú (solo en modo lista) */}
        {mode === "list" && (
          <div
            className="relative h-1"
            id="more-actions-id"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div ref={ref}>
              <MoreActions
                actions={[
                  {
                    icon: <Trash2 />,
                    label: "Eliminar etiquetas",
                    className: "text-red-600",
                    onClick: () => {
                      setMode("delete");
                    },
                  },
                ]}
              />
            </div>
          </div>
        )}
      </div>

      {/* Descripción */}
      <p className="mb-4 text-sm text-gray-600">
        {mode === "list"
          ? "Seleccione la etiqueta para esta actividad"
          : "Seleccione las etiquetas que desea eliminar"}
      </p>

      {/* Lista de tags */}
      <div className="max-h-[60vh] overflow-y-auto pr-1">
        <div className="space-y-2">
          {Array.isArray(tags) && tags.length > 0 ? (
            tags.map((tag) => (
              <div
                key={tag.id}
                className={`flex ${mode === "list" ? "justify-between" : ""}`}
              >
                {mode === "list" ? (
                  // Modo Lista
                  <>
                    {/* Tag Container */}
                    <div
                      className="flex w-full cursor-pointer items-center justify-between rounded-l-lg bg-white p-3 shadow-sm transition-colors hover:bg-gray-100"
                      onClick={() => {
                        if (onSelectTag) onSelectTag(tag);
                        onClose();
                      }}
                    >
                      <div className="flex items-center">
                        {tag.icon && tag.colorHex ? (
                          TagActivityIcon(tag.icon, tag.colorHex)
                        ) : (
                          <span className="mr-3 flex h-8 w-8 items-center justify-center rounded-md bg-gray-100 text-gray-500">
                            {tag.icon || "?"}
                          </span>
                        )}
                        <span className="ml-3 text-gray-800">{tag.name}</span>
                      </div>
                    </div>
                    {/* Edit Button Container */}
                    <div
                      className="flex cursor-pointer items-center justify-between rounded-r-lg bg-white px-4 py-3 shadow-sm transition-colors hover:bg-gray-100"
                      onClick={() => goToStep(2, { tag: tag })}
                    >
                      <TbEdit size={25} />
                    </div>
                  </>
                ) : (
                  // Modo Eliminación
                  <div
                    className="flex w-full cursor-pointer items-center justify-between rounded-lg bg-white p-3 shadow-sm transition-colors hover:bg-gray-100"
                    onClick={() => handleTagSelection(tag.id)}
                  >
                    <div className="flex items-center">
                      {tag.icon && tag.colorHex ? (
                        TagActivityIcon(tag.icon, tag.colorHex)
                      ) : (
                        <span className="mr-3 flex h-8 w-8 items-center justify-center rounded-md bg-gray-100 text-gray-500">
                          {tag.icon || "?"}
                        </span>
                      )}
                      <span className="ml-3 text-gray-800">{tag.name}</span>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(tag.id)}
                        onChange={() => handleTagSelection(tag.id)}
                        onClick={(e) => e.stopPropagation()}
                        className="h-5 w-5 rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <NotFound message="No se encontraron etiquetas" />
          )}
        </div>
      </div>

      {/* Botones */}
      <div className="mt-4 flex flex-col justify-center gap-4 px-12 sm:flex-row">
        <div className="flex w-50">
          <BrutalButton
            variant="secondary"
            className="h-10 w-50"
            onClick={mode === "list" ? onClose : () => setMode("list")}
          >
            {mode === "list" ? "Cerrar" : "Cancelar"}
          </BrutalButton>
        </div>
        <div className="flex w-50">
          {mode === "list" ? (
            <BrutalButton
              variant="icon"
              className="h-10 w-50"
              icon={<Plus size={20} />}
              onClick={() => goToStep(1)}
            >
              Nueva Etiqueta
            </BrutalButton>
          ) : (
            <BrutalButton
              variant="icon"
              className={`h-10 w-full ${
                selectedTags.length > 0
                  ? "bg-red-500 hover:bg-red-600"
                  : "cursor-not-allowed bg-gray-400"
              }`}
              icon={<Trash2 size={20} />}
              onClick={handleDelete}
              disabled={selectedTags.length === 0}
            >
              Eliminar
            </BrutalButton>
          )}
        </div>
      </div>
    </div>
  );
};
