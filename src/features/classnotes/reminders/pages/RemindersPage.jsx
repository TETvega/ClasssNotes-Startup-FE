import { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useParams } from "react-router-dom";
import { useReminders } from "../hooks";
import { useRemindersStore } from "../store";
import { Breadcrumb } from "../../../../shared/components/ui";
import { ButtonsRemindersPages } from "../components/ui";
import BrutalButton from "../../../../shared/components/ui/BrutalButton";
import ReminderList from "../components/RemindersList";
import BrutalPagination from "../../../../shared/components/ui/BrutalPagination";
import { ReminderModal, ViewReminderModal } from "../components/modals";
import ConfirmDeleteModal from "../../../../shared/components/modals/ConfirmDeleteModal";

export const RemindersPage = () => {
  const [activeButton, setActiveButton] = useState("Pendientes");
  const { courseId } = useParams();

  const {
    reminders,
    currentPage,
    pageSize,
    totalItems,
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
    toggleReminderStatus,
    openCreateModal,
    closeCreateModal,
    openEditModal,
    closeEditModal,
    openViewModal,
    closeViewModal,
    openDeleteModal,
    closeDeleteModal,
    handleDeleteReminder,
    isLoading,
    hasNextPage,
    hasPreviousPage,
    totalPages,
    nextPage,
    previousPage,
  } = useReminders({ courseId, activeButton, setActiveButton });

  const loadData = useRemindersStore((state) => state.loadData);

  // Actualizar los recordatorios cuando cambie el filtro
  useEffect(() => {
    const filter = activeButton === "Pendientes" ? "PENDING" : "HISTORY";
    loadData({ courseId, filter, page: 1, pageSize });
    setCurrentPage(1);
  }, [activeButton, loadData, courseId, pageSize]);

  return (
    <div className="w-full">
      {/* Encabezado */}
      <div className="relative mb-4 flex flex-col items-start gap-2 sm:mb-6 sm:gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full items-center justify-between px-2 sm:px-4">
          <Breadcrumb />
        </div>
      </div>
      {/* Contenido Principal */}
      <main className="container mx-auto flex-1 px-2 sm:px-4">
        <div className="bg-primary-bg rounded-lg border border-gray-600 p-3 shadow sm:p-4 md:p-6">
          {/* Header de Recordatorios */}
          <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:gap-4">
            <h2 className="text-lg font-black text-black sm:text-xl">
              Recordatorios de curso
            </h2>
            {/* Botones de Estado y Nueva Nota */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
              {/* Componente ButtonsRemindersPages */}
              <ButtonsRemindersPages
                activeButton={activeButton}
                onPendientesClick={() => setActiveButton("Pendientes")}
                onHistorialClick={() => setActiveButton("Historial")}
              />
              {/* Botón de Nueva Nota */}
              <BrutalButton
                onClick={openCreateModal}
                variant="icon"
                className="bg-action-primary mt-2 flex items-center justify-center gap-1 text-xs sm:mt-0 sm:justify-start sm:gap-2 sm:text-base"
              >
                <IoMdAddCircleOutline className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="xs:inline hidden">Nuevo recordatorio</span>
                <span className="xs:hidden inline">Nuevo recordatorio</span>
              </BrutalButton>
            </div>
          </div>
          {/* Componente ReminderList */}
          <ReminderList
            reminders={reminders}
            onToggleStatus={toggleReminderStatus}
            onViewReminder={openViewModal}
            onEditReminder={openEditModal}
            onDeleteReminder={openDeleteModal}
            variant={activeButton.toLowerCase()}
            isLoading={isLoading}
          />
          {/* Componente de Paginación */}
          {totalItems > 0 && (
            <div className="mt-4 sm:mt-6">
              <BrutalPagination
                currentPage={currentPage}
                pageSize={pageSize}
                totalItems={totalItems}
                totalPages={totalPages}
                hasPreviousPage={hasPreviousPage}
                hasNextPage={hasNextPage}
                onPageChange={(page) => setCurrentPage(page)}
                itemLabel={"recordatorios"}
                onPageSizeChange={(size) => {
                  setPageSize(size);
                  setCurrentPage(1);
                }}
                onNextPage={nextPage}
                onPreviousPage={previousPage}
              />
            </div>
          )}
        </div>
      </main>
      {/* Modales */}
      <ViewReminderModal
        isOpen={isViewModalOpen}
        onClose={closeViewModal}
        reminder={selectedReminder}
      />
      <ReminderModal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        mode="create"
        formik={createForm.formik}
      />
      <ReminderModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        mode="edit"
        formik={editForm.formik}
      />
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        itemType="recordatorio"
        itemName={reminderToDelete?.title || ""}
        description="Este recordatorio será eliminado permanentemente."
        onConfirm={handleDeleteReminder}
      />
    </div>
  );
};
