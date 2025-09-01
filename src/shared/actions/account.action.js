import { classNotesApi } from "../../config/classNotesApi";

// Función para manejar el cambio de nombre del usuario de forma asíncrona
export const changeNameAsync = async (id, form) => {
  try {
    const { data } = await classNotesApi.put(`/users/${id}`, form);

    return data;
  } catch (error) {
    console.error(error);
    return error?.response?.data;
  }
};

// Función para manejar el cambio de email del usuario de forma asíncrona
export const changeEmailAsync = async (id, form) => {
  try {
    const { data } = await classNotesApi.put(`/users/email/${id}`, form);

    return data;
  } catch (error) {
    console.error(error);
    return error?.response?.data;
  }
};

// Función para manejar el cambio de contraseña del usuario de forma asíncrona
export const changePasswordAsync = async (id, form) => {
  try {
    const { data } = await classNotesApi.put(`/users/password/${id}`, form);

    return data;
  } catch (error) {
    console.error(error);
    return error?.response?.data;
  }
};

// Función para manejar la eliminación de la cuenta del usuario de forma asíncrona
export const deleteAccountAsync = async (id) => {
  try {
    const { data } = await classNotesApi.delete(`/users/${id}`);

    return data;
  } catch (error) {
    console.error(error);
    return error?.response?.data;
  }
};
