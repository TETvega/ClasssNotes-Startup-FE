export const CountingCard = ({ label, value, pendingActivities = null }) => {
  return (
    <div className="min-w-[250px] flex-1 flex-col rounded-lg border border-gray-200 bg-white p-5 shadow-[0px_1px_4px_1px_rgba(0,_0,_0,_0.8)] sm:p-3 md:p-4">
      <div className="text-text-active-primary text-xl sm:text-base md:text-lg">
        {label}
      </div>
      <div
        className={
          `text-3xl font-bold sm:text-xl md:text-2xl ${!pendingActivities ? "text-text-active-primary" : pendingActivities == 0 && pendingActivities != null ? "text-white" : pendingActivities > 0 && pendingActivities < 7 ? "text-yellow-400" : "text-red-400"}`
          // si el pending es null entonces el color sera el por defecto, si no viene null se evalua su valor, si es 0 se debe mostrar en blanco, si esta entre 1 o 6 se mostrará en amarillo, si es mayor que 6 se mostrará en rojo
        }
      >
        {value}
      </div>
    </div>
  );
};
