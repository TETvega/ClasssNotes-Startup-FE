import { useInfiniteQuery } from "@tanstack/react-query";
import { getCentersList } from "../../../../shared/actions";

export const useCentersCourse = () => {
  const {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["centers-sidebar"],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getCentersList("", pageParam, 15, null);
      return {
        data: Array.isArray(response.data.items) ? response.data.items : [],
        currentPage: pageParam,
        nextPage: response.data.hasNextPage ? pageParam + 1 : null,
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  return {
    data,
    status,
    error,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  };
};
