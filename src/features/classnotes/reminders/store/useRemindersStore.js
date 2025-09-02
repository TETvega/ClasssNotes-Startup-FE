import { create } from "zustand";
import {
  createReminderAsync,
  deleteReminderAsync,
  getPendingRemindersCountAsync,
  getReminderByIdAsync,
  getRemindersPaginationAsync,
  toggleReminderStatusAsync,
  updateReminderAsync,
} from "../../../../shared/actions";

export const useRemindersStore = create((set, get) => ({
  selectedReminder: null,
  remindersData: {
    hasNextPage: false,
    hasPreviousPage: false,
    currentPage: 1,
    pageSize: 0,
    totalItems: 0,
    totalPages: 0,
    items: [],
  },
  pendingRemindersCount: 0,

  // Para mostrar todo paginado
  loadData: async ({
    courseId,
    searchTerm = "",
    page = 1,
    pageSize,
    filter = "PENDING",
  }) => {
    const result = await getRemindersPaginationAsync({
      courseId,
      searchTerm,
      page,
      pageSize,
      filter,
    });
    if (result.status && result.data) {
      const mappedData = {
        ...result.data,
        items: result.data.items.map((item) => ({
          ...item,
          status: item.isView ? "Visto" : "No visto",
        })),
      };
      set({ remindersData: mappedData });
      return result;
    }
    set({ remindersData: { ...get().remindersData, items: [] } });
    return result;
  },

  // Para contar recordatorios pendientes
  loadPendingCount: async (courseId) => {
    const result = await getPendingRemindersCountAsync(courseId);
    if (result.status && result.data) {
      set({ pendingRemindersCount: result.data.totalItems });
      return result;
    }
    set({ pendingRemindersCount: 0 });
    return result;
  },

  // Para traer un recordatorio por id
  getReminder: async (id) => {
    const result = await getReminderByIdAsync(id);
    if (result.status && result.data) {
      const mappedReminder = {
        ...result.data,
        status: result.data.isView ? "Visto" : "No visto",
      };
      set({ selectedReminder: mappedReminder });
      return { ...result, data: mappedReminder };
    }
    set({ selectedReminder: null });
    return result;
  },

  // Para crear un recordatorio
  createReminder: async (reminder, filter = "PENDING", pageSize) => {
    const result = await createReminderAsync(reminder);
    if (result.status) {
      await get().loadData({
        courseId: reminder.courseId,
        page: get().remindersData.currentPage,
        pageSize,
        filter,
      });
      await get().loadPendingCount(reminder.courseId);
      return result;
    }
    return result;
  },

  // Para actualizar un recordatorio
  updateReminder: async (reminder, filter = "PENDING", pageSize) => {
    const result = await updateReminderAsync(reminder);
    if (result.status) {
      const mappedReminder = {
        ...result.data,
        status: result.data.isView ? "Visto" : "No visto",
      };
      set({ selectedReminder: mappedReminder });
      await get().loadData({
        courseId: reminder.courseId,
        page: get().remindersData.currentPage,
        pageSize,
        filter,
      });
      await get().loadPendingCount(reminder.courseId);
      return { ...result, data: mappedReminder };
    }
    return result;
  },

  // Para borrar un recordatorio
  deleteReminder: async (id, courseId, filter = "PENDING", pageSize) => {
    const result = await deleteReminderAsync(id);
    if (result.status) {
      await get().loadData({
        courseId,
        page: get().remindersData.currentPage,
        pageSize,
        filter,
      });
      await get().loadPendingCount(courseId);
      return result;
    }
    return result;
  },

  // Para lo del estado
  toggleReminderStatus: async (id, courseId, filter = "PENDING", pageSize) => {
    const result = await toggleReminderStatusAsync(id);
    if (result.status) {
      await get().loadData({
        courseId,
        page: get().remindersData.currentPage,
        pageSize,
        filter,
      });
      await get().loadPendingCount(courseId);
      return result;
    }
    return result;
  },

  // Estos dos siguientes son los de la paginación
  nextPage: async ({ courseId, filter, pageSize }) => {
    const { remindersData } = get();
    if (remindersData.hasNextPage) {
      await get().loadData({
        courseId,
        page: remindersData.currentPage + 1,
        pageSize,
        filter,
      });
    }
  },
  previousPage: async ({ courseId, filter, pageSize }) => {
    const { remindersData } = get();
    if (remindersData.hasPreviousPage) {
      await get().loadData({
        courseId,
        page: remindersData.currentPage - 1,
        pageSize,
        filter,
      });
    }
  },
}));
