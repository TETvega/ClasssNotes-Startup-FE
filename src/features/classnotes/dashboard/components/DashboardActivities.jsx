import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { useBreadcrumbStore } from "../../../../shared/store/useBreadcrumbStore";
import { DashboardActivitiesSkeleton } from "./skeleton/DashboardActivitiesSkeleton";
import { NotFound } from "../../../../shared/components/ui/NotFound";
import FormBrutalButton from "../../../../shared/components/ui/FormBrutalButton";

export const DashboardActivities = ({
  upcomingActivities,
  pendingActivities,
  isLoading,
}) => {
  const { setCurrentCenter, setCurrentCourse } = useBreadcrumbStore();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  // Verifica si hay al menos un elemento con activities pendientes (number > 0)
  const hasActivities = pendingActivities.some(
    (activity) => activity.pendingActivitiesCount > 0,
  );

  const showChart = pendingActivities.length > 0 && hasActivities;
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let minWidth = 300; // Valor por defecto en pantallas pequeñas
  if (windowWidth > 1280) {
    minWidth = 500; // Para pantallas grandes
  }

  if (isLoading) return <DashboardActivitiesSkeleton />;

  const formatCenterObject = (activity) => {
    return {
      id: activity.centerId,
      name: activity.centerName,
      abb: activity.centerAbb,
    };
  };
  const formatCourseObject = (activity) => {
    return {
      id: activity.courseId,
      name: activity.courseName,
      code: activity.courseCode,
    };
  };

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {/* Actividades no Evaluadas */}
      <div className="rounded-lg border bg-white p-4 shadow-xl">
        <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">
          Actividades no Evaluadas
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Número de actividades pendientes por clase
        </p>
        <div className="mt-3 flex min-h-[352px] items-center justify-center rounded-lg">
          <div className="flex h-full w-full items-center justify-center">
            {showChart ? (
              <ResponsiveContainer
                width="100%"
                height="100%"
                minHeight={352}
                minWidth={minWidth}
              >
                <BarChart
                  data={pendingActivities}
                  margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
                >
                  <XAxis
                    dataKey="pendingActivitiesCount"
                    tickLine={false}
                    axisLine={{ stroke: "#ccc" }}
                    interval={0}
                  />
                  <Tooltip
                    content={({ payload }) => {
                      if (payload && payload.length) {
                        const { courseName, pendingActivitiesCount } =
                          payload[0].payload;
                        return (
                          <div className="rounded bg-gray-100 p-2 text-sm shadow-lg">
                            <p className="text-action-start font-bold">
                              {courseName}
                            </p>
                            <p className="font-semibold text-gray-600">
                              Actividades Pendientes: {pendingActivitiesCount}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar
                    dataKey="pendingActivitiesCount"
                    fill="#198f3d"
                    barSize={50}
                    radius={[5, 5, 0, 0]}
                  ></Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center">
                <NotFound message="No hay actividades pendientes en ninguna clase." />
              </div>
            )}
          </div>
        </div>
        {showChart && (
          <div className="flex justify-center">
            <div className="w-32">
              <FormBrutalButton
                className="my-4"
                onClick={() => navigate("/activities")}
              >
                Ver Todos
              </FormBrutalButton>
            </div>
          </div>
        )}
      </div>

      {/* Próximas Actividades */}
      <div className="rounded-lg border bg-white p-4 shadow-xl">
        <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">
          Próximas Actividades
        </h2>
        <p className="mt-1 text-sm text-gray-600">Eventos y tareas próximas</p>

        {/* Verificar si hay actividades */}
        {upcomingActivities.length > 0 ? (
          <ul className="mt-3 space-y-2">
            {upcomingActivities.map((actividad) => (
              <li
                key={actividad.activityId}
                // onClick={() => navigate(`/activities/${actividad.activityId}/grade`)}
                onClick={() => {
                  if (actividad.courseId && actividad.centerId) {
                    navigate(`/activities/${actividad.activityId}/grade`);
                    setCurrentCourse(formatCourseObject(actividad));
                    setCurrentCenter(formatCenterObject(actividad));
                  } else {
                    console.error("Datos del curso incompletos");
                  }
                }}
                className={`cursor-pointer rounded-lg border bg-gray-100 px-3 py-2 transition-opacity duration-500 hover:bg-gray-200`}
              >
                <p className="text-sm font-semibold text-gray-800 sm:text-base">
                  {actividad.activityName || "Dato no disponible"}
                </p>
                <p className="text-xs text-gray-600 sm:text-sm">
                  {actividad.courseName || "Dato no disponible"}
                </p>
                <p className="text-xs text-gray-500 sm:text-sm">
                  {new Date(actividad.qualificationDate).toLocaleString() ||
                    "Dato no disponible"}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-center text-sm text-gray-500 sm:text-base">
            No hay actividades por el momento.
          </p>
        )}
        {upcomingActivities.length > 0 && (
          <div className="flex justify-center">
            <div className="w-32">
              <FormBrutalButton
                className="my-4"
                onClick={() => navigate("/activities")}
              >
                Ver Todos
              </FormBrutalButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
