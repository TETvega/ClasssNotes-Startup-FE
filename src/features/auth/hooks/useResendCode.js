import { useTransition } from "react";
import toast from "react-hot-toast";

export const useResendCode = (
  requestPasswordReset,
  email,
  setSecondsLeft,
  otpExpirationSeconds,
) => {
  const [isPending, startTransition] = useTransition();

  const handleRequest = () => {
    const toastId = toast.loading("Enviando correo de verificación...");
    startTransition(async () => {
      const { error, message } = await requestPasswordReset({ email });
      toast.dismiss(toastId);
      if (error) {
        toast.error(message);
        return;
      }
      setSecondsLeft(otpExpirationSeconds);
      toast.success(message || "Correo enviado correctamente");
    });
  };

  return { handleRequest, isPending };
};
