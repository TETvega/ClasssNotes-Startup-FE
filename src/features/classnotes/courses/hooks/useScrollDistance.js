import { useEffect, useState, useRef, useCallback } from "react";

export const useScrollDistance = (distanceThreshold = 200) => {
  const [isNear, setIsNear] = useState(false);
  const targetRef = useRef(null); //(se referencia al ultimo item)
  const containerRef = useRef(null); //(se referencia al contenedor que tiene el scroll)
  const lastPositionRef = useRef(0); //(se referencia a la ultima posicion del scroll para comparación)

  //se usa un useCallback para mantener referencia estable entre renders
  //sin el uso de useCallback, en cada render se crearia una nueva funcion checkPosition y se actualizaria el efecto
  const checkPosition = useCallback(() => {
    //validación de seguridad por si los elementos aun no existen o las referencias se pierden
    //caso inicial antes del primer render y algun caso inusual (para evitar errores con la función getBoundingClientRect)
    if (!targetRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const target = targetRef.current;

    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    // Calcular distancia entre el fondo del contenedor y el elemento objetivo
    const distanceToBottom = targetRect.top - containerRect.bottom;
    const currentPosition = container.scrollTop;

    // Solo actualizar si la posición ha cambiado significativamente (50 px en este caso)
    if (Math.abs(currentPosition - lastPositionRef.current) > 50) {
      setIsNear(distanceToBottom < distanceThreshold);
      lastPositionRef.current = currentPosition;
    }
  }, [distanceThreshold]);
  //distanceThreshold si cambia se recrea la funcion checkPosition

  useEffect(() => {
    //verificar existencia del contenedor en el DOM antes de continuar
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      checkPosition();
    };

    // Usar requestAnimationFrame para optimizar el rendimiento
    let ticking = false; //bandera de control
    const optimizedScrollHandler = () => {
      if (!ticking) {
        //solo ejecutar si no hay otro scroll en proceso
        window.requestAnimationFrame(() => {
          //sincronizar con el refresco de pantalla
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    //este evento solo sera escuchado en el contenedor no en toda la ventana
    container.addEventListener("scroll", optimizedScrollHandler);

    // verificar posicion inicial al montar y para casos donde el contenido ya esta cerca del final
    checkPosition();

    //efecto de limpieza
    return () => {
      container.removeEventListener("scroll", optimizedScrollHandler);
    };
  }, [checkPosition]);

  return {
    targetRef,
    containerRef,
    isNear,
    reset: () => setIsNear(false),
  };
};
