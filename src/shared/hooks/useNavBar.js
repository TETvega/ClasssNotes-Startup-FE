import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../../features/auth/store";
import { useTagsListStore } from "../../features/classnotes/tags/store/useTagsListStore";

export const useNavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("/dashboard");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const { clearTags } = useTagsListStore();
  const queryClient = useQueryClient();

  // Referencias para los elementos del DOM
  const profileMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Estados de autenticación
  const logOut = useAuthStore((state) => state.logout);
  const validateAuthentication = useAuthStore(
    (state) => state.validateAuthentication,
  );
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Rutas de navegación
  const routes = [
    { name: "Inicio", path: "/dashboard" },
    { name: "Cursos", path: "/courses" },
    { name: "Actividades", path: "/activities" },
    { name: "Centros Educativos", path: "/centers" },
  ];

  // Determinar si una ruta está activa (si el pathname comienza con esa ruta)
  const isPathActive = (path) => {
    if (path !== "/") return pathname.startsWith(path);
    return false;
  };

  // Manejar el toggle del menú hamburguesa
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isProfileOpen) {
      setActiveTab("");
    }

    // Bloquear/desbloquear scroll del body cuando se abre/cierra el menú
    if (!isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  };

  // Cerrar el menú hamburguesa al navegar o hacer clic fuera
  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = "unset";
  };

  // Toggle del menú de perfil en desktop
  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
    setClickCount(0);
  };

  // Manejar cierre de sesión
  const handleLogout = () => {
    logOut();
    queryClient.clear();
    validateAuthentication();
    navigate("/");
    closeMenu();
    setIsProfileOpen(false);
    clearTags();
  };

  // Manejar clics fuera del menú de perfil en desktop
  const handleClickOutside = (event) => {
    // Para el menú de perfil en desktop
    if (
      profileMenuRef.current &&
      !profileMenuRef.current.contains(event.target)
    ) {
      setClickCount((prevCount) => prevCount + 1);
      if (clickCount + 1 >= 1) {
        setIsProfileOpen(false);
        setClickCount(0);
      }
    }

    // Para el menú hamburguesa en móvil
    if (
      isMenuOpen &&
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target)
    ) {
      closeMenu();
    }
  };

  // Manejar clics en los enlaces del menú
  const handleNavigation = (path) => {
    setActiveTab(path);
    closeMenu();
    setIsProfileOpen(false);
  };

  // Event listener para clics fuera de los menús
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [clickCount, isMenuOpen]);

  // Limpiar al desmontar
  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return {
    isMenuOpen,
    activeTab,
    isProfileOpen,
    profileMenuRef,
    mobileMenuRef,
    routes,
    handleMenuToggle,
    toggleProfileMenu,
    handleLogout,
    setActiveTab,
    closeMenu,
    handleNavigation,
    isPathActive,
  };
};
