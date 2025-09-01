import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlusCircle, FaUniversity, FaUsers } from "react-icons/fa";
import { RiBook2Fill } from "react-icons/ri";
import { useBreadcrumbStore } from "../../../../shared/store/useBreadcrumbStore";
import { DashboardCentersSkeleton } from "./skeleton";
import FormBrutalButton from "../../../../shared/components/ui/FormBrutalButton";

export const DashboardCenters = ({ centers, isLoading }) => {
  const navigate = useNavigate();
  const [setIsModalOpen] = useState(false);
  const { setCurrentCenter } = useBreadcrumbStore();

  if (isLoading) return <DashboardCentersSkeleton />;

  const formatCenterObject = (center) => {
    return {
      id: center.centerId,
      name: center.centerName,
      abb: center.centerAbb,
    };
  };

  return (
    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {centers.map((center) => (
        <div
          key={center.centerId}
          className="flex flex-col overflow-hidden rounded-lg border bg-white p-4 shadow-xl"
        >
          {/* Contenedor del logo y texto alineado a la izquierda */}
          <div className="flex items-center justify-center gap-4">
            {/* Contenedor fijo y circular del logo */}
            <div className="flex h-20 w-30 items-center justify-center overflow-hidden rounded-full border bg-white md:w-35 xl:w-28 2xl:w-28">
              {center.logoUrl ? (
                <img
                  className="h-20 w-20 object-cover"
                  src={
                    center.logoUrl ||
                    "https://us.123rf.com/450wm/samdesigns/samdesigns2101/samdesigns210100127/162233690-escuela-edificio-imagen-de-vector-de-icono-de-educaci%C3%B3n-tambi%C3%A9n-se-puede-utilizar-para-la.jpg"
                  }
                  alt={center.name}
                />
              ) : (
                <FaUniversity size={50} />
              )}
            </div>
            {/* Información de la universidad */}
            <div className="flex w-full min-w-0 flex-col">
              <h3 className="truncate text-xl font-bold">{center.centerAbb}</h3>
              <p className="truncate text-sm text-gray-600">
                {center.centerName}
              </p>
            </div>
          </div>

          <div className="mt-3 w-full">
            {/* Contenedor flexible para las tarjetas */}
            <div className="flex flex-col space-y-2 md:items-stretch lg:flex-row lg:space-y-0 lg:space-x-2">
              {/* Tarjeta 1 */}
              <div className="flex w-full items-center gap-2 rounded-2xl bg-gray-200 px-4 py-2 md:h-full">
                <RiBook2Fill className="text-font-subtitles-dark h-7 w-7 flex-shrink-0" />
                <div className="flex flex-col overflow-hidden text-left">
                  <span className="text-sm">Clases</span>
                  <span className="font-bold">{center.activeClasesCount}</span>
                </div>
              </div>

              {/* Tarjeta 2 */}
              <div className="flex w-full items-center gap-2 rounded-2xl bg-gray-200 px-4 py-2 md:h-full">
                <FaUsers className="text-font-title-dark h-7 w-7 flex-shrink-0" />
                <div className="flex flex-col overflow-hidden text-left">
                  <span className="text-sm">Estudiantes</span>
                  <span className="font-bold">
                    {center.activeStudentsCount}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-center">
            <div className="w-32">
              <FormBrutalButton
                onClick={() => {
                  setCurrentCenter(formatCenterObject(center));
                  navigate(`/centers/${center.centerId}/courses`);
                }}
              >
                Ver Centro
              </FormBrutalButton>
            </div>
          </div>
        </div>
      ))}

      {/* Bloque para agregar centro si hay menos de 3 */}
      {centers.length < 3 && (
        //! Vuelve a su estado original con Link, y se agrega la ruta de centers
        <Link
          to={"/centers"}
          onClick={() => setIsModalOpen(true)}
          className="flex h-full min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border bg-white p-6 text-gray-500 shadow-xl"
        >
          <FaPlusCircle size={80} className="mb-2 text-green-700" />
          <p className="text-center text-xl font-medium">
            Agrega un centro educativo para comenzar
          </p>
        </Link>
      )}
    </div>
  );
};
