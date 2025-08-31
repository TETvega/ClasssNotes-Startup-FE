import { classNotesApi } from "../../../config/classNotesApi";

// Funcion para enviar Codigo OTP al email que el usuario ingreso
export const sendForgotPasswordRequest = async (values) => {
  try {
    const { data } = await classNotesApi.post("/otp/generate", values);
    return data;
  } catch (error) {
    console.error(error);
    return error?.response?.data;
  }
};

// Función para validar el codigo OTP enviado al email del usuario
export const validateOtpCode = async (values) => {
  try {
    const { data } = await classNotesApi.post("/otp/validate", values);
    return data;
  } catch (error) {
    console.error(error);
    return error?.response?.data;
  }
};

export const updatePasswordWithOtp = async (values) => {
  try {
    const { data } = await classNotesApi.put("/users/password-otp", values);
    return data;
  } catch (error) {
    console.error(error);
    return error?.response?.data;
  }
};
