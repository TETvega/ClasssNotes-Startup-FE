export const ProgressBard = ({ percentage }) => {
  return (
    <div className="mb-4 h-2.5 w-full rounded-full bg-gray-200">
      {/* Barra que muestra el porcentaje según las actividades */}
      <div
        className="h-2.5 rounded-full bg-green-900"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};
