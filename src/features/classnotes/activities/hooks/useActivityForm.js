import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTagsListStore } from "../../tags/store/useTagsListStore";
import { getCourseUnits } from "../../../../shared/actions";

export const useActivityForm = (formik) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { courseId } = useParams();

  // Obtener las etiquetas del store de Zustand
  const { tags, getTagById, getTags } = useTagsListStore();

  // Cargar las etiquetas si no están cargadas por si acaso
  useEffect(() => {
    getTags();
  }, [getTags]);

  // Query para obtener las unidades del curso
  const unitsQuery = useQuery({
    queryKey: ["activity-units", courseId],
    queryFn: async () => {
      try {
        const response = await getCourseUnits(courseId);

        if (!response || !response.status) {
          console.error("Error al obtener las unidades del curso");
          return [];
        }

        // Mapear las unidades al formato esperado y ordenarlas por número
        return response.data
          .map((unit) => ({
            id: unit.id,
            name: `Unidad ${unit.unitNumber}`,
            number: unit.unitNumber,
          }))
          .sort((a, b) => a.number - b.number);
      } catch (error) {
        console.error("Error al obtener las unidades del curso:", error);
        return [];
      }
    },
    enabled: !!courseId,
  });

  // Seleccionar la etiqueta del modal
  const handleTagSelect = (tag) => {
    formik.setFieldValue("tagActivityId", tag.id);
    setIsModalOpen(false);
  };

  return {
    units: unitsQuery.data || [],
    tags,
    isModalOpen,
    getTagById,
    setIsModalOpen,
    handleTagSelect,
  };
};
