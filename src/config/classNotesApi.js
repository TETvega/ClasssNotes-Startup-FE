import axios from "axios";
import { useAuthStore } from "../features/auth/store";
import { useBreadcrumbStore } from "../shared/store/useBreadcrumbStore";

// Establecer la URL base para la API
const API_URL = "https://localhost:7047/api";
axios.defaults.baseURL = API_URL;

// Función para establecer el encabezado de autorización con el token
const setAuthToken = () => {
  const auth = getAuth();
  if (auth) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

// Función para obtener el token y el token de actualización desde localStorage
const getAuth = () => {
  const lsToken = localStorage.getItem("token");
  const lsRefreshToken = localStorage.getItem("refreshToken");
  if (lsToken && lsRefreshToken) {
    return { token: lsToken, refreshToken: lsRefreshToken };
  }
  return null;
};

// Establecer el encabezado de autorización inicialmente
setAuthToken();

let refreshingTokenPromise = null;

// Crear una instancia de axios para la API de notas de clase
const classNotesApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para manejar respuestas
classNotesApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const auth = getAuth();

    // Si el estado de la respuesta es 401 (No autorizado) y hay un token de autenticación, intenta actualizar el token
    if (
      error.response &&
      error.response.status === 401 &&
      auth &&
      !refreshingTokenPromise
    ) {
      refreshingTokenPromise = axios
        .post(
          "auth/refresh-token",
          {
            token: auth.token ?? "",
            refreshToken: auth.refreshToken ?? "",
          },
          { withCredentials: true },
        )
        .then((response) => {
          const setSession = useAuthStore.getState().setSession;
          const user = {
            email: response.data.data.email,
            fullName: response.data.data.fullName,
            tokenExpiration: response.data.data.tokenExpiration,
          };
          // Actualizar la sesión con el nuevo token e información del usuario
          setSession(
            user,
            response.data.data.token,
            response.data.data.refreshToken,
          );
          setAuthToken();
          refreshingTokenPromise = null;
          return response.data.data.token;
        })
        .catch((err) => {
          console.error("Error al actualizar el token", err);
          const logout = useAuthStore.getState().logout;
          const resetBreadcrumb = useBreadcrumbStore.getState().resetBreadcrumb;
          resetBreadcrumb();
          logout();

          refreshingTokenPromise = null;
          window.location.href = "/security/login";

          return Promise.reject(error);
        });
    }

    // Si el token se está actualizando, espera a que se complete y vuelve a intentar la solicitud original
    if (refreshingTokenPromise) {
      await refreshingTokenPromise;
      error.config.headers["Authorization"] = `Bearer ${getAuth().token}`;
      return classNotesApi(error.config);
    }

    return Promise.reject(error);
  },
);

// Interceptor para manejar solicitudes
classNotesApi.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export { classNotesApi };
