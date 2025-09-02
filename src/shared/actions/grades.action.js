import { classNotesApi } from "../../config/classNotesApi";

// Mostrar toda la información del dashboard
export const getGradesDashboard = async (
  courseId,
  {
    page = 1,
    pageSize = 10,
    activeStudent = "ACTIVE",
    includeStats = true,
    searchTerm = "",
  } = {},
) => {
  try {
    const params = new URLSearchParams({
      page,
      pageSize,
      activeStudent,
      includeStats,
      searchTerm,
    }).toString();

    const { data } = await classNotesApi.get(
      `/notes/student/dashboard/${courseId}?${params}`,
    );
    return data;
  } catch (error) {
    console.error("Error fetching grades dashboard:", error);
    return {
      message: error.response?.data?.title || error.message,
      errors: error.response?.data?.errors || {},
      status: false,
    };
  }
};

// Enviar correo con PDF a un estudiante específico
export const sendEmailToStudent = async ({ courseId, studentId, content }) => {
  try {
    const payload = {
      courseId,
      studentId,
      content,
    };

    const response = await classNotesApi.post("/emails/send-pdf", payload);

    return {
      status: true,
      message: "Correo enviado exitosamente",
      data: response.data,
    };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Error desconocido al enviar el correo";
    return {
      status: false,
      message: errorMessage,
      errors: error.response?.data?.errors || {},
    };
  }
};

// Enviar correo con PDF a todos los estudiantes
export const sendEmailToAllStudents = async ({ courseId, content }) => {
  try {
    const payload = {
      courseId,
      content,
    };

    const response = await classNotesApi.post(
      "/emails/send-pdf-to-all",
      payload,
    );

    return {
      status: true,
      message: "Correos enviados exitosamente",
      data: response.data,
    };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Error desconocido al enviar los correos";
    return {
      status: false,
      message: errorMessage,
      errors: error.response?.data?.errors || {},
    };
  }
};
