import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteActivity } from "../../../../shared/actions";

export const useDeleteActivity = () => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  // Mutación
  const { mutateAsync } = useMutation({
    mutationFn: deleteActivity,
    refetchOnWindowFocus: false,
  });

  // Función de eliminación
  const handleDelete = async (activityId, dontNavigate = false) => {
    const toastId = toast.loading("Eliminando actividad...");
    setIsPending(true);

    try {
      const result = await mutateAsync(activityId);

      if (!result.status) {
        toast.error(result.message);
        console.error("Error al eliminar la actividad: ", result.message);
        return;
      }

      toast.success(result.message);
      if (!dontNavigate) navigate(-1);
      
    } catch (error) {
      toast.error("Ha ocurrido un problema. Por favor, inténtelo más tarde.");
      console.error(error);
    } finally {
      toast.dismiss(toastId);
      setIsPending(false);
    }
  };

  // Seleccionar una actividad para eliminar
  const handleDeleteClick = (activity) => {
    setSelectedActivity(activity);
    setIsConfirmModalOpen(true);
  };

  return {
    isPending,
    isConfirmModalOpen,
    selectedActivity,
    setIsConfirmModalOpen,
    handleDelete,
    handleDeleteClick,
  };
};
