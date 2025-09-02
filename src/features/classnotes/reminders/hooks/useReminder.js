import { useState, useEffect } from "react";
import { useRemindersStore } from "../store";
import { useCreateReminderForm } from "./useCreateReminderForm";
import { useEditReminderForm } from "./useEditReminderForm";

export const useReminders = ({ courseId, activeButton, setActiveButton }) => {
  // Estado para manejar los recordatorios
  const [isLoading, setIsLoading] = useState(true);
  const remindersData = useRemindersStore((state) => state.remindersData);
  const loadData = useRemindersStore((state) => state.loadData);
  const toggleReminderStatus = useRemindersStore(
    (state) => state.toggleReminderStatus,
  );
  const nextPage = useRemindersStore((state) => state.nextPage);
  const previousPage = useRemindersStore((state) => state.previousPage);
  const deleteReminder = useRemindersStore((state) => state.deleteReminder);
  const createReminder = useRemindersStore((state) => state.createReminder);
  const updateReminder = useRemindersStore((state) => state.updateReminder);

  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  // Estado para el filtro activo
  const [activeFilter, setActiveFilter] = useState("PENDING");

  // Sincronizar activeFilter con activeButton
  useEffect(() => {
    const filter = activeButton === "Pendientes" ? "PENDING" : "HISTORY";
    setActiveFilter(filter);
  }, [activeButton]);

  // Manejadores para los modales
  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => {
    createForm.formik.resetForm();
    setIsCreateModalOpen(false);
  };

  const openEditModal = (reminder) => {
    setSelectedReminder(reminder);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setSelectedReminder(null);
    setIsEditModalOpen(false);
  };

  // Estado para el modal de eliminación
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [reminderToDelete, setReminderToDelete] = useState(null);

  // Estado para los modales de creación y edición
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState(null);

  // Estado para el modal de vista
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Hooks personalizados para crear y editar recordatorios
  const createForm = useCreateReminderForm({
    courseId,
    closeCreateModal,
    createReminder,
    activeFilter,
    pageSize,
    setActiveButton,
  });
  const editForm = useEditReminderForm({
    reminderId: selectedReminder?.id,
    courseId,
    closeEditModal,
    updateReminder,
    activeFilter,
    pageSize,
    setActiveButton,
  });

  // Cargar datos iniciales
  useEffect(() => {
    const fetchReminders = async () => {
      setIsLoading(true);
      await loadData({
        courseId,
        page: currentPage,
        pageSize,
        filter: activeFilter,
      });
      setIsLoading(false);
    };
    fetchReminders();
  }, [courseId, loadData, currentPage, pageSize, activeFilter]);

  // Función para cambiar el estado de visto/no visto
  const handleToggleReminderStatus = async (id) => {
    await toggleReminderStatus(id, courseId, activeFilter, pageSize);
  };

  const openViewModal = (reminder) => {
    setSelectedReminder(reminder);
    setIsViewModalOpen(true);
  };
  const closeViewModal = () => {
    setSelectedReminder(null);
    setIsViewModalOpen(false);
  };

  // Manejadores para el modal de eliminación
  const openDeleteModal = (reminder) => {
    setReminderToDelete(reminder);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setReminderToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleDeleteReminder = async () => {
    if (reminderToDelete) {
      await deleteReminder(
        reminderToDelete.id,
        courseId,
        activeFilter,
        pageSize,
      );
      closeDeleteModal();
    }
  };

  return {
    reminders: remindersData.items,
    isLoading,
    currentPage,
    pageSize,
    totalItems: remindersData.totalItems,
    isDeleteModalOpen,
    reminderToDelete,
    isCreateModalOpen,
    isEditModalOpen,
    selectedReminder,
    isViewModalOpen,
    createForm,
    editForm,
    setCurrentPage,
    setPageSize,
    toggleReminderStatus: handleToggleReminderStatus,
    openCreateModal,
    closeCreateModal,
    openEditModal,
    closeEditModal,
    openViewModal,
    closeViewModal,
    openDeleteModal,
    closeDeleteModal,
    handleDeleteReminder,
    hasNextPage: remindersData.hasNextPage,
    hasPreviousPage: remindersData.hasPreviousPage,
    totalPages: remindersData.totalPages,
    nextPage: () => nextPage({ courseId, filter: activeFilter, pageSize }),
    previousPage: () =>
      previousPage({ courseId, filter: activeFilter, pageSize }),
  };
};
