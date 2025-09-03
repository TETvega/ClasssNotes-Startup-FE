import { classNotesApi } from "../../config/classNotesApi";

// Función para obtener las estadisticas del historial de asistencias de un curso
export const getHistoryCourseStatsAsync = async (courseId) => {
  try {
    // Enviar una solicitud GET al endpoint de obtener estadisticas de un curso
    const { data } = await classNotesApi.get(
      `/attendances/course_stats/${courseId}`,
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

// Función para obtener las estadisticas del historial de asistencias de un estudiante
export const getHistoryStudentStatsAsync = async (
  courseId,
  searchTerm = "searchTerm",
  page = 1,
  pageSize = 13,
) => {
  try {
    // Enviar una solicitud GET al endpoint de obtener estadisticas de un estudiante
    const { data } = await classNotesApi.get(
      `/attendances/course_students/${courseId}?searchTerm=${searchTerm}&page=${page}&pageSize=${pageSize}`,
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

// Función para obtener las fechas de asistencia de un estudiante
export const getStudentAttendancesDateAsync = async ({
  studentId,
  courseId,
  searchTerm = "",
  page = 1,
  pageSize = 10,
  isCurrentMonth,
}) => {
  try {
    // Enviar una solicitud POST al endpoint de obtener la fecha de asistencia de un estudiante
    const { data } = await classNotesApi.post(
      `/attendances/student_attendances?page=${page}&pageSize=${pageSize}&isCurrentMonth=${isCurrentMonth}&searchTerm=${searchTerm}`,
      {
        studentId,
        courseId,
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

// Función para obtener las estadisticas de asistencia de un estudiante
export const getStudetAttendanceStatsAsync = async ({
  studentId,
  courseId,
  isCurrentMonth = false,
}) => {
  try {
    // Enviar una solicitud POST al endpoint de obtener estadisticas de asistencia de un estudiante
    const { data } = await classNotesApi.post(
      `/attendances/student_stats?isCurrentMonth=${isCurrentMonth}`,
      {
        studentId,
        courseId,
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

export const takeAttendance = async (body) => {
  try {
    const { data } = await classNotesApi.post(
      `attendancesR/send_attendanceR`,
      body,
    );
    return data;
  } catch (error) {
    console.error(error);
    return error?.response?.data;
  }
};

export const getStudentsStats = async (courseId) => {
  try {
    const { data } = await classNotesApi.get(
      `attendancesR/attendances_status_today/${courseId}`,
    );
    return data;
  } catch (error) {
    console.error(error);
    return error?.response?.data;
  }
};
