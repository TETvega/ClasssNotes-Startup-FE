import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  getCenterById,
  getDashboardCenter,
  toggleCenterArchive,
} from "../../../../shared/actions";

export const useDashboardCenter = (centerId) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 12,
    classType: "ACTIVE",
  });

  // Query para obtener datos del centro (Header)
  const centerQuery = useQuery({
    queryKey: ["center", centerId],
    queryFn: async () => {
      if (!centerId) return toast.error("ID del centro no proporcionado.");
      const toastId = toast.loading("Obteniendo el centro...");
      const response = await getCenterById(centerId);

      // Redirigir a la página de not-found si el statusCode es 404
      if (response?.statusCode === 404) {
        navigate("/not-found", { state: { message: "Centro no encontrado" } });
      }

      if (!response || !response.status) {
        toast.error("Ha ocurrido un error. Por favor, inténtelo más tarde.");
      }

      toast.dismiss(toastId);
      return response.data;
    },
    enabled: !!centerId,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  // Query para obtener datos del dashboard
  const dashboardQuery = useQuery({
    queryKey: [
      "dashboard",
      centerId,
      searchTerm,
      pagination.page,
      pagination.pageSize,
      pagination.classType,
    ],
    queryFn: async () => {
      if (!centerId) return toast.error("ID del centro no proporcionado.");
      const toastId = toast.loading("Obteniendo dashboard...");
      const response = await getDashboardCenter(
        centerId,
        searchTerm,
        pagination.page,
        pagination.pageSize,
        pagination.classType,
      );

      if (!response || !response.status) {
        toast.error("Ha ocurrido un error. Por favor, inténtelo más tarde.");
      }

      toast.dismiss(toastId);
      return response.data;
    },
    enabled: !!centerId,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  // Datos por defecto para evitar errores cuando los datos aún no están disponibles
  const defaultDashboardData = {
    summary: {
      totalStudents: 0,
      totalCourses: 0,
      pendingActivities: 0,
      averageAttendance: 0,
    },
    activeClasses: {
      items: [],
      hasNextPage: false,
      hasPreviousPage: false,
      currentPage: 1,
      pageSize: 12,
      totalItems: 0,
      totalPages: 0,
    },
  };

  // Función para manejar la búsqueda
  const handleSearch = (term) => {
    setSearchTerm(term);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  // Cambiar de página
  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  // Cambiar tamaño de página
  const handlePageSizeChange = (newPageSize) => {
    setPagination((prev) => ({ ...prev, pageSize: newPageSize, page: 1 }));
  };

  // Cambiar filtro
  const handleFilterChange = (filterValue) => {
    setPagination((prev) => ({
      ...prev,
      classType: filterValue,
      page: 1,
    }));
  };

  //* Función para refrescar a pagina al editar
  const refreshData = async () => {
    await centerQuery.refetch();
    await dashboardQuery.refetch();
  };

  //* Función para archivar el centro
  const toggleArchiveCenter = async () => {
    const toastId = toast.loading("Archivando centro...");
    try {
      const center = centerQuery.data;

      if (!center || !center.id) {
        throw new Error("No se pudo obtener el centro.");
      }

      const result = await toggleCenterArchive(center.id, !center.isArchived);
      toast.success(result.message);
      navigate("/centers");
      await refreshData(); // Recargar datos del centro y dashboard
    } catch (error) {
      toast.error(
        "El servidor no está disponible. Por favor, inténtelo más tarde.",
      );
      console.error(error);
    } finally {
      toast.dismiss(toastId);
    }
  };

  // Determinar si estamos en carga inicial o carga parcial
  const initialLoading =
    centerQuery.isLoading ||
    (dashboardQuery.isLoading && !dashboardQuery.isPreviousData);
  const coursesLoading = !centerQuery.isLoading && dashboardQuery.isLoading;

  return {
    // Properties
    center: centerQuery.data || {
      id: "",
      name: "",
      abbreviation: "",
      logo: null,
      isArchived: false,
      teacherId: "",
    },
    summary: dashboardQuery.data?.summary || defaultDashboardData.summary,
    activeClasses: dashboardQuery.data?.activeClasses || defaultDashboardData.activeClasses,
    initialLoading,
    coursesLoading,
    error: centerQuery.error?.message || dashboardQuery.error?.message || null,
    searchTerm,
    classType: pagination.classType,
    pagination: {
      currentPage: dashboardQuery.data?.activeClasses.currentPage || 1,
      pageSize: dashboardQuery.data?.activeClasses.pageSize || pagination.pageSize,
      totalItems: dashboardQuery.data?.activeClasses.totalItems || 0,
      totalPages: dashboardQuery.data?.activeClasses.totalPages || 0,
      hasNextPage: dashboardQuery.data?.activeClasses.hasNextPage || false,
      hasPreviousPage: dashboardQuery.data?.activeClasses.hasPreviousPage || false,
    },
    // Methods
    refreshData,
    handleSearch,
    handlePageChange,
    handlePageSizeChange,
    handleFilterChange,
    toggleArchiveCenter,
  };
};
