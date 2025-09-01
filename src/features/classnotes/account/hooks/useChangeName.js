import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useTransition } from "react";
import { useUserInfo } from "../../../../shared/hooks/useUserInfo";
import { changeNameAsync } from "../../../../shared/actions/account.action";

export const useChangeName = () => {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  const { getUserIdFromToken } = useUserInfo();

  // Función para cambiar el nombre y actualizar localStorage
  const changeName = async (id, form) => {
    const toastId = toast.loading("Actualizando nombre...");

    startTransition(async () => {
      try {
        const result = await changeNameAsync(id, form);

        if (!result.status) {
          toast.error(result.message);
          console.error("Error al cambiar nombre: ", result.message);
          return;
        }

        // Actualizar el nombre en localStorage
        const user = JSON.parse(localStorage.getItem("user")) || {};
        const firstName = form.firstName;
        const lastName = form.lastName;
        const fullName = `${firstName} ${lastName}`;
        user.name = fullName;
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

  // Función de validación para Formik
  const validate = (values) => {
    const errors = {};
    if (!values.firstName) {
      errors.firstName = "El nombre es obligatorio";
    } else if (values.firstName.length < 3) {
      errors.firstName = "El nombre debe tener al menos 3 caracteres";
    }

    if (!values.lastName) {
      errors.lastName = "El apellido es obligatorio";
    } else if (values.lastName.length < 3) {
      errors.lastName = "El apellido debe tener al menos 3 caracteres";
    }

    return errors;
  };

  // Configuración de Formik
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
    },
    validate,
    onSubmit: async (values) => {
      const userId = getUserIdFromToken();

      if (!userId) {
        toast.error("No se encontró el ID de usuario.");
        return;
      }
      await changeName(userId, values);
    },
  });

  return { changeName, formik, isPending };
};
