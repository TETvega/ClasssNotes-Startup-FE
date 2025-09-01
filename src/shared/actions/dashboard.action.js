import { classNotesApi } from "../../config";

// Función para manejar los datos del dashboard
export const dashboardAsync = async () => {
  try {
    const { data } = await classNotesApi.get("/dashboard_home/info");
    return data;
  } catch (error) {
    console.error(error);
    return error?.response?.data;
  }
};
