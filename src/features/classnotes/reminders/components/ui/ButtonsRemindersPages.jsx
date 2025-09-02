export const ButtonsRemindersPages = ({
  activeButton,
  onPendientesClick,
  onHistorialClick,
}) => {
  return (
    <div className="flex gap-2">
      {/* Botón Pendientes */}
      <button
        onClick={onPendientesClick}
        className={`rounded-md px-4 py-1 text-xs font-bold transition-colors duration-200 ${
          activeButton === "Pendientes"
            ? "cursor-pointer border border-gray-600 bg-white text-black hover:bg-gray-200"
            : "cursor-pointer border-none bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        }`}
      >
        Pendientes
      </button>

      {/* Botón Historial */}
      <button
        onClick={onHistorialClick}
        className={`rounded-md px-4 py-1 text-xs font-bold transition-colors duration-200 ${
          activeButton === "Historial"
            ? "cursor-pointer border border-gray-600 bg-white text-black hover:bg-gray-200"
            : "cursor-pointer border-none bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        }`}
      >
        Historial
      </button>
    </div>
  );
};
