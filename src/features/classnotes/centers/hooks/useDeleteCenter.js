import { useCenters } from "./useCenters";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { deleteCenterAsync } from "../../../../shared/actions";

export const useDeleteCenter = () => {
  const [isPending, setIsPending] = useState(false);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const { refetch } = useCenters();
  const navigate = useNavigate();

  const deleteCenter = async (id, confirmation = true) => {
    const toastId = toast.loading("Eliminando centro...");

    setIsPending(true);
    try {
      const result = await deleteCenterAsync(id, confirmation);

      toast.success(result.message);
    } catch (error) {
      toast.error(
        "El servidor no está disponible. Por favor, inténtelo más tarde.",
      );
      console.error(error);
    } finally {
      toast.dismiss(toastId);
      setIsPending(false);
    }
  };

  const openDeleteModal = (center) => {
    setSelectedCenter(center);
    setIsConfirmationModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    await deleteCenter(selectedCenter.id, true);
    setIsConfirmationModalOpen(false);
    refetch();
  };

  const onConfirmDeleteWithRedirect = async () => {
    await handleConfirmDelete();
    navigate("/centers");
  };

  return {
    isPending,
    isConfirmationModalOpen,
    deleteCenter,
    openDeleteModal,
    handleConfirmDelete,
    setIsConfirmationModalOpen,
    onConfirmDeleteWithRedirect,
  };
};
