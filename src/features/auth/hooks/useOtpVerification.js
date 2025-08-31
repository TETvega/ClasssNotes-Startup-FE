import { useTransition } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useOtpVerification = (validateOtp, email, code) => {
  const navigate = useNavigate();
  const [isPendingOtpValidation, startTransition] = useTransition();

  const handleVerification = () => {
    const toastId = toast.loading("Validando código OTP...");
    const otpCode = code.join("");
    
    startTransition(async () => {
      try {
        const { error, message } = await validateOtp({ email, otpCode });
        toast.dismiss(toastId);
        if (error) {
          toast.error(message);
          return;
        }
        toast.success(message || "Correo enviado correctamente");
        navigate("/auth/reset-password");
      } catch (err) {
        toast.dismiss(toastId);
        toast.error(
          "Error de conexión. Por favor, inténtelo de nuevo más tarde.",
        );
        console.error("Error de red o servidor:", err);
      }
    });
  };

  return { handleVerification, isPendingOtpValidation };
};

export default useOtpVerification;
