import toast from "react-hot-toast";
import { useTransition } from "react";
import { useFormik } from "formik";
import { usePasswordResetStore } from "../store/usePasswordResetStore";
import { NewPasswordInitValues, NewPasswordValidationSchema } from "../forms/new_password_otp";
import { updatePasswordWithOtp } from "../../../shared/actions/auth.action";

export const useNewPasswordForm = () => {
  const [isPendingOtpValidation, startTransition] = useTransition();
  const userId = usePasswordResetStore((state) => state.userId);
  const resetPasswordResetState = usePasswordResetStore(
    (state) => state.resetPasswordResetState,
  );

  const formik = useFormik({
    initialValues: NewPasswordInitValues,
    validationSchema: NewPasswordValidationSchema,
    onSubmit: (values) => {
      const newPassword = values.password;
      const confirmPassword = values.password_confirmation;

      const toastId = toast.loading("Cambiando contraseña...");
      startTransition(async () => {
        try {
          const { error, message } = await updatePasswordWithOtp({
            userId,
            newPassword,
            confirmPassword,
          });

          toast.dismiss(toastId);

          if (error) {
            toast.error(message);
            return;
          }

          toast.success(message);
          resetPasswordResetState();
        } catch (err) {
          toast.dismiss(toastId);
          toast.error(
            "El servidor no está disponible. Por favor, inténtelo de nuevo más tarde.",
          );
          console.error("Error de red o servidor:", err);
        }
      });
    },
  });

  return { formik, isPendingOtpValidation };
};
