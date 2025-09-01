import { create } from "zustand";
import { getTagsList } from "../actions/tags.action";

export const useTagsListStore = create((set, get) => ({
  tags: [],

  // Obtiene las tags desde localStorage y las setea en el estado
  getTags: () => {
    const data = localStorage.getItem("tags");
    if (data) {
      const parsed = JSON.parse(data);
      set({ tags: parsed });
    }
  },

  // Elimina las tags del estado y del localStorage
  clearTags: () => {
    localStorage.removeItem("tags");
    set({ tags: [] });
  },

  // Llama a la API, guarda en Zustand y localStorage
  fetchTagsAndStore: async () => {
    const response = await getTagsList();
    const tags = response?.data?.items || [];
    set({ tags });
    localStorage.setItem("tags", JSON.stringify(tags));
  },

  // Devuelve una tag específica desde el estado
  getTagById: (id) => {
    return get().tags.find((tag) => tag.id === id) || null;
  },
}));
