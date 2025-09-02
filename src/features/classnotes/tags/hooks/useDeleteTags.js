import { useState } from "react";
import toast from "react-hot-toast";
import { useTagsListStore } from "../store/useTagsListStore";
import { deleteTags } from "../../../../shared/actions";

export const useDeleteTags = (setMode) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const { fetchTagsAndStore } = useTagsListStore();

  // Manejar la selección de etiquetas en modo eliminación
  const handleTagSelection = (tagId) => {
    setSelectedTags((prev) => {
      if (prev.includes(tagId)) {
        return prev.filter((id) => id !== tagId);
      } else {
        return [...prev, tagId];
      }
    });
  };

  // Eliminar las etiquetas seleccionadas
  const handleDelete = async () => {
    if (selectedTags.length <= 0) return;

    const toastId = toast.loading("Eliminando etiquetas...");
    setIsPending(true);

    try {
      const result = await deleteTags(selectedTags);

      if (!result.status) {
        toast.error(result.message);
        console.error("Error al eliminar las etiquetas: ", result.message);
        return;
      }

      toast.success(result.message);

      // Actualizar el store
      fetchTagsAndStore();

      // Limpiar selección y volver al modo lista
      setSelectedTags([]);
      setMode("list");

    } catch (error) {
      toast.error("Ha ocurrido un error. Por favor, inténtelo más tarde.");
      console.error(error);
    } finally {
      toast.dismiss(toastId);
      setIsPending(false);
    }
  };

  return {
    selectedTags,
    isPending,
    setSelectedTags,
    handleDelete,
    handleTagSelection,
  };
};
