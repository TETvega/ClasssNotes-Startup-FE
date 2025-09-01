export const PendingActivities = ({ pendingActivities }) => {
  return (
    <div className="col-span-4 text-center">
      <span
        className={
          pendingActivities > 0
            ? "rounded-md bg-red-400 px-2 py-1 text-xs font-bold text-red-800" // Estilo si hay actividades pendientes
            : "text-black" // Estilo si no hay actividades pendientes
        }
      >
        {pendingActivities}
      </span>
    </div>
  );
};
