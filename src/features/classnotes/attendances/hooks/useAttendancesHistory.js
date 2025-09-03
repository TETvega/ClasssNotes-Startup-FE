import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useBreadcrumbStore } from "../../../../shared/store/useBreadcrumbStore";
import {
  getHistoryCourseStatsAsync,
  getHistoryStudentStatsAsync,
} from "../../../../shared/actions";

export const useAttendancesHistory = () => {
  const { currentCourse } = useBreadcrumbStore();
  const courseId = currentCourse.id;
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const pageSizeOptions = [10, 15, 20, 25];
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);

  //* Función para obtener estadisticas del curso
  const courseStatsQuery = useQuery({
    queryKey: ["courseStats", courseId],
    queryFn: () => getHistoryCourseStatsAsync(courseId),
    enabled: !!courseId,
    select: (res) => res?.data,
    refetchOnWindowFocus: false,
  });

  //* Función para obtener estadisticas de los estudiantes
  const courseStudentsStatsQuery = useQuery({
    queryKey: ["courseStudentsStats", courseId, searchTerm, page, pageSize],
    queryFn: () =>
      getHistoryStudentStatsAsync(courseId, searchTerm, page, pageSize),
    enabled: !!courseId,
    select: (res) => res?.data,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const attendanceTakenDays = courseStatsQuery.data?.attendanceTakenDays;

  //* Función para definir el color del porcentaje de asistencia
  const getColor = (attendanceRatePercentage) => {
    if (attendanceRatePercentage >= 90) return "bg-success-bg";
    if (attendanceRatePercentage >= 60) return "bg-yellow-400";
    return "bg-error-bg";
  };

  //* Función para calcular el porcentaje de asistencia de los estudiantes
  const studentsWithPercentage =
    courseStudentsStatsQuery.data?.items?.map((student) => {
      const attendanceRatePercentage = Math.round(
        (student.attendanceRate / attendanceTakenDays) * 100,
      );
      return {
        ...student,
        attendanceRatePercentage,
        attendanceRateColor: getColor(attendanceRatePercentage),
      };
    }) ?? [];

  return {
    currentCourse,
    searchTerm,
    page,
    pageSize,
    pageSizeOptions,
    courseStats: courseStatsQuery.data,
    studentStats: {
      ...courseStudentsStatsQuery.data,
      items: studentsWithPercentage,
    },
    isLoading: courseStatsQuery.isLoading || courseStudentsStatsQuery.isLoading,
    refetchCourseStats: courseStatsQuery.refetch,
    refetchStudentStats: courseStudentsStatsQuery.refetch,
    setPageSize,
    setSearchTerm,
    setPage,
  };
};
