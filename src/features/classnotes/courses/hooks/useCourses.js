import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllCoursesAsync } from "../../../../shared/actions";

export const useCourses = () => {
  const pageSizeOptions = [8, 12, 16, 20];
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeCoursesFilter, setActiveCoursesFilter] = useState("ALL");
  const [selectedCenters, setSelectedCenters] = useState([]);
  const [setSearchQuery] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);

  const body = {
    classTypes: activeCoursesFilter, // Puede ser "ALL", "ACTIVE", o "INACTIVE"
    centers: selectedCenters.length > 0 ? selectedCenters : [],
    page: page,
    pageSize: pageSize,
    searchTerm: searchTerm,
  };

  const { data, isLoading } = useQuery({
    queryKey: [
      "allCourses",
      searchTerm,
      page,
      pageSize,
      selectedCenters,
      activeCoursesFilter,
    ],
    refetchOnWindowFocus: false,
    queryFn: () => getAllCoursesAsync(body),
    onSuccess: () => {
      setIsFiltering(true);
      setTimeout(() => {
        setIsFiltering(false);
      }, 800);
    },
    onError: (err) => {
      console.error("Error al cargar cursos:", err);
      setIsFiltering(false);
    },
  });

  let courses = data?.data;

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setPage(1);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const toggleSelectedCenter = (id) => {
    setSelectedCenters((prevSelected) => {
      if (id === "reset") {
        return [];
      }

      if (prevSelected.includes(id)) {
        return prevSelected.filter((centerId) => centerId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
    setPage(1);
  };

  const toggleFilter = (filter) => {
    setActiveCoursesFilter(filter);
    setPage(1);
  };

  const handleSearch = (query) => {
    const trimmedQuery = query.trim();
    setSearchQuery(trimmedQuery);
    setSearchTerm(trimmedQuery);
    setPage(1);
  };

  return {
    isLoading: isLoading || isFiltering,
    courses,
    showSidebar,
    activeCoursesFilter,
    selectedCenters,
    currentPage: page,
    pageSize,
    pageSizeOptions,
    toggleSidebar,
    toggleSelectedCenter,
    toggleFilter,
    handleSearch,
    handlePageChange,
    handlePageSizeChange,
    setPage,
    setPageSize,
  };
};
