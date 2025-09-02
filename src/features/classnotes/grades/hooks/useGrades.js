import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getGradesDashboard } from "../../../../shared/actions";

export const useGrades = (courseId) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentIdFromMailIcon, setStudentIdFromMailIcon] = useState(null);
  const [studentNameFromMailIcon, setStudentNameFromMailIcon] = useState("");
  const [isModalOpenFromActionsLot, setIsModalOpenFromActionsLot] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [setIsFiltering] = useState(false);

  const queryParams = {
    page: currentPage,
    pageSize,
    activeStudent: "ACTIVE",
    includeStats: true,
    searchTerm,
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["gradesDashboard", courseId, currentPage, pageSize, searchTerm],
    queryFn: () => getGradesDashboard(courseId, queryParams),
    refetchOnWindowFocus: false,
    enabled: !!courseId,
    keepPreviousData: true,
    onSuccess: () => {
      setIsFiltering(true);
      setTimeout(() => setIsFiltering(false), 800);
    },
    onError: () => {
      setIsFiltering(false);
    },
  });

  const allStudentsQueryParams = {
    activeStudent: "ACTIVE",
    includeStats: true,
    searchTerm,
    pageSize: 1000,
  };

  const { data: allStudentsData } = useQuery({
    queryKey: ["allStudentsGradesDashboard", courseId, searchTerm],
    queryFn: () => getGradesDashboard(courseId, allStudentsQueryParams),
    refetchOnWindowFocus: false,
    enabled: !!courseId,
    keepPreviousData: true,
  });

  const students =
    data?.data?.studentQualifications?.items?.map((student) => ({
      id: student.studentId,
      name: student.studentName,
      email: student.studentEmail,
      grades: student.studentUnits.reduce(
        (acc, unit) => ({
          ...acc,
          [`unidad${unit.unitNumber}`]: unit.note,
        }),
        {},
      ),
      average: student.globalAverage,
      status:
        student.stateNote === "EXCELLENT"
          ? "Excelente"
          : student.stateNote === "GOOD"
            ? "Bueno"
            : student.stateNote === "LOW"
              ? "Bajo"
              : student.stateNote === "FAILED"
                ? "Reprobado"
                : "Estable",
    })) || [];

  const allStudents =
    allStudentsData?.data?.studentQualifications?.items?.map((student) => ({
      id: student.studentId,
      name: student.studentName,
      email: student.studentEmail,
      grades: student.studentUnits.reduce(
        (acc, unit) => ({
          ...acc,
          [`unidad${unit.unitNumber}`]: unit.note,
        }),
        {},
      ),
      average: student.globalAverage,
      status:
        student.stateNote === "EXCELLENT"
          ? "Excelente"
          : student.stateNote === "GOOD"
            ? "Bueno"
            : student.stateNote === "LOW"
              ? "Bajo"
              : student.stateNote === "FAILED"
                ? "Reprobado"
                : "Estable",
    })) || [];

  const statistics = data?.data?.stadisticStudents || {
    overallAvarage: 0,
    approvalRating: 0,
    bestUnit: { unitNumber: 0, avarage: 0 },
    worstUnit: { unitNumber: 0, avarage: 0 },
    graficResult: {
      excellentTotal: 0,
      goodTotal: 0,
      stablishTotal: 0,
      lowTotal: 0,
      failedTotal: 0,
    },
  };

  const gradeDistribution = [
    {
      label: "Excelente",
      percentage:
        (statistics.graficResult.excellentTotal /
          statistics.graficResult.bigTotal) *
          100 || 0,
      color: "#22C55E",
    },
    {
      label: "Bueno",
      percentage:
        (statistics.graficResult.goodTotal / statistics.graficResult.bigTotal) *
          100 || 0,
      color: "#3B82F6",
    },
    {
      label: "Estable",
      percentage:
        (statistics.graficResult.stablishTotal /
          statistics.graficResult.bigTotal) *
          100 || 0,
      color: "#EAB308",
    },
    {
      label: "Bajo",
      percentage:
        (statistics.graficResult.lowTotal / statistics.graficResult.bigTotal) *
          100 || 0,
      color: "#F97316",
    },
    {
      label: "Reprobado",
      percentage:
        (statistics.graficResult.failedTotal /
          statistics.graficResult.bigTotal) *
          100 || 0,
      color: "#EF4444",
    },
  ];

  const endDate = data?.data?.endDate;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  };

  const handleSelectStudent = (studentId) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId],
    );
  };

  const handleOpenModalFromMailIcon = (studentId) => {
    const student = students.find((s) => s.id === studentId);
    if (student) {
      setStudentNameFromMailIcon(student.name);
      setStudentIdFromMailIcon(studentId);
      setIsModalOpen(true);
    }
  };

  const handleOpenModalFromActionsLot = () => {
    setIsModalOpen(true);
    setIsModalOpenFromActionsLot(true);
  };

  const handleOpenReportModal = () => {
    setIsReportModalOpen(true);
  };

  const handleSearch = (query) => {
    setSearchTerm(query.trim());
    setCurrentPage(1);
    setIsFiltering(true);
    setTimeout(() => setIsFiltering(false), 800);
  };

  return {
    endDate,
    students,
    allStudents,
    statistics,
    gradeDistribution,
    currentPage,
    pageSize,
    totalItems: data?.data?.studentQualifications?.totalItems || 0,
    totalPages: data?.data?.studentQualifications?.totalPages || 1,
    hasPreviousPage:
      data?.data?.studentQualifications?.hasPreviousPage || false,
    hasNextPage: data?.data?.studentQualifications?.hasNextPage || false,
    selectedStudents,
    isModalOpen,
    studentIdFromMailIcon,
    studentNameFromMailIcon,
    isModalOpenFromActionsLot,
    isReportModalOpen,
    isLoading: isLoading && currentPage === 1,
    error,
    searchTerm,
    handlePageChange,
    handlePageSizeChange,
    handleSelectStudent,
    handleOpenModalFromMailIcon,
    handleOpenModalFromActionsLot,
    handleOpenReportModal,
    setIsModalOpen,
    setIsReportModalOpen,
    setStudentIdFromMailIcon,
    setStudentNameFromMailIcon,
    setIsModalOpenFromActionsLot,
    setSearchTerm: handleSearch,
  };
};
