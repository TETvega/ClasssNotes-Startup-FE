import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTagsListStore } from "../../tags/store/useTagsListStore";
import { getAllActivitiesCourse, getCourseUnits } from "../../../../shared/actions";

export const useActivitiesCourse = (courseId) => {
  const navigate = useNavigate();
  const pageSizeOptions = [6, 12, 24];
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [isExtraFilter, setIsExtraFilter] = useState("ALL");

  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: pageSize,
    typeActivities: "ALL",
    unitId: "",
    tagActivityId: "",
  });

  // Obtener las etiquetas del store de Zustand
  const { tags, getTagById, getTags } = useTagsListStore();

  // Cargar las etiquetas si no están cargadas por si acaso
  useEffect(() => {
    getTags();
  }, [getTags]);

  // Query para obtener las actividades del curso
  const activitiesCourseQuery = useQuery({
    queryKey: [
      "activities-course",
      courseId,
      searchTerm,
      pagination.page,
      pagination.typeActivities,
      isExtraFilter,
      pagination.unitId,
      pagination.tagActivityId,
      pagination.pageSize,
    ],
    queryFn: async () => {
      const toastId = toast.loading("Obteniendo actividades...");
      const response = await getAllActivitiesCourse(
        courseId,
        searchTerm,
        pagination.page,
        pagination.typeActivities,
        isExtraFilter,
        pagination.unitId,
        pagination.tagActivityId,
        pagination.pageSize,
      );

      if (!response || !response.status) {
        toast.error("Ha ocurrido un error. Por favor, inténtelo más tarde.");
        toast.dismiss(toastId);
        return null;
      }

      toast.dismiss(toastId);
      return response.data;
    },
    enabled: !!courseId, // Solo se ejecuta si hay un courseId
    keepPreviousData: true,
  });

  // Query para obtener las unidades del curso (para el filtro)
  const unitsQuery = useQuery({
    queryKey: ["course-units", courseId],
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
          .sort((a, b) => a.number - b.number); // Ordenar por número de unidad
      } catch (error) {
        console.error("Error al obtener las unidades del curso:", error);
        return [];
      }
    },
    refetchOnWindowFocus: false,
    enabled: !!courseId, // Solo se ejecuta si hay un courseId
  });

  // Manejador para la búsqueda
  const handleSearch = (query) => {
    setSearchTerm(query);
    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));
  };

  // Manejador para cambio de página
  const handlePageChange = (page) => {
    setPagination((prev) => ({
      ...prev,
      page,
    }));
    setPageSize(pageSizeOptions[0]);
  };

  // Manejador para cambio de tamaño de página
  const handlePageSizeChange = (pageSize) => {
    setPagination((prev) => ({
      ...prev,
      pageSize,
      page: 1,
    }));
  };

  // Manejador para cambio de unidad
  const handleUnitChange = (unitId) => {
    setSelectedUnit(unitId);
    setPagination((prev) => ({
      ...prev,
      unitId,
      page: 1,
    }));
  };

  // Manejador para cambio de etiqueta
  const handleTagChange = (tagId) => {
    setSelectedTag(tagId);
    setPagination((prev) => ({
      ...prev,
      tagActivityId: tagId,
      page: 1,
    }));
  };

  // Manejador para cambio de filtro de actividades extra
  const handleExtraFilterChange = (filter) => {
    setIsExtraFilter(filter);
    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));
  };

  return {
    activities: activitiesCourseQuery.data,
    isLoading: activitiesCourseQuery.isLoading,
    isError: activitiesCourseQuery.isError,
    units: unitsQuery.data || [],
    tags,
    getTagById,
    courseId,
    searchTerm,
    selectedUnit,
    selectedTag,
    isExtraFilter,
    pagination,
    pageSizeOptions,
    navigate,
    handleSearch,
    handlePageChange,
    handlePageSizeChange,
    handleUnitChange,
    handleTagChange,
    handleExtraFilterChange,refetchActivities: activitiesCourseQuery.refetch, 
  };
};
