import toast from "react-hot-toast";
import { useTransition } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { changePasswordAsync } from "../../../../shared/actions/account/account.action";
import { useUserInfo } from "../../../../shared/hooks/useUserInfo";

export const useChangePassword = () => {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  const { getUserIdFromToken } = useUserInfo();

  // Función para cambiar la contraseña
  const changePassword = async (id, form) => {
    const toastId = toast.loading("Actualizando contraseña...");

    startTransition(async () => {
      try {
        const result = await changePasswordAsync(id, form);
        if (!result.status) {
          toast.error(result.message);
          console.error("Error al cambiar contraseña: ", result.message);
          return;
        }

        toast.success(result.message);
        navigate("/account/");
        return result;
      } catch (error) {
        toast.error(
          "El servidor no está disponible. Por favor, inténtelo más tarde.",
        );
        console.error(error);
        throw error;
      } finally {
        toast.dismiss(toastId);
      }
    });
  };

  // Función de validación personalizada
  const validate = (values) => {
    const errors = {};

    if (!values.currentPassword) {
      errors.currentPassword = "La contraseña actual es obligatoria";
    }

    if (!values.newPassword) {
      errors.newPassword = "La nueva contraseña es obligatoria";
    } else if (values.newPassword.length < 8) {
      errors.newPassword =
        "La nueva contraseña debe tener al menos 8 caracteres";
    }

    if (!values.confirmNewPassword) {
      errors.confirmNewPassword = "Debes confirmar la nueva contraseña";
    } else if (values.confirmNewPassword !== values.newPassword) {
      errors.confirmNewPassword = "Las contraseñas no coinciden";
    }

    return errors;
  };

  // Configuración de useFormik
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validate,
    onSubmit: async (values) => {
      const userId = getUserIdFromToken();

      if (!userId) {
        toast.error("No se econtró el ID del usuario");
      }
      await changePassword(userId, values);
    },
  });

  return { changePassword, formik, isPending };
};
