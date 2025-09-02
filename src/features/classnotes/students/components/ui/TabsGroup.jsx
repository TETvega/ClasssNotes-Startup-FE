import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Fragment } from "react";
import { formatDate } from "../../../../../shared/utils";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  Edit,
  MoreVertical,
} from "lucide-react";

export const TabsGroup = ({
  pendingActivities,
  gradedActivities,
  getActivityIcon,
}) => {
  return (
    <TabGroup>
      {/* Tabs "Por Calificar" & "Calificadas" */}
      <TabList className="flex space-x-1 rounded-xl bg-gray-100 p-1">
        <Tab as={Fragment}>
          {({ selected }) => (
            <button
              className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg py-2.5 text-sm leading-5 font-medium ${
                selected
                  ? "bg-white text-green-700 shadow"
                  : "text-gray-700 hover:bg-white/[0.12] hover:text-green-700"
              }`}
            >
              <AlertCircle className="size-4" />
              Por calificar
              <span className="ml-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                {pendingActivities.length}
              </span>
            </button>
          )}
        </Tab>
        <Tab as={Fragment}>
          {({ selected }) => (
            <button
              className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg py-2.5 text-sm leading-5 font-medium ${
                selected
                  ? "bg-white text-green-700 shadow"
                  : "text-gray-700 hover:bg-white/[0.12] hover:text-green-700"
              }`}
            >
              <CheckCircle className="size-4" />
              Calificadas
              <span className="ml-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                {gradedActivities.length}
              </span>
            </button>
          )}
        </Tab>
      </TabList>

      <TabPanels className="mt-4">
        {/* Actividades por Calificar */}
        <TabPanel className="rounded-xl">
          <div className="h-[350px] overflow-y-auto pr-2">
            {pendingActivities.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                No hay actividades pendientes por calificar
              </div>
            ) : (
              <div className="space-y-3">
                {pendingActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="overflow-hidden rounded-lg border border-l-4 border-gray-200 border-l-amber-500 shadow-sm"
                  >
                    <div className="p-4 pb-2">
                      <div className="flex justify-between">
                        <div className="flex items-start gap-2">
                          {getActivityIcon(activity.type)}
                          <h4 className="text-base font-medium text-gray-900">
                            {activity.title}
                          </h4>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            className="flex h-8 items-center gap-1 rounded border border-gray-300 bg-white px-3 text-sm hover:bg-gray-50"
                          >
                            <Edit className="h-3.5 w-3.5" />
                            Calificar
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 pt-0">
                      <div className="mb-2 text-sm text-gray-500">
                        {activity.description}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="size-3" />
                          <span>
                            Fecha límite: {formatDate(activity.dueDate)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="size-3" />
                          <span>Valor: {activity.maxScore} pts</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabPanel>

        {/* Actividades Calificadas */}
        <TabPanel className="rounded-xl">
          <div className="h-[350px] overflow-y-auto pr-2">
            {gradedActivities.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                No hay actividades calificadas
              </div>
            ) : (
              <div className="space-y-3">
                {gradedActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="overflow-hidden rounded-lg border border-l-4 border-gray-200 border-l-green-500 shadow-sm"
                  >
                    <div className="p-4 pb-2">
                      <div className="flex justify-between">
                        <div className="flex items-start gap-2">
                          {getActivityIcon(activity.type)}
                          <h4 className="text-base font-medium text-gray-900">
                            {activity.title}
                          </h4>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="rounded-full border border-green-200 bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                            {activity.score}/{activity.maxScore}
                          </div>
                          <div className="relative">
                            <button
                              type="button"
                              className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                            >
                              <MoreVertical className="size-4" />
                            </button>
                            {/* Dropdown menu would go here */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 pt-0">
                      <div className="mb-2 text-sm text-gray-500">
                        {activity.description}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="size-3" />
                          {/* <span>Calificado: {formatDate(activity.dueDate)}</span> */}
                          <span>Calificado: {activity.dueDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="size-3" />
                          <span>Valor: {activity.maxScore} pts</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
};
