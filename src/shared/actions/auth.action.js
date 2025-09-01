import { classNotesApi } from "../../config/classNotesApi";

// Función para manejar el inicio de sesión del usuario de forma asíncrona
export const loginAsync = async (form) => {
  try {
    const { data } = await classNotesApi.post("/auth/login", form);
    return data;
  } catch (error) {
    console.error(error);
    return error?.response?.data;
  }
};

// Función para manejar el registro del usuario de forma asíncrona
export const registerAsync = async (form) => {
  try {
    const { data } = await classNotesApi.post("/auth/register", form);
    return data;
  } catch (error) {
    console.error(error);
    return error?.response?.data;
  }
};

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
