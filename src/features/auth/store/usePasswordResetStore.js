import { create } from "zustand";
import { sendForgotPasswordRequest, validateOtpCode } from "../../../shared/actions/auth/forgot_password.actions";

export const usePasswordResetStore = create((set) => ({
  email: "",
  otpCode: "",
  userId: "",
  isOtpValid: false,
  otpExpirationSeconds: 0,
  isEmailExisting: false,
  message: "",
  error: false,

  // Método para enviar el código de verificación de OTP
  requestPasswordReset: async (values) => {
    try {
      const { status, data, message } = await sendForgotPasswordRequest(values);
      if (status) {
        set({
          email: values.email,
          message: message,
          error: false,
          isEmailExisting: true,
          otpExpirationSeconds: data.expirationSeconds,
        });
        return { error: false, message };
      }

      set({ message: message, error: true, isEmailExisting: false });
      return { error: true, message };
    } catch (error) {
      console.error(error);
      return error?.response?.data;
    }
  },

  // Método para validar el código de verificación de OTP
  validateOtp: async (values) => {
    try {
      const { status, data, message } = await validateOtpCode(values);
      if (status) {
        set({
          otpCode: values.otpCode,
          userId: data.userId,
          isOtpValid: true,
          message: message,
          error: false,
        });
        return { error: false, message };
      }

      set({ message: message, error: true, isOtpValid: false });
      return { error: true, message };
    } catch (error) {
      console.error(error);
      return error?.response?.data;
    }
  },

  // Método para restablecer la contraseña
  resetPasswordResetState: () => {
    set({
      email: "",
      otpCode: "",
      userId: "",
      isOtpValid: false,
      otpExpirationSeconds: 0,
      isEmailExisting: false,
      message: "",
      error: false,
    });
  },
}));
