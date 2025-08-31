import { classNotesApi } from "../../../config/classNotesApi";

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
