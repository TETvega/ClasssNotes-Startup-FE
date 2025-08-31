import { classNotesApi } from "../../../config/classNotesApi";

// Endpoint para obtener todas las tags
export const getTagsList = async () => {
  try {
    const { data } = await classNotesApi.get(`/tags_activities`);
    return data;
  } catch (error) {
    console.error(error);
    return error?.response?.data;
  }
};

// Endpoint para crear una tag
export const createTag = async (tag) => {
  try {
    const { data } = await classNotesApi.post("/tags_activities", tag);
    return data;
  } catch (error) {
    console.error(error);
    return error?.response?.data;
  }
};

// Endpoint para editar una tag
export const editTag = async (tag) => {
  try {
    const { data } = await classNotesApi.put(`/tags_activities/${tag.id}`, tag);
    return data;
  } catch (error) {
    console.error(error);
    return error?.response?.data;
  }
};

// Endpoint para eliminar tags
export const deleteTags = async (tags) => {
  try {
    const { data } = await classNotesApi.post(`/tags_activities/delete`, tags);
    return data;
  } catch (error) {
    console.error(error);
    return error?.response?.data;
  }
};
