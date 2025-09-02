import { classNotesApi } from "../../config/classNotesApi";

// Función para obtener todos los cursos de un usuario/docente
export const getAllCoursesAsync = async (body) => {
  try {
    const { data } = await classNotesApi.post("/courses/all", body);
    return data;
  } catch (error) {
    console.error(error);
    return error?.response?.data;
  }
};

// Función para obtener un cursos de un usuario/docente
export const getCourseById = async (courseId) => {
  try {
    const { data } = await classNotesApi.get(`/courses/${courseId}`);

    return data;
  } catch (error) {
    console.error(error);
    return error?.response?.data;
  }
};

// Función para obtener el dashboard de un curso
export const getDashboardCourse = async (courseId) => {
  try {
    const { data } = await classNotesApi.get(`/courses/${courseId}/info`);
    return data;
  } catch (error) {
    console.error(error);
    return error?.response?.data;
  }
};

// Endpoint para obtener todas las unidades de un curso
export const getCourseUnits = async (courseId) => {
  try {
    const { data } = await classNotesApi.get(`/courses/units/${courseId}`);
    return data;
  } catch (error) {
    console.error(error);
    return error?.response?.data;
  }
};

// Función para crear un nuevo curso
export const createCourseAsync = async (form) => {
  try {
    const { data } = await classNotesApi.post("/courses", form);
    return data;
  } catch (error) {
    console.error(error);
    return error?.response?.data;
  }
};

// Función para crear una nueva configuración de curso
export const createCourseSettingAsync = async (settingForm) => {
  try {
    const { data } = await classNotesApi.post("/courses_settings", settingForm);
    return data;
  } catch (error) {
    console.error(error);
    return error?.response?.data;
  }
};

export const getCourseSettingsAsync = async (
  searchTerm = "searchTerm",
  page = 1,
) => {
  try {
    const { data } = await classNotesApi.get(
      `/courses_settings/?page=${page}&searchTerm=${searchTerm}`,
    );
    return data;
  } catch (error) {
    console.error(error);
    return error?.response?.data;
  }
};

// Función para manejar la edición de un curso
export const editCourseAsync = async (id, form) => {
  try {
    const { data } = await classNotesApi.put(`/courses/${id}`, form);
    return data;
  } catch (error) {
    console.error(error);
    return error?.response?.data;
  }
};

// Función para manejar la eliminación de un curso
export const deleteCourseAsync = async (courseId) => {
  try {
    const { data } = await classNotesApi.delete(`/courses/${courseId}`);
    return data;
  } catch (error) {
    console.error(error);
    return error?.response?.data;
  }
};

// Función para manejar la edición de un curso
export const editCourseLocationAsync = async (id, form) => {
  try {
    const { data } = await classNotesApi.put(`/courses/ubication/${id}`, form);
    return data;
  } catch (error) {
    console.error(error);
    return error?.response?.data;
  }
};
