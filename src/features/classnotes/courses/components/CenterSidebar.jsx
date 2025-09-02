import { useRef } from "react";
import { useScrollDistance } from "../hooks";
import { useCentersCourse } from "../hooks/useCentersCourse";
import { CenterItemSkeleton } from "./skeleton";
import { AllCentersButton } from "./AllCentersButton";
import { CenterItem } from "./CenterItem";

export const CenterSidebar = ({
  showSidebar,
  centers,
  selectedCenters = [],
  toggleSelectedCenter,
}) => {
  // Función para calcular umbral dinámico basado en el número de centros
  const calculateThreshold = (totalCenters) => {
    const baseThreshold = 240;
    const multiplier = Math.floor(totalCenters / 30);
    return baseThreshold + multiplier * 100;
  };

  // Usar nuestro hook personalizado con umbral dinámico
  const { targetRef, containerRef, isNear, reset } = useScrollDistance(
    calculateThreshold(centers.length),
  );
  const {
    data,
    status,
    error,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useCentersCourse(centers, isNear, reset);

  // Ref para evitar múltiples llamadas innecesarias
  const hasTriggered = useRef(false);

  // Controlador para manejar la visibilidad del targetRef
  const handleTargetRef = (node) => {
    if (node && hasNextPage && !isFetchingNextPage && !hasTriggered.current) {
      // Verificar si el sidebar está abierto
      if (showSidebar) {
        // Activar carga automática si el sidebar está abierto
        hasTriggered.current = true;
        fetchNextPage();
        setTimeout(() => {
          hasTriggered.current = false;
        }, 0);
      }
    }
    targetRef.current = node;
  };

  return (
    <div
      ref={containerRef}
      className={`fixed top-0 right-0 z-20 h-full max-h-screen overflow-y-auto bg-white shadow-lg transition-transform duration-300 ease-in-out ${showSidebar ? "transform-none" : "translate-x-full"} max-sm:w-3/4 sm:w-3/4 md:w-2/5 lg:w-1/3`}
    >
      <div className="p-4 sm:p-6">
        <h2 className="mb-4 border-b pb-2 text-xl font-semibold">
          Centros Educativos
        </h2>

        {status === "pending" ? (
          <>
            {[...Array(8)].map((_, index) => (
              <CenterItemSkeleton key={index} />
            ))}
          </>
        ) : status === "error" ? (
          <div>{error.message}</div>
        ) : (
          <>
            <AllCentersButton
              isSelected={selectedCenters.length === 0}
              onClick={() => toggleSelectedCenter("reset")}
            />

            {data.pages.map((page) =>
              page.data.map((center) => (
                <CenterItem
                  key={center.id}
                  center={center}
                  isSelected={selectedCenters.includes(center.id)}
                  onClick={() => toggleSelectedCenter(center.id)}
                />
              )),
            )}

            {/* HandleTargetRef maneja la carga automática */}
            <div ref={handleTargetRef}>
              {isFetchingNextPage && <CenterItemSkeleton />}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
