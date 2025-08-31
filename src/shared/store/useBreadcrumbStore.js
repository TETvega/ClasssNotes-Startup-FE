import { create } from "zustand";

export const useBreadcrumbStore = create((set) => ({
  // Centro educativo
  currentCenter: {
    id: "",
    name: "",
    abb: "",
  },
  setCurrentCenter: (center) => {
    set({ currentCenter: center });
    localStorage.setItem("currentCenter", JSON.stringify(center));
  },
  getCurrentCenter: () => {
    const data = localStorage.getItem("currentCenter");
    if (data) {
      const parsed = JSON.parse(data);
      set({ currentCenter: parsed });
    }
  },
  clearCurrentCenter: () => {
    localStorage.removeItem("currentCenter");
    set({ currentCenter: { id: "", name: "", abb: "" } });
  },

  // Curso
  currentCourse: {
    id: "",
    name: "",
    code: "",
  },
  setCurrentCourse: (course) => {
    set({ currentCourse: course });
    localStorage.setItem("currentCourse", JSON.stringify(course));
  },
  getCurrentCourse: () => {
    const data = localStorage.getItem("currentCourse");
    if (data) {
      const parsed = JSON.parse(data);
      set({ currentCourse: parsed });
    }
  },
  clearCurrentCourse: () => {
    localStorage.removeItem("currentCourse");
    set({ currentCourse: { id: "", name: "", code: "" } });
  },

  // Actividad
  currentActivity: {
    id: "",
    name: "",
  },
  setCurrentActivity: (activity) => {
    set({ currentActivity: activity });
    localStorage.setItem("currentActivity", JSON.stringify(activity));
  },
  getCurrentActivity: () => {
    const data = localStorage.getItem("currentActivity");
    if (data) {
      const parsed = JSON.parse(data);
      set({ currentActivity: parsed });
    }
  },
  clearCurrentActivity: () => {
    localStorage.removeItem("currentActivity");
    set({ currentActivity: { id: "", name: "" } });
  },

  // Reset all (por si lo ocupás para logout o navegación completa)
  resetBreadcrumb: () => {
    localStorage.removeItem("currentCenter");
    localStorage.removeItem("currentCourse");
    localStorage.removeItem("currentActivity");
    set({
      currentCenter: { id: "", name: "", abb: "" },
      currentCourse: { id: "", name: "" },
      currentActivity: { id: "", name: "" },
    });
  },
}));
