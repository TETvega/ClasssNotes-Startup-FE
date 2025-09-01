import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useUserInfo } from "../../../../shared/hooks/useUserInfo";
import { deleteAccountAsync } from "../../../../shared/actions/account.action";
import { useAuthStore } from "../../../auth/store";

export const useDeleteUserAccount = () => {
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);
  const { getUserIdFromToken } = useUserInfo();
  const userId = getUserIdFromToken();
  const queryClient = useQueryClient();
  const logOut = useAuthStore((state) => state.logout);

  // Función para eliminar la cuenta del usuario y limpiar el localStorage
  const deleteUser = async () => {
    const toastId = toast.loading("Eliminando perfil...");

    setIsPending(true);
    try {
      const result = await deleteAccountAsync(userId);
      if (!result.status) {
        toast.error(result.message);
        console.error("Error al eliminar la cuenta: ", result.message);
        return;
      }

      localStorage.clear();
      toast.success(result.message);
      logOut();
      navigate("/");
      return;
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

  return { deleteUser, isPending };
};
