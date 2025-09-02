import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useTagsListStore } from "../../tags/store/useTagsListStore";
import { getAllActivities, getCentersList } from "../../../../shared/actions";

export const useAllActivities = () => {
  const navigate = useNavigate();
  const pageSizeOptions = [6, 12, 24];
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCenter, setSelectedCenter] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: pageSize,
    typeActivities: "ALL",
    centerId: "",
    tagActivityId: "",
  });

  // Obtener las etiquetas del store de Zustand
  const { tags, getTagById, getTags } = useTagsListStore();

  // Cargar las etiquetas si no están cargadas
  useEffect(() => {
    getTags();
  }, [getTags]);

  // Query para obtener todos las actividades
  const allActivitiesQuery = useQuery({
    queryKey: [
      "activities",
      searchTerm,
      pagination.page,
      pagination.typeActivities,
      pagination.centerId,
      pagination.tagActivityId,
      pagination.pageSize,
    ],
    queryFn: async () => {
      const toastId = toast.loading("Obteniendo actividades...");
      const response = await getAllActivities(
        searchTerm,
        pagination.page,
        pagination.typeActivities,
        pagination.centerId,
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
    enabled: true, // Siempre habilitado para cargar datos iniciales
    keepPreviousData: true,
  });

  // Query para obtener todos los centros
  const centersQuery = useQuery({
    queryKey: ["centers"],
    queryFn: async () => {
      try {
        const response = await getCentersList("", 1, 100, false); // Obtener hasta 100 centros no archivados

        if (!response || !response.status) {
          console.error("Error al obtener los centros");
          return [];
        }

        return response.data.items.map((center) => ({
          id: center.id,
          name: center.abbreviation ? center.abbreviation : center.name || "",
        }));
      } catch (error) {
        console.error("Error al obtener los centros:", error);
        return [];
      }
    },
    refetchOnWindowFocus: false,
    enabled: true, // Siempre habilitado para cargar los centros
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
  };

  // Manejador para cambio de tamaño de página
  const handlePageSizeChange = (pageSize) => {
    setPagination((prev) => ({
      ...prev,
      pageSize,
      page: 1,
    }));
  };

  // Manejador para cambio de centro
  const handleCenterChange = (centerId) => {
    setSelectedCenter(centerId);
    setPagination((prev) => ({
      ...prev,
      centerId,
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

  return {
    activities: allActivitiesQuery.data,
    centers: centersQuery.data || [],
    tags,
    getTagById,
    searchTerm,
    selectedCenter,
    selectedTag,
    pagination,
    isLoading: allActivitiesQuery.isLoading,
    isLoadingCenters: centersQuery.isLoading,
    isError: allActivitiesQuery.isError,
    pageSizeOptions,
    setPageSize,
    handleSearch,
    handlePageChange,
    handlePageSizeChange,
    handleCenterChange,
    handleTagChange,
    navigate,
    refetchActivities: allActivitiesQuery.refetch,
  };
};
