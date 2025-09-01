import toast from "react-hot-toast";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getCentersList,
  toggleCenterArchive,
  toggleCenterRecover,
} from "../../../../shared/actions";

export const useCenters = ({ refreshData } = {}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("activos");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Función que traduce el filtro a valor booleano/null para el backend
  const getIsArchivedValue = (filter) => {
    if (filter === "activos") return false;
    if (filter === "archivados") return true;
    if (filter === "todos") return null;
  };

  const isArchived = getIsArchivedValue(filter);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["centers", searchTerm, page, pageSize, isArchived],
    queryFn: () => getCentersList(searchTerm, page, pageSize, isArchived),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const centers = data?.data || {
    items: [],
    totalItems: 0,
    totalPages: 1,
    hasPreviousPage: false,
    hasNextPage: false,
  };

  //* Función para cambiar la cantidad de elementos por página
  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  //* Función para manejar el filtrado de los centros
  const handleFilterChange = (value) => {
    setFilter(value);
    setPage(1);
  };

  //* Función para cerrar el modal y actualizar la pagina al crear un centro
  const onCenterCreated = async () => {
    await refetch();
    setIsModalOpen(false);
  };

  //* Función para archivar un centro
  const toggleArchive = async (id) => {
    const toastId = toast.loading("Archivando Centro...");
    try {
      const center = centers.items.find((c) => c.id === id);
      const result = await toggleCenterArchive(id, !center.isArchived);
      toast.success(result.message);
      await refetch();
    } catch (error) {
      toast.error(
        "El servidor no está disponible. Por favor, inténtelo más tarde.",
      );
      console.error(error);
    } finally {
      toast.dismiss(toastId);
    }
  };

  //* Función para desarchivar un centro
  const toggleRecover = async (id) => {
    const toastId = toast.loading("Recuperando Centro...");
    try {
      const center = centers.items.find((c) => c.id === id);
      const result = await toggleCenterRecover(id, !center.isArchived);
      toast.success(result.message);
      await refetch();
    } catch (error) {
      toast.error(
        "El servidor no está disponible. Por favor, inténtelo más tarde.",
      );
      console.error(error);
    } finally {
      toast.dismiss(toastId);
    }
  };

  //* Función para manejar el cierre del modal de edición
  const handleCenterEdited = () => {
    setIsEditOpen(false);
    refreshData();
  };

  return {
    centers,
    isLoading,
    isModalOpen,
    searchTerm,
    filter,
    page,
    pageSize,
    isEditOpen,
    setIsEditOpen,
    handleCenterEdited,
    setIsModalOpen,
    setPage,
    setFilter,
    setSearchTerm,
    setPageSize,
    handleFilterChange,
    handlePageSizeChange,
    toggleArchive,
    toggleRecover,
    onCenterCreated,
    refetch,
  };
};
