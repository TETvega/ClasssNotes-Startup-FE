import { useState, useTransition } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { usePasswordResetStore } from "../store/usePasswordResetStore";

export const useRecoverPassword = () => {
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();

  const requestPasswordReset = usePasswordResetStore(
    (state) => state.requestPasswordReset,
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        const { error, message } = await requestPasswordReset({ email });
        if (error) {
          toast.error(message);
          console.error("Error al enviar el correo:", message);
          return;
        }
        navigate("/auth/verify-code");
      } catch (err) {
        toast.error(
          "El servidor no está disponible. Por favor, inténtelo más tarde.",
        );
        console.error("Error de red o servidor:", err);
      }
    });
  };

  return { email, setEmail, isPending, handleSubmit };
};
