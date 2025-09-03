import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useBreadcrumbStore } from "../../../../shared/store/useBreadcrumbStore";
import {
  getStudentAttendancesDateAsync,
  getStudetAttendanceStatsAsync,
} from "../../../../shared/actions";

export const useStudentAttendances = (studentId) => {
  const { currentCourse } = useBreadcrumbStore();
  const courseId = currentCourse.id;
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const pageSizeOptions = [21, 28];
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);
  const [isCurrentMonth, setIsCurrentMonth] = useState(false);

  const studentAttendancesDateQuery = useQuery({
    queryKey: [
      "studentAttendancesDate",
      studentId,
      courseId,
      searchTerm,
      page,
      pageSize,
      isCurrentMonth,
    ],
    queryFn: () =>
      getStudentAttendancesDateAsync({
        studentId,
        courseId,
        searchTerm,
        page,
        pageSize,
        isCurrentMonth,
      }),
    enabled: !!studentId && !!courseId,
    select: (res) => res?.data,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      console.log("Respuesta del backend:", data);
    },
    onError: (error) => {
      console.error("Error al obtener asistencias:", error);
    },
  });

  const studentAttendanceStatsQuery = useQuery({
    queryKey: ["studentAttendanceStats", studentId, courseId, isCurrentMonth],
    queryFn: () =>
      getStudetAttendanceStatsAsync({
        studentId,
        courseId,
        isCurrentMonth,
      }),
    enabled: !!studentId && !!courseId,
    select: (res) => res?.data,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const studentAttendanceCardData =
    studentAttendancesDateQuery.data?.items?.map((attendance) => {
      return {
        ...attendance,
      };
    });

  const getAttendanceColors = (status) => {
    switch (status) {
      case "NOT_PRESENT":
        return {
          cardClass: "bg-history-r-bg border-gray-300",
          numberClass: "bg-history-text-r-bg ",
        };
      case "EXCUSED":
        return {
          cardClass: "bg-history-y-bg border-gray-300",
          numberClass: "bg-warning-bg ",
        };
      case "PRESENT":
      default:
        return {
          cardClass: "bg-history-g-bg border-gray-300",
          numberClass: "bg-history-text-g-bg",
        };
    }
  };

  return {
    currentCourse,
    searchTerm,
    setSearchTerm,
    page,
    setPage,
    pageSize,
    setPageSize,
    pageSizeOptions,
    isCurrentMonth,
    setIsCurrentMonth,
    studentAttendancesDate: {
      ...studentAttendancesDateQuery.data,
      studentAttendanceCardData,
    },
    studentAttendanceStats: studentAttendanceStatsQuery.data,
    isLoading: studentAttendancesDateQuery.isLoading,
    refetchAttendances: studentAttendancesDateQuery.refetch,
    getAttendanceColors,
  };
};
