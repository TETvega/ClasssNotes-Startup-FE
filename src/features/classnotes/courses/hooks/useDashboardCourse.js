import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getDashboardCourse } from "../../../../shared/actions";

export const useDashboardCourse = (courseId) => {
  const navigate = useNavigate();

  // Query para obtener datos del dashboard
  const dashboardQuery = useQuery({
    queryKey: ["dashboard-course", courseId],
    queryFn: async () => {
      if (!courseId) return toast.error("ID del curso no proporcionado.");
      const toastId = toast.loading("Obteniendo dashboard...");
      const response = await getDashboardCourse(courseId);

      if (response?.statusCode === 404) {
        navigate("/not-found", { state: { message: "Curso no encontrado" } });
      }

      if (!response || !response.status) {
        toast.error("Ha ocurrido un error. Por favor, inténtelo más tarde.");
        toast.dismiss(toastId);
        throw new Error("Error al obtener datos del dashboard");
      }

      toast.dismiss(toastId);
      return response.data;
    },
    enabled: !!courseId,
    keepPreviousData: true, 
    refetchOnWindowFocus: false,
  });

  // Datos por defecto para evitar errores cuando los datos aún no están disponibles
  const defaultDashboardData = {
    studentsCount: 0,
    scoreEvaluated: 0,
    pendingActivitiesCount: 0,
    maxScoreEvaluated: 100,
    pendingNotesRemenbers: 0,
    activities: [],
    students: [],
  };

  return {
    dashboardData: dashboardQuery.data || defaultDashboardData,
    isLoading: dashboardQuery.isLoading,
    isError: dashboardQuery.isError,
    error: dashboardQuery.error,
    refetch: dashboardQuery.refetch,
    navigate,
  };
};
