import { useQuery } from "@tanstack/react-query";
import { getStudentPendingActivitiesCourses } from "../../../../shared/actions";

export const useStudentPendingActivitiesCourses = (id, top) => {
  return useQuery({
    queryKey: ["student-pending-activities", id, top],
    queryFn: () => getStudentPendingActivitiesCourses(id, top),
    enabled: !!id,
    select: (data) => data?.data || [],
    refetchOnWindowFocus: false,
  });
};
