export const CardStatisticsSkeleton = () => {
  return (
    <div className="min-w-[250px] flex-1 animate-pulse rounded-lg border border-gray-200 bg-white p-4 shadow-[0px_1px_4px_1px_rgba(0,_0,_0,_0.8)]">
      {/* Contenedor para el ícono y el título */}
      <div className="flex items-center gap-4">
        {/* Ícono */}
        <div className="h-12 w-12 rounded-full bg-gray-300"></div>
        {/* Título y Valor */}
        <div className="space-y-2">
          <div className="h-4 w-24 rounded bg-gray-300"></div>
          <div className="h-6 w-32 rounded bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};
