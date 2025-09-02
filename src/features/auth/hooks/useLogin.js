import { useTransition } from "react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useAuthStore } from "../store";
import { useNavigate } from "react-router-dom";
import { loginInitValues, loginValidationSchema } from "../forms";

export const useLogin = () => {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  const login = useAuthStore((state) => state.login);

  const formik = useFormik({
    initialValues: loginInitValues,
    validationSchema: loginValidationSchema,
    validateOnChange: true,
    onSubmit: (formValues) => {
      const toastId = toast.loading("Iniciando sesión...");
      startTransition(async () => {
        try {
          const { error, message } = await login(formValues);
          toast.dismiss(toastId);
          if (error) {
            toast.error(message);
            return;
          }
          navigate("/dashboard");
          toast.success(message);
        } catch (err) {
          console.error("useLogin -> server error", err);
          toast.error(
            "El servidor no está disponible. Por favor, inténtelo de nuevo más tarde.",
            { id: toastId },
          );
        }
      });
    },
  });

  return { formik, isPending };
};
