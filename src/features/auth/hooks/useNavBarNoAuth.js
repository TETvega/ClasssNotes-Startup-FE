import { useState, useRef } from "react";
import { useLocation } from "react-router-dom";

export const useNavBarNoAuth = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const location = useLocation();
  const isRootOnView = location.pathname === "/";
  const hiddenRoutes = [
    "/auth/forgot-password",
    "/auth/verify-code",
    "/auth/reset-password",
    "/check-in/email",
  ];

  const routes = [
    { name: "Iniciar Sesión", path: "/auth/login" },
    { name: "Crear una cuenta", path: "/auth/register" },
  ];

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => location.pathname.includes(path);

  return {
    isMenuOpen,
    setIsMenuOpen,
    profileMenuRef,
    isRootOnView,
    hiddenRoutes,
    routes,
    handleMenuToggle,
    isActive,
  };
};
