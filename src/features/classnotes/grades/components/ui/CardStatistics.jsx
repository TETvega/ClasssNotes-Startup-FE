export const CardStatistics = ({ label, value, iconColor, iconName }) => {
  return (
    <div className="min-w-[250px] flex-1 rounded-lg border border-gray-200 bg-white p-4 shadow-[0px_1px_4px_1px_rgba(0,_0,_0,_0.8)]">
      {/* Contenedor para el ícono y el título */}
      <div className="flex items-center gap-4">
        {/* Ícono */}
        <span className={`text-white bg-${iconColor} rounded-full p-3`}>
          {iconName}
        </span>
        {/* Título y Valor */}
        <div>
          <p className="text-inactive-primary-text text-sm">{label}</p>
          <div className="text-2xl font-bold">{value}</div>
        </div>
      </div>
    </div>
  );
};
