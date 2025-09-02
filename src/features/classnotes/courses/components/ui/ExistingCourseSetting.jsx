import { useState } from "react";
import BrutalButton from "../../../../../shared/components/ui/BrutalButton";
import { useGetCourseSetting } from "../../hooks";

export const ConfiguracionExistenteCurso = ({
  setConfigSeleccionada,
  activeTab,
}) => {
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [configSeleccionada, setConfigLocal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  const { configuraciones, loading, error } = useGetCourseSetting();

  const totalPages = Math.ceil(configuraciones.length / pageSize);
  const currentData = configuraciones.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const handleSeleccionarConfiguracion = (config) => {
    setConfigLocal(config);
    setConfigSeleccionada(config);
    setIsSelectModalOpen(false);
  };

  if (loading) return <p>Cargando configuraciones...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {configSeleccionada && (
        <div className="mb-4 rounded border p-4 shadow">
          <p className="text-lg font-semibold">Configuración seleccionada:</p>
          <p>
            <strong>Título:</strong> {configSeleccionada.title}
          </p>
          <p>
            <strong>Contenido:</strong> {configSeleccionada.content}
          </p>
          <p>
            <strong>Fecha de Registro:</strong>{" "}
            {new Date(configSeleccionada.registrationDate).toLocaleString()}
          </p>
          <p>
            <strong>Fecha de Uso:</strong>{" "}
            {new Date(configSeleccionada.useDate).toLocaleString()}
          </p>
        </div>
      )}
      {activeTab === "existente" && (
        <div className="flex justify-end">
          <div className="w-50">
            <BrutalButton
              onClick={() => setIsSelectModalOpen(true)}
              className="h-10"
            >
              Seleccionar configuración existente
            </BrutalButton>
          </div>
        </div>
      )}
      {/* Paginacion elegir Configuracion */}
      {isSelectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-bold">
              Seleccionar configuración
            </h2>
            <ul>
              {currentData.map((config) => (
                <li
                  key={config.id}
                  className="mb-2 cursor-pointer rounded bg-gray-100 p-2 hover:bg-gray-200"
                  onClick={() => handleSeleccionarConfiguracion(config)}
                >
                  {config.title}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between gap-4 px-2">
              <div className="w-50">
                <BrutalButton
                  variant="secondary"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  Anterior
                </BrutalButton>
              </div>

              <span className="text-center text-sm">
                Página {currentPage} de {totalPages}
              </span>
              <div className="w-50">
                <BrutalButton
                  variant="secondary"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  Siguiente
                </BrutalButton>
              </div>
            </div>
            <BrutalButton
              variant="secondary"
              onClick={() => setIsSelectModalOpen(false)}
              className="mt-4"
            >
              Cancelar
            </BrutalButton>
          </div>
        </div>
      )}
    </div>
  );
};
