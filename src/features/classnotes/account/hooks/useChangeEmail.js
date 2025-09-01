import toast from "react-hot-toast";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useTransition } from "react";
import { useUserInfo } from "../../../../shared/hooks/useUserInfo";
import { changeEmailAsync } from "../../../../shared/actions/account.action";

export const useChangeEmail = () => {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  const { getUserIdFromToken } = useUserInfo();

  // Funcion para cambiar el email y actualizar el localStorage
  const changeEmail = async (id, form) => {
    const toastId = toast.loading("Actualizando email...");

    startTransition(async () => {
      try {
        const result = await changeEmailAsync(id, form);
        if (!result.status) {
          toast.error(result.message);
          console.error("Error al cambiar email: ", result.message);
          return;
        }

        // Actualizar el email en localStorage
        const user = JSON.parse(localStorage.getItem("user")) || {};
        const newEmail = form.newEmail;
        user.email = newEmail;
        localStorage.setItem("user", JSON.stringify(user));

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

  const validate = (values) => {
    const errors = {};
    if (!values.newEmail) {
      errors.newEmail = "El correo electrónico es obligatorio";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.newEmail)) {
      errors.newEmail = "Ingresa un correo válido";
    }
    return errors;
  };

  // Configuración de Formik
  const formik = useFormik({
    initialValues: { newEmail: "" },
    validate,
    onSubmit: async (values) => {
      const userId = getUserIdFromToken();

      if (!userId) {
        toast.error("No se encontró el ID de usuario.");
        return;
      }
      await changeEmail(userId, { newEmail: values.newEmail });
    },
  });

  return { changeEmail, formik, isPending };
};
