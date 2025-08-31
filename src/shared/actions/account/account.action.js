import { classNotesApi } from "../../../config/classNotesApi";

// Función para manejar el cambio de nombre del usuario de forma asíncrona
export const changeNameAsync = async (id, form) => {
  try {
    // Enviar una solicitud PUT al endpoint de cambiar nombre con los datos del formulario
    const { data } = await classNotesApi.put(`/users/${id}`, form);

    // Devolver los datos de la respuesta
    return data;
  } catch (error) {
    // Registrar cualquier error en la consola
    console.error(error);
    // Devolver los datos de la respuesta de error si están disponibles
    return error?.response?.data;
  }
};

// Función para manejar el cambio de email del usuario de forma asíncrona
export const changeEmailAsync = async (id, form) => {
  try {
    // Enviar una solicitud PUT al endpoint de cambio de email con los datos del formulario
    const { data } = await classNotesApi.put(`/users/email/${id}`, form);

    // Devolver los datos de la respuesta
    return data;
  } catch (error) {
    // Registrar cualquier error en la consola
    console.error(error);
    // Devolver los datos de la respuesta de error si están disponibles
    return error?.response?.data;
  }
};

// Función para manejar el cambio de contraseña del usuario de forma asíncrona
export const changePasswordAsync = async (id, form) => {
  try {
    // Enviar una solicitud PUT al endpoint de cambio de contraseña con los datos del formulario
    const { data } = await classNotesApi.put(`/users/password/${id}`, form);

    // Devolver los datos de la respuesta
    return data;
  } catch (error) {
    // Registrar cualquier error en la consola
    console.error(error);
    // Devolver los datos de la respuesta de error si están disponibles
    return error?.response?.data;
  }
};

//! Agregado par amanejar el eliminar cuenta
// Función para manejar la eliminación de la cuenta del usuario de forma asíncrona
export const deleteAccountAsync = async (id) => {
  try {
    // Enviar una solicitud DETELE al endpoint de cambio de contraseña con los datos del formulario
    const { data } = await classNotesApi.delete(`/users/${id}`);

    // Devolver los datos de la respuesta
    return data;
  } catch (error) {
    // Registrar cualquier error en la consola
    console.error(error);
    // Devolver los datos de la respuesta de error si están disponibles
    return error?.response?.data;
  }
};
