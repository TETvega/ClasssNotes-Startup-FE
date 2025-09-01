import { classNotesApi } from "../../config/classNotesApi";

// Función para obtener el dashboard de un centro educativo
export const getDashboardCenter = async (
  centerId,
  searchTerm = "searchTerm",
  page = 1,
  pageSize = 12,
  classType = "ACTIVE",
) => {
  try {
    const { data } = await classNotesApi.get(
      `/centers/info/${centerId}?searchTerm=${searchTerm}&page=${page}&pageSize=${pageSize}&classType=${classType}`,
    );
    return data;
  } catch (error) {
    console.error(error);
    return error?.response?.data;
  }
};

// Función para obtener un centro educativo específico
export const getCenterById = async (centerId) => {
  try {
    const { data } = await classNotesApi.get(`/centers/${centerId}`);

    return data;
  } catch (error) {
    console.error(error);
    return error?.response?.data;
  }
};

// Función para obtener todos los centros educativos
export const getCentersList = async (
  searchTerm = "searchTerm",
  page = 1,
  pageSize = 6,
  isArchived = null,
) => {
  try {
    // Enviar una solicitud GET al endpoint para recibir los centros
    let url = `/centers/?page=${page}&searchTerm=${searchTerm}&pageSize=${pageSize}`;
    if (isArchived !== null) {
      url += `&isArchived=${isArchived}`;
    }

    const { data } = await classNotesApi.get(url);

    // Devolver los datos de la respuesta
    return data;
  } catch (error) {
    // Registrar cualquier error en la consola
    console.error(error);
    // Devolver los datos de la respuesta de error si están disponibles
    return error?.response?.data;
  }
};

// Función para archivar los centros educativos
export const toggleCenterArchive = async (id, newState) => {
  try {
    const response = await classNotesApi.put(`/centers/archive/${id}`, {
      isArchived: newState,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Función para desarchivar los centros educativos
export const toggleCenterRecover = async (id, newState) => {
  try {
    const response = await classNotesApi.put(`/centers/recover/${id}`, {
      isArchived: newState,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Función para crear un nuevo centro educativo
export const createCenterAsync = async (formValues) => {
  try {
    const formData = new FormData();
    formData.append("Name", formValues.name);
    if (formValues.abbreviation) {
      formData.append("Abbreviation", formValues.abbreviation);
    }
    if (formValues.imageFile) {
      formData.append("image", formValues.imageFile);
    }

    //* Sobreescribe el header (Content-Type) para hacer la solicitud específica sin modificar la configuración global
    const { data } = await classNotesApi.post("/centers", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    // Registrar cualquier error en la consola
    console.error(error);
    // Devolver los datos de la respuesta de error si están disponibles
    return error?.response?.data;
  }
};

// Función para editar un centro educativo
export const editCenterAsync = async (id, changedImage = true, formValues) => {
  try {
    const formData = new FormData();
    formData.append("Name", formValues.name);
    if (formValues.abbreviation) {
      formData.append("Abbreviation", formValues.abbreviation);
    }
    if (changedImage && formValues.imageFile) {
      formData.append("image", formValues.imageFile);
    }

    // Enviar una solicitud PUT al endpoint de editar centros con los datos del formulario
    const { data } = await classNotesApi.put(
      `/centers/${id}?changedImage=${changedImage}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    // Devolver los datos de la respuesta
    return data;
  } catch (error) {
    // Registrar cualquier error en la consola
    console.error(error);
    // Devolver los datos de la respuesta de error si están disponibles
    return error?.response?.data;
  }
};

// Fución para eliminar un centro educativo
export const deleteCenterAsync = async (id, confirmation = true) => {
  try {
    // Enviar una solicitud DETELE al endpoint de eliminar centro
    const { data } = await classNotesApi.delete(
      `/centers/${id}?confirmation=${confirmation}`,
    );

    // Devolver los datos de la respuesta
    return data;
  } catch (error) {
    // Registrar cualquier error en la consola
    console.error(error);
    // Devolver los datos de la respuesta de error si están disponibles
    return error?.response?.data;
  }
};
