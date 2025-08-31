import { create } from "zustand";

export const useAttendanceStatusStore = create((set, get) => ({
  attendancesTaken: [],

  setAttendanceStatus: (courseAttendanceStatus) => {
    const currentList = get().attendancesTaken;

    const updatedList = [
      ...currentList.filter(
        (a) => a.coursesId !== courseAttendanceStatus.coursesId,
      ),
      courseAttendanceStatus,
    ];

    set({ attendancesTaken: updatedList });
    localStorage.setItem("attendancesTaken", JSON.stringify(updatedList));
  },

  getAttendanceStatus: () => {
    const data = localStorage.getItem("attendancesTaken");
    if (data) {
      const parsed = JSON.parse(data);
      set({ attendancesTaken: parsed });
    }
  },

  isCourseAttendanceTaken: (courseId) => {

    const attendancesTakenStored = get().attendancesTaken;
    if (attendancesTakenStored.length === 0) return false;

    const courseAttendance = attendancesTakenStored.find(
      (a) => a.courseId === courseId,
    );

    if (!courseAttendance) return false;

    const today = new Date().toLocaleDateString("sv-SE"); 

    const storedDate = courseAttendance.date;
    const storedTaken = courseAttendance.taken;

    return storedTaken === true && storedDate === today;
    // true -- Asistencia ya tomada hoy
    // false -- Asistencia no tomada hoy
  },

  attendancesInProgress: [],

  setAttendancesInProgress: (courseId) => {
    const currentList = get().attendancesInProgress;

    // Evita duplicados
    if (!currentList.includes(courseId)) {
      const updatedList = [...currentList, courseId];
      set({ attendancesInProgress: updatedList });
      localStorage.setItem(
        "attendancesInProgress",
        JSON.stringify(updatedList),
      );
    }
  },

  removeAttendanceInProgress: (courseId) => {
    const currentList = get().attendancesInProgress;
    const updatedList = currentList.filter((id) => id !== courseId);
    set({ attendancesInProgress: updatedList });
    localStorage.setItem("attendancesInProgress", JSON.stringify(updatedList));
  },

  getAttendancesInProgress: () => {
    const data = localStorage.getItem("attendancesInProgress");
    if (data) {
      const parsed = JSON.parse(data);
      set({ attendancesInProgress: parsed });
    }
  },

  isAttendanceInProgress: (courseId) => {
    const inProgress = get().attendancesInProgress;
    return inProgress.includes(courseId);
  },
}));
