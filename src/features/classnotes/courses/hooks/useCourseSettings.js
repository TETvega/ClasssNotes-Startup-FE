import { useQuery } from "@tanstack/react-query";
import { getCourseSettingsAsync } from "../../../../shared/actions";

export const useCourseSettings = (searchTerm = "", page = 1) => {
  return useQuery({
    queryKey: ["courseSettings", searchTerm, page],
    queryFn: () => getCourseSettingsAsync(searchTerm, page),
    select: (data) => data?.data,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
  });
};
