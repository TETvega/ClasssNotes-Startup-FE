export const GradeDistributionCardSkeleton = () => {
  return (
    <div className="flex h-full animate-pulse flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-[0px_1px_4px_1px_rgba(0,_0,_0,_0.8)]">
      {/* Título */}
      <div className="mb-6 h-6 w-48 rounded bg-gray-300"></div>

      {/* Lista de distribuciones */}
      <div className="flex flex-grow flex-col gap-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex items-center gap-4 py-2">
            {/* Nombre de la categoría */}
            <div className="h-4 w-24 rounded bg-gray-300"></div>

            {/* Barra de progreso */}
            <div className="h-4 flex-grow rounded-full bg-gray-300"></div>

            {/* Porcentaje */}
            <div className="h-4 w-12 rounded bg-gray-300"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
