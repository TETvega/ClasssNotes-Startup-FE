import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDashboardHome } from "../hooks";
import { DashboardActivities, DashboardCenters, DashboardCourses, DashboardStudents, DashboardSummary } from "../components";
import FormBrutalButton from "../../../../shared/components/ui/FormBrutalButton";
import { TabTitle } from "../../../../shared/components";
import { titleTabs } from "../../../../shared/constants";
import { useTagsListStore } from "../../tags/store/useTagsListStore";

export const DashboardPage = () => {
  const { isLoading, total } = useDashboardHome();
  const navigate = useNavigate();
  const upcomingActivities = total?.upcomingActivities?.slice(0, 4) || [];

  // Cargar y guardar las tags del usuario en localstorage y estado global
  const { fetchTagsAndStore } = useTagsListStore();
  useEffect(() => {
    fetchTagsAndStore();
  }, [fetchTagsAndStore]);

  // Filtra las actividades pendientes (de mayo a menor) para mostrar solo aquellas con number > 0 y limita a 7 elementos
  // Si no hay actividades pendientes, se asigna un array vacío
  const pendingActivities =
    total?.pendingActivities
      ?.filter((activity) => activity.pendingActivitiesCount > 0)
      ?.sort((a, b) => b.pendingActivitiesCount - a.pendingActivitiesCount)
      ?.slice(0, 7) || [];
  const centers = total?.activeCenters?.slice(0, 3) || [];
  const activeCourses = total?.activeClasses.slice(0, 4) || [];
  const students =
    total?.studentPendingActivitiesList.sort(
      (a, b) => b.pendingsCount - a.pendingsCount,
    ) || [];

  return (
    <section className="flex-grow">
      <TabTitle title={titleTabs.DASHBOARD} />
      <div className="mb-6 flex flex-wrap items-center justify-between">
        <h1 className="w-full text-left text-3xl font-bold sm:w-auto">
          {isLoading ? (
            <div className="h-10 w-70 animate-pulse rounded-lg bg-gray-200"></div>
          ) : (
            "Bienvenido a tu Dashboard"
          )}
        </h1>
      </div>

      {/* Estadísticas Generales */}
      <DashboardSummary total={total?.stadistics} isLoading={isLoading} />

      {/* Actividades y Próximas Actividades */}
      <DashboardActivities
        upcomingActivities={upcomingActivities}
        pendingActivities={pendingActivities}
        isLoading={isLoading}
      />

      {/* Centros */}
      <div className="mt-8 flex flex-wrap items-center justify-between">
        <h2 className="w-auto text-left text-3xl font-bold">Centros</h2>
        {centers.length > 0 && (
          <div className="flex w-32 justify-center">
            <FormBrutalButton
              className="mt-4 mb-4"
              onClick={() => navigate("/centers")}
            >
              Ver Todos
            </FormBrutalButton>
          </div>
        )}
      </div>
      <DashboardCenters centers={centers} isLoading={isLoading} />

      {/* Cursos Activos */}
      <div className="mt-8 flex flex-wrap items-center justify-between">
        <h2 className="w-auto text-left text-3xl font-bold">Cursos</h2>
        {activeCourses.length > 0 && (
          <div className="flex w-32 justify-center">
            <FormBrutalButton
              className="mt-4 mb-4"
              onClick={() => navigate("/courses")}
            >
              Ver Todos
            </FormBrutalButton>
          </div>
        )}
      </div>
      <DashboardCourses activeCourses={activeCourses} isLoading={isLoading} />

      {/* Estudiantes */}
      <div className="mt-8 flex flex-wrap items-center justify-between">
        <h2 className="w-auto text-left text-3xl font-bold">Estudiantes</h2>
      </div>

      {/* Buscador y filtro */}
      <DashboardStudents students={students} isLoading={isLoading} />
    </section>
  );
};
