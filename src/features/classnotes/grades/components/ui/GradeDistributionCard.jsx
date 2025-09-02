export const GradeDistributionCard = ({ title, data }) => {
  return (
    <div className="flex h-full flex-col rounded-lg bg-white p-6 shadow-[0px_1px_4px_1px_rgba(0,_0,_0,_0.8)]">
      {/* Título */}
      <div className="mb-6 px-2 py-1 text-xl font-bold text-gray-800">
        {title}
      </div>

      {/* Lista de distribuciones */}
      <div className="flex flex-grow flex-col gap-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            {/* Nombre de la categoría con ancho fijo */}
            <span className="text-inactive-primary-text w-25 px-2 pb-1 text-lg font-medium">
              {item.label}
            </span>

            {/* Barra de progreso */}
            <div className="relative flex h-4 flex-grow overflow-hidden rounded-full bg-gray-200">
              <div
                className={`h-full rounded-full`}
                style={{
                  width: `${item.percentage}%`,
                  backgroundColor: item.color,
                }}
              ></div>
            </div>

            {/* Porcentaje */}
            <span className="text-inactive-primary-text px-2 text-sm font-medium">
              {Number(item.percentage).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
