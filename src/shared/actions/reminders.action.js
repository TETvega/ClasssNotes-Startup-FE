import { classNotesApi } from "../../config/classNotesApi";

// Traer todo paginado
export const getRemindersPaginationAsync = async ({
  courseId,
  searchTerm = "",
  page = 1,
  pageSize,
  filter = "PENDING",
}) => {
  try {
    const { data } = await classNotesApi.post(`/course_notes/getAllNotes`, {
      courseId,
      searchTerm,
      page,
      pageSize,
      filter,
    });
    return data;
  } catch (error) {
    console.error("Error al buscar recordatorios:", error);
    return (
      error?.response?.data || {
        status: false,
        message: "Error al buscar recordatorios",
      }
    );
  }
};

// Traer conteo de recordatorios pendientes
export const getPendingRemindersCountAsync = async (courseId) => {
  try {
    const { data } = await classNotesApi.post(`/course_notes/getAllNotes`, {
      courseId,
      searchTerm: "",
      page: 1,
      pageSize: 1, // Mínimo para obtener totalItems
      filter: "PENDING",
    });
    return {
      status: true,
      data: { totalItems: data.totalItems },
    };
  } catch (error) {
    console.error("Error al contar recordatorios pendientes:", error);
    return (
      error?.response?.data || {
        status: false,
        message: "Error al contar recordatorios",
      }
    );
  }
};

// Traer por id
export const getReminderByIdAsync = async (id) => {
  try {
    const { data } = await classNotesApi.get(`/course_notes/${id}`);
    return data;
  } catch (error) {
    console.error("Error al buscar recordatorios por id:", error);
    return (
      error?.response?.data || {
        status: false,
        message: "Error al buscar el recordatorio",
      }
    );
  }
};

// Crear recordatorio
export const createReminderAsync = async (reminder) => {
  try {
    const { data } = await classNotesApi.post(`/course_notes`, reminder);
    return data;
  } catch (error) {
    console.error("Error al crear el recordatorio:", error);
    return (
      error?.response?.data || {
        status: false,
        message: "Error al crear el recordatorio",
      }
    );
  }
};

// Actualizar recordatorio
export const updateReminderAsync = async (reminder) => {
  try {
    const { data } = await classNotesApi.put(
      `/course_notes/${reminder.id}`,
      reminder,
    );
    return data;
  } catch (error) {
    console.error("Error al actualizar el recordatorio:", error);
    return (
      error?.response?.data || {
        status: false,
        message: "Error al actualizar el recordatorio",
      }
    );
  }
};

// Eliminar recordatorio
export const deleteReminderAsync = async (id) => {
  try {
    const { data } = await classNotesApi.delete(`/course_notes/${id}`);
    return data;
  } catch (error) {
    console.error("Error al borrar el recordatorio:", error);
    return (
      error?.response?.data || {
        status: false,
        message: "Error al borrar el recordatorio",
      }
    );
  }
};

// Cambiar de No visto a Visto
export const toggleReminderStatusAsync = async (id) => {
  try {
    const { data } = await classNotesApi.put(`/course_notes/notesViews`, [id]);
    return data;
  } catch (error) {
    console.error("Error al cambiar el estado:", error);
    return (
      error?.response?.data || {
        status: false,
        message: "Error al cambiar el estado",
      }
    );
  }
};
