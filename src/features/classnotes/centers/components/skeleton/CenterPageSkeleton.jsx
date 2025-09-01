export const CenterPageSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Header */}
      <div className="mb-6 flex flex-wrap gap-4 sm:flex-row sm:items-start">
        {/* Grupo: Botón y Título */}
        <div className="flex items-center gap-4 sm:flex-row">
          <div className="h-20 w-20 rounded-lg bg-gray-300"></div>
          <div className="flex flex-col gap-2">
            <div className="h-10 w-48 rounded bg-gray-300"></div>
            <div className="h-6 w-40 rounded bg-gray-300"></div>
          </div>
        </div>

        {/* Cantidad de Centros */}
        <div className="w-full sm:w-auto">
          <div className="h-5 w-20 rounded-lg bg-gray-300"></div>
        </div>
      </div>

      {/* Buscar y Filtrar */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Buscador */}
        <div className="flex h-10 w-40 flex-1 rounded-lg bg-gray-200 sm:w-60"></div>

        {/* Filtro */}
        <div className="h-10 w-32 rounded-lg bg-gray-200"></div>

        {/* Botón Crear */}
        <div className="h-10 w-32 rounded-lg bg-gray-300"></div>
      </div>
    </div>
  );
};
