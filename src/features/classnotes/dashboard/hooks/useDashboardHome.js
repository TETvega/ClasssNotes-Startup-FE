import { useQuery } from "@tanstack/react-query";
import { dashboardAsync } from "../../../../shared/actions";

export const useDashboardHome = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => dashboardAsync(),
    staleTime: 1000 * 60 * 5, // 5 minutos
    refetchOnWindowFocus: false,
  });

  const total = data?.data || {
    stadistics: {
      totalCentersCount: 0,
      totalClassesCount: 0,
      totalStudentsCount: 0,
    },
    pendingActivities: [
      {
        pendingActivitiesCount: 0,
        courseId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        courseName: "string",
        courseCode: "string",
      },
    ],
    upcomingActivities: [
      {
        activityId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        activityName: "string",
        qualificationDate: "2025-04-12T20:21:34.561Z",
        courseId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        courseName: "string",
        centerId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        centerName: "string",
      },
    ],
    activeCenters: [
      {
        centerId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        centerName: "string",
        centerAbb: "string",
        logoUrl: "string",
        activeClasesCount: 0,
        activeStudentsCount: 0,
      },
    ],
    activeClasses: [
      {
        courseId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        courseName: "string",
        courseCode: "string",
        courseSection: "string",
        activeStudentsCount: 0,
        totalActivities: 0,
        totalActivitiesDone: 0,
        centerId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        centerName: "string",
        centerAbb: "string",
      },
    ],
    studentPendingActivitiesList: [
      {
        studentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        studentFullName: "string",
        studentEmail: "string",
        studentActiveClasesCount: 0,
        studentPendingActivitiesCount: 0,
      },
    ],
  };

  return { total, isLoading };
};
