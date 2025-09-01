import { classNotesApi } from "../../config/classNotesApi";

// Para mostrar solo los estudiantes del curso actual
export const getStudentsCourseAsync = async (
  courseId,
  searchTerm = "",
  page = 1,
  pageSize = 5,
  studentType = "ALL",
  activityType = "ALL",
) => {
  try {
    let url = `/students/pendingsList/${courseId}?page=${page}&pageSize=${pageSize}&searchTerm=${searchTerm}&StudentType=${studentType}&ActivityType=${activityType}`;
    const { data } = await classNotesApi.get(url);
    return data;
  } catch (error) {
    console.error("Error al cargar estudiantes:", error);
    return (
      error?.response?.data || {
        status: false,
        message: "Error al cargar estudiantes",
      }
    );
  }
};

// Para borrar uno o mas estudiantes
export const deleteStudentsAsync = async (courseId, studentIds) => {
  try {
    const url = `/students/batch/${courseId}`;
    const { data } = await classNotesApi.delete(url, { data: studentIds });
    return { status: true, data };
  } catch (error) {
    console.error("Error al eliminar estudiantes:", error);
    return {
      status: false,
      message: error?.response?.data?.title || "Error al eliminar estudiantes",
      errors: error?.response?.data?.errors || {},
    };
  }
};

// Función para obtener las actividades pendientes y el curso de los estudiantes
export const getStudentPendingActivitiesCourses = async (id, top) => {
  try {
    // Enviar una solicitud GET al endpoint de obtener actividades pendientes de un estudiante
    const { data } = await classNotesApi.get(`/students/pendings/${id}`, {
      params: { top },
    });

    // Devolver los datos de la respuesta
    return data;
  } catch (error) {
    // Registrar cualquier error en la consola
    console.error(error);
    // Devolver los datos de la respuesta de error si están disponibles
    return error?.response?.data;
  }
};

// Actualizar información de un estudiante
export const updateStudentAsync = async (studentId, data) => {
  try {
    const url = `/students/${studentId}`;
    const { data: responseData } = await classNotesApi.put(url, data);
    return { status: true, data: responseData };
  } catch (error) {
    console.error("Error al actualizar estudiante:", error);
    return (
      error?.response?.data || {
        status: false,
        message: "Error al actualizar estudiante",
      }
    );
  }
};

// Cambiar el estado (activar/desactivar) de uno o más estudiantes
export const changeStudentsStateAsync = async (courseId, studentIds) => {
  try {
    const url = `/students/change_state/${courseId}`;
    const { data } = await classNotesApi.put(url, studentIds);
    return { status: true, data };
  } catch (error) {
    console.error("Error al cambiar el estado de los estudiantes:", error);
    return {
      status: false,
      message:
        error?.response?.data?.title ||
        "Error al cambiar el estado de los estudiantes",
      errors: error?.response?.data?.errors || {},
    };
  }
};

// Crear uno o varios estudiantes de forma manual
export const createStudentsBulkAsync = async (data) => {
  try {
    const url = `/students/bulk-create`;
    const { data: responseData } = await classNotesApi.post(url, data);
    return { status: true, data: responseData };
  } catch (error) {
    console.error("Error al crear estudiantes:", error);
    return {
      status: false,
      message: error?.response?.data?.title || "Error al crear estudiantes",
      errors: error?.response?.data?.errors || {},
    };
  }
};

// Importar estudiantes desde un Excel
export const createStudentsFromExcelAsync = async (
  courseId,
  file,
  strictMode,
) => {
  try {
    const url = `/students/create-from-excel/${courseId}?strictMode=${strictMode}`;
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await classNotesApi.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return { status: true, data };
  } catch (error) {
    return {
      status: false,
      message:
        error?.response?.data?.message ||
        "Error al importar estudiantes desde Excel",
      errors: error?.response?.data?.errors || {},
    };
  }
};

// Las siguientes dos funciones son para las actividades pendientes de un estudiante en una clase
export const getStudentInfoAsync = async (courseId, studentId) => {
  try {
    const url = `/activities/student-info?courseId=${courseId}&studentId=${studentId}`;
    const { data } = await classNotesApi.get(url);
    return data;
  } catch (error) {
    console.error("Error al cargar información del estudiante:", error);
    return {
      status: false,
      message:
        error?.response?.data?.message ||
        "Error al cargar información del estudiante",
      errors: error?.response?.data?.errors || {},
    };
  }
};

export const getStudentPendingActivitiesAsync = async ({
  courseId,
  studentId,
  page,
  pageSize,
}) => {
  try {
    const url = `/activities/student-pendings?page=${page}&courseId=${courseId}&studentId=${studentId}&pageSize=${pageSize}`;
    const { data } = await classNotesApi.get(url);
    return data;
  } catch (error) {
    console.error("Error al cargar actividades pendientes:", error);
    return {
      status: false,
      message:
        error?.response?.data?.message ||
        "Error al cargar actividades pendientes",
      errors: error?.response?.data?.errors || {},
    };
  }
};
