import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import { setTokenAndState } from "../utilities/set_token_and_state";
import { loginAsync, registerAsync } from "../../../shared/actions/auth.action";

export const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  roles: [],
  refreshToken: null,
  isAuthenticated: false,
  message: "",
  error: false,

  // Método para autenticar al usuario
  login: async (form) => {
    set({ message: "", error: false });
    const { status, data, message } = await loginAsync(form);
    return setTokenAndState(status, data, message, set, get);
  },

  // Método para registrar un nuevo usuario
  register: async (form) => {
    set({ message: "", error: false });
    const { status, data, message } = await registerAsync(form);
    return setTokenAndState(status, data, message, set, get);
  },

  // Método para obtener el token actual del usuario y guardarlo en el localStorage
  setSession: (user, token, refreshToken) => {
    set({
      user: user,
      token: token,
      refreshToken: refreshToken,
      isAuthenticated: true,
    });

    localStorage.setItem("user", JSON.stringify(get().user ?? {}));
    localStorage.setItem("token", get().token);
    localStorage.setItem("refreshToken", get().refreshToken);
  },

  // Método para cerrar sesión y limpiar el localStorage
  logout: () => {
    set({
      user: null,
      token: null,
      roles: [],
      refreshToken: null,
      isAuthenticated: false,
      error: false,
      message: "",
    });

    const clearAttendanceState = () => {
      const keys = ["tags", "token", "refreshToken", "user"];
      keys.forEach((key) => localStorage.removeItem(key));
    };
    clearAttendanceState();
  },

  // Método para validar la autenticación del usuario y actualizar el estado del store
  validateAuthentication: () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (!token) {
      set({ isAuthenticated: false });
      return;
    }

    try {
      const decodeJwt = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000); 
      if (decodeJwt.exp < currentTime) {
        set({ isAuthenticated: false });
        return;
      }

      const roles =
        decodeJwt[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];

      set({
        isAuthenticated: true,
        roles: typeof roles === "string" ? [roles] : roles,
        user: typeof user === "string" ? JSON.parse(user) : user,
      });
    } catch (error) {
      console.error(error);
      set({ isAuthenticated: false });
    }
  },
}));
