import { TbFilter } from "react-icons/tb";
import { useState } from "react";
import BrutalSearchBar from "../../../../shared/components/ui/BrutalSearchBar";
import { MoreActions } from "../../../../shared/components";

export const StudentsFilters = ({
  handleSearch,
  handleFilterByStudentsState,
  handleFilterByActivitiesState,
  studentType,
  activityType,
}) => {
  const [setShowingByActivities] = useState("Todas");
  const [setShowingByState] = useState("Activos");

  const activityLabels = {
    ALL: "Todas",
    PENDIENTES: "Pendientes",
    DONE: "Completadas",
  };

  const stateLabels = {
    ALL: "Todos",
    ACTIVE: "Activos",
    INACTIVE: "Inactivos",
  };

  return (
    <div className="flex w-full flex-col justify-between gap-4 md:flex-row">
      <BrutalSearchBar
        onSearch={handleSearch}
        placeholder="Buscar estudiante..."
      />
      <div className="flex w-auto gap-2 max-[760px]:flex-wrap lg:gap-4">
        <span className="relative w-full md:w-auto">
          <MoreActions
            actions={[
              {
                label: "Todos",
                onClick: () => {
                  handleFilterByStudentsState("ALL");
                  setShowingByState("Todos");
                },
              },
              {
                label: "Activos",
                onClick: () => {
                  handleFilterByStudentsState("ACTIVE");
                  setShowingByState("Activos");
                },
              },
              {
                label: "Inactivos",
                onClick: () => {
                  handleFilterByStudentsState("INACTIVE");
                  setShowingByState("Inactivos");
                },
              },
            ]}
            trigger={
              <button className="hover:curry-pointer flex h-10 w-full items-center justify-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors hover:border-gray-500 hover:bg-gray-100/50">
                <TbFilter />
                Estado: {stateLabels[studentType]}
              </button>
            }
          />
        </span>
        <span className="relative w-full md:w-auto">
          <MoreActions
            actions={[
              {
                label: "Todas",
                onClick: () => {
                  handleFilterByActivitiesState("all");
                  setShowingByActivities("Todas");
                },
              },
              {
                label: "Pendientes",
                onClick: () => {
                  handleFilterByActivitiesState("pending");
                  setShowingByActivities("Pendientes");
                },
              },
              {
                label: "Completadas",
                onClick: () => {
                  handleFilterByActivitiesState("completed");
                  setShowingByActivities("Completadas");
                },
              },
            ]}
            trigger={
              <button className="flex h-10 w-full items-center justify-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors hover:cursor-pointer hover:border-gray-500 hover:bg-gray-100/50">
                <TbFilter />
                Actividades: {activityLabels[activityType]}
              </button>
            }
          />
        </span>
      </div>
    </div>
  );
};
