import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  getStudentInfoAsync,
  getStudentPendingActivitiesAsync,
} from "../../../../shared/actions";

export const useStudentActivities = (courseId, studentId) => {
  // Información del estudiante
  const studentInfoQuery = useQuery({
    queryKey: ["student-info", courseId, studentId],
    queryFn: () => getStudentInfoAsync(courseId, studentId),
    enabled: !!courseId && !!studentId,
    select: (data) => data?.data || {},
  });

  // Actividades pendientes con scroll infinito
  const pendingActivitiesQuery = useInfiniteQuery({
    queryKey: ["student-pending-activities", courseId, studentId],
    queryFn: ({ pageParam = 1 }) =>
      getStudentPendingActivitiesAsync({
        courseId,
        studentId,
        page: pageParam,
        pageSize: 10,
      }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.data?.hasNextPage) return undefined;
      return lastPage.data.currentPage + 1;
    },
    enabled: !!courseId && !!studentId,
    select: (data) => ({
      pages: data.pages.flatMap((page) => page.data.items || []),
      pageParams: data.pageParams,
    }),
  });

  return {
    studentInfo: studentInfoQuery.data,
    isLoadingStudentInfo: studentInfoQuery.isLoading,
    studentInfoError: studentInfoQuery.error,
    pendingActivities: pendingActivitiesQuery.data?.pages || [],
    isLoadingActivities: pendingActivitiesQuery.isLoading,
    isFetchingNextPage: pendingActivitiesQuery.isFetchingNextPage,
    hasNextPage: pendingActivitiesQuery.hasNextPage,
    activitiesError: pendingActivitiesQuery.error,
    fetchNextPage: pendingActivitiesQuery.fetchNextPage,
  };
};
