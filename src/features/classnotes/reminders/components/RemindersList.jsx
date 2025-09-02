import { FiEye } from "react-icons/fi";
import { BiEditAlt } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoCheckmarkSharp } from "react-icons/io5";
import { NotFound } from "../../../../shared/components/ui";
import { MoreActions } from "../../../../shared/components";
import { formatDate } from "../../../../shared/utils";
import { ReminderListSkeleton } from "./skeleton";

const ReminderList = ({
  reminders,
  onToggleStatus,
  onViewReminder,
  onEditReminder,
  onDeleteReminder,
  variant,
  isLoading,
}) => {
  if (isLoading) {
    return <ReminderListSkeleton />;
  }

  if (reminders.length === 0) {
    return (
      <div className="h-96">
        <NotFound message="No se encontraron recordatorios" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reminders.map((reminder) => (
        <div
          key={reminder.id}
          className="bg-contrast-primary-bg rounded-md border border-gray-600 px-4 pt-4 pb-6"
        >
          <div className="flex items-center justify-between">
            <h3
              className={`font-bold ${
                variant === "pendientes"
                  ? "text-text-active-primary"
                  : "text-disabled-text"
              }`}
            >
              {reminder.title}
            </h3>
            <div className="relative flex items-center gap-2">
              {variant === "pendientes" && (
                <div className="flex items-center gap-2">
                  <span
                    className={`text-sm ${
                      reminder.status === "Visto"
                        ? "font-semibold text-green-500"
                        : "text-inactive-primary-text"
                    }`}
                  >
                    {reminder.status}
                  </span>
                  <button
                    onClick={() => onToggleStatus(reminder.id)}
                    className={`flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border ${
                      reminder.status === "Visto"
                        ? "border-green-500 bg-green-500 text-white"
                        : "text-inactive-primary-text border-gray-300 bg-white"
                    }`}
                  >
                    <IoCheckmarkSharp className="h-4 w-4" />
                  </button>
                </div>
              )}
              <MoreActions
                actions={[
                  {
                    icon: <FiEye />,
                    label: "Ver Recordatorio",
                    className: "text-gray-700",
                    onClick: () => onViewReminder(reminder),
                  },
                  ...(variant === "pendientes"
                    ? [
                        {
                          icon: <BiEditAlt />,
                          label: "Editar Recordatorio",
                          className: "text-gray-700",
                          onClick: () => onEditReminder(reminder),
                        },
                      ]
                    : []),
                  {
                    icon: <FaRegTrashAlt />,
                    label: "Eliminar Recordatorio",
                    className: "text-red-600",
                    onClick: () => onDeleteReminder(reminder),
                  },
                ]}
              />
            </div>
          </div>
          <p
            className={`text-sm ${
              variant === "pendientes"
                ? "text-inactive-primary-text"
                : "text-disabled-text"
            }`}
          >
            Fecha de notificación: {formatDate(reminder.useDate)}
          </p>
          <p
            className={`mt-4 text-sm ${
              variant === "pendientes"
                ? "text-text-active-primary"
                : "text-disabled-text"
            }`}
          >
            {reminder.content}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ReminderList;
