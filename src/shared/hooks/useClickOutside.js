/**
 * Hook useClickOutside
 *
 * Hook utilizado para saber cuando un elemento es presionado fuera de un area
 *
 * @param {boolean} initialState - Estado para saber si el modal se encuentra abierto o no
 * @param {string} ignoredId - Texto que indica el nombre del id del elemento que abre y cierra el modal normalmente
 *
 * @returns {Object} Objeto que retorna el hook que incluye, el estado de abierto o no, asi como la función que cambia el estado y la referencia del elemento
 */

import { useEffect, useRef, useState } from "react";

const useClickOutside = (initialState = false, ignoredId = null) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const ref = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Si el clic ocurrió en cualquier parte dentro del botón o el ícono
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleScrollOrResize = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);
    window.addEventListener("scroll", handleScrollOrResize);
    window.addEventListener("resize", handleScrollOrResize);
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [ignoredId, isOpen]);

  return { ref, isOpen, buttonRef, setIsOpen };
};

export default useClickOutside;
