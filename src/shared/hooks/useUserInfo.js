import { jwtDecode } from "jwt-decode";

export const useUserInfo = () => {
  // Obtener el nombre del usuario desde localStorage
  const getUserNameFromLocalStorage = () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      return user?.name;
    } catch (error) {
      console.error("Error al obtener el nombre de usuario:", error);
      return "Usuario desconocido";
    }
  };

  // Obtener el email del usuario desde localStorage
  const getUserEmailFromLocalStorage = () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      return user?.email;
    } catch (error) {
      console.error("Error al obtener el email de usuario:", error);
      return "Usuario desconocido";
    }
  };

  // Obtener ID del usuario desde el token almacenado en localStorage
  const getUserIdFromToken = () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No se encontró el token en localStorage");
        return null;
      }
      const decoded = jwtDecode(token);
      return decoded.UserId;
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      return null;
    }
  };

  return {
    getUserNameFromLocalStorage,
    getUserEmailFromLocalStorage,
    getUserIdFromToken,
  };
};
