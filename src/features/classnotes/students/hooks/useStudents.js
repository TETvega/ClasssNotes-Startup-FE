import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  changeStudentsStateAsync,
  deleteStudentsAsync,
  getStudentsCourseAsync,
} from "../../../../shared/actions";

export const useStudents = (id) => {
  const [isFiltering, setIsFiltering] = useState(true);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [studentType, setStudentType] = useState("ALL");
  const [activityType, setActivityType] = useState("ALL");
  const pageSizeOptions = [5, 10, 15, 25];

  const queryClient = useQueryClient();

  const { error, data, isLoading, isFetching } = useQuery({
    queryKey: [
      "students",
      id,
      searchTerm,
      page,
      pageSize,
      studentType,
      activityType,
    ],
    queryFn: () =>
      getStudentsCourseAsync(
        id,
        searchTerm,
        page,
        pageSize,
        studentType,
        activityType,
      ),
    refetchOnWindowFocus: false,
    onSuccess: () => {
      setIsFiltering(false);
    },
    onError: (err) => {
      setIsFiltering(false);
      toast.error("Error al obtener los estudiantes", err);
    },
  });

  const deleteStudentsMutation = useMutation({
    mutationFn: ({ courseId, studentIds }) =>
      deleteStudentsAsync(courseId, studentIds),
    onSuccess: (response) => {
      if (response.status) {
        toast.success(
          `¡${selectedStudents.length} estudiante(s) eliminado(s) con éxito!`,
        );
        queryClient.invalidateQueries(["students", id]);
        setSelectedStudents([]);
        setPage(1);
      } else {
        toast.error(response.message || "Error al eliminar estudiantes");
      }
    },
    onError: (err) => {
      toast.error("Error al eliminar estudiantes");
      console.error("Error al eliminar estudiantes:", err);
    },
  });

  // Cambiar el estado de los estudiantes
  const changeStudentsStateMutation = useMutation({
    mutationFn: ({ courseId, studentIds }) =>
      changeStudentsStateAsync(courseId, studentIds),
    onSuccess: (response) => {
      if (response.status) {
        toast.success(
          `¡Estado de ${selectedStudents.length} estudiante(s) cambiado con éxito!`,
        );
        queryClient.invalidateQueries(["students", id]);
        setSelectedStudents([]);
      } else {
        toast.error(
          response.message || "Error al cambiar el estado de los estudiantes",
        );
      }
    },
    onError: (err) => {
      toast.error("Error al cambiar el estado de los estudiantes", err);
    },
  });

  const students = data?.data;

  const handleSelectStudent = (id) => {
    setSelectedStudents((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((e) => e !== id)
        : [...prevSelected, id],
    );
  };

  const handleSelectAllStudents = () => {
    setSelectedStudents((prevSelected) => {
      const currentPageStudentIds =
        students?.items?.map((student) => student.studentId) || [];
      const allSelected = currentPageStudentIds.every((id) =>
        prevSelected.includes(id),
      );
      if (allSelected) {
        return prevSelected.filter((id) => !currentPageStudentIds.includes(id));
      }
      return [...new Set([...prevSelected, ...currentPageStudentIds])];
    });
  };

  const handleFilterByStudentsState = (state) => {
    setStudentType(state.toUpperCase());
    setPage(1);
    setIsFiltering(true);
    setTimeout(() => setIsFiltering(false), 800);
  };

  const handleFilterByActivitiesState = (state) => {
    const activityMap = {
      all: "ALL",
      pending: "PENDIENTES",
      completed: "DONE",
    };
    setActivityType(activityMap[state]);
    setPage(1);
    setIsFiltering(true);
    setTimeout(() => setIsFiltering(false), 800);
  };

  const handleSearch = (query) => {
    setSearchTerm(query.trim());
    setPage(1);
    setIsFiltering(true);
    setTimeout(() => setIsFiltering(false), 800);
  };

  const handleDeleteStudents = (studentIds) => {
    deleteStudentsMutation.mutate({ courseId: id, studentIds });
  };

  // Función para cambiar el estado de los estudiantes
  const handleChangeStudentsState = (studentIds) => {
    changeStudentsStateMutation.mutate({ courseId: id, studentIds });
  };

  return {
    isLoading: isLoading || isFetching,
    isFiltering,
    students,
    selectedStudents,
    searchTerm,
    pageSizeOptions,
    page,
    pageSize,
    error,
    studentType,
    activityType,
    isDeleting: deleteStudentsMutation.isLoading,
    isChangingState: changeStudentsStateMutation.isLoading,
    setIsFiltering,
    setSelectedStudents,
    handleSelectStudent,
    handleSelectAllStudents,
    setSearchTerm: handleSearch,
    setPage,
    setPageSize,
    handleFilterByStudentsState,
    handleFilterByActivitiesState,
    handleDeleteStudents,
    handleChangeStudentsState,
  };
};
