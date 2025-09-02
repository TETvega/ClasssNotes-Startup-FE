import { classNotesApi } from "../../config/classNotesApi";

// Endpoint para obtener todas las actividades
export const getAllActivities = async (
  searchTerm = "",
  page = 1,
  typeActivities = "ALL",
  centerId = "",
  tagActivityId = "",
  pageSize = 6,
) => {
  try {
    const { data } = await classNotesApi.get(
      `/activities?searchTerm=${searchTerm}&page=${page}&typeActivities=${typeActivities}&centerID=${centerId}&tagActivityId=${tagActivityId}&pageSize=${pageSize}`,
    );
    return data;
  } catch (error) {
    console.error(error);
    return error?.response?.data;
  }
};

// Endpoint para obtener todas las actividades de un curso
export const getAllActivitiesCourse = async (
  courseId,
  searchTerm = "",
  page = 1,
  typeActivities = "ALL",
  isExtraFilter = "ALL",
  unitId = "",
  tagActivityId = "",
  pageSize = 6,
) => {
  try {
    const { data } = await classNotesApi.get(
      `/activities/course/${courseId}?searchTerm=${searchTerm}&page=${page}&pageSize=${pageSize}&isExtraFilter=${isExtraFilter}&typeActivities=${typeActivities}&unitId=${unitId}&tagActivityId=${tagActivityId}`,
    );
    return data;
  } catch (error) {
    console.error(error);
    return error?.response?.data;
  }
};

// Endpoint para obtener una actividad
export const getActivityById = async (activityId) => {
  try {
    const { data } = await classNotesApi.get(`/activities/${activityId}`);
    return data;
  } catch (error) {
    console.error(error);
    return error?.response?.data;
  }
};

// Endpoint para crear una actividad
export const createActivity = async (activity) => {
  try {
    const { data } = await classNotesApi.post("/activities", activity);
    return data;
  } catch (error) {
    console.error(error);
    return error?.response?.data;
  }
};

// Endpoint para editar una actividad
export const editActivity = async (activityId, activity) => {
  try {
    const { data } = await classNotesApi.put(
      `/activities/${activityId}`,
      activity,
    );
    return data;
  } catch (error) {
    console.error(error);
    return error?.response?.data;
  }
};

// Endpoint para eliminar una actividad
export const deleteActivity = async (activityId) => {
  try {
    const { data } = await classNotesApi.delete(`/activities/${activityId}`);
    return data;
  } catch (error) {
    console.error(error);
    return error?.response?.data;
  }
};

// Endpoint para obtener los estudiantes y sus notas de una actividad
export const getStudentsScores = async (
  activityId,
  searchTerm = "",
  pageSize = 6,
  page = 1,
) => {
  try {
    const { data } = await classNotesApi.get(
      `/activities/students_scores/${activityId}?searchTerm=${searchTerm}&pageSize=${pageSize}&page=${page}`,
    );
    return data;
  } catch (error) {
    console.error(error);
    return error?.response?.data;
  }
};

// Endpoint para calificar todos los estudiantes de una actividad
export const reviewActivity = async (activityId, grades) => {
  try {
    const { data } = await classNotesApi.post(
      `/activities/review/${activityId}`,
      grades,
    );
    return data;
  } catch (error) {
    console.error(error);
    return error?.response?.data;
  }
};
