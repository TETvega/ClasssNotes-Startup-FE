import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { deleteCourseAsync } from "../../../../shared/actions";

export const useDeleteCourse = () => {
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const queryClient = useQueryClient();

  // Función para eliminar un curso dado su ID
  const deleteCourse = async (courseId) => {
    const toastId = toast.loading("Eliminando curso...");

    setIsPending(true);
    try {
      const result = await deleteCourseAsync(courseId);

      if (!result?.status) {
        toast.error(result?.message || "Error al eliminar el curso.");
        console.error("Error al eliminar el curso: ", result?.message);
        return;
      }

      toast.success(result.message || "Curso eliminado correctamente.");

      return result;
    } catch (error) {
      toast.error(
        "El servidor no está disponible. Por favor, inténtelo más tarde.",
      );
      console.error(error);
      return;
    } finally {
      toast.dismiss(toastId);
      queryClient.clear();
      setIsPending(false);
    }
  };

  const openDeleteModal = (currentCourse) => {
    setSelectedCourse(currentCourse);
    setIsConfirmationModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    await deleteCourse(selectedCourse.id, true);
    setIsConfirmationModalOpen(false);
  };

  const onConfirmDeleteWithRedirect = async () => {
    await handleConfirmDelete();
    navigate("/courses");
    window.location.reload();
  };

  return {
    deleteCourse,
    openDeleteModal,
    handleConfirmDelete,
    onConfirmDeleteWithRedirect,
    setIsConfirmationModalOpen,
    isConfirmationModalOpen,
    isPending,
  };
};
