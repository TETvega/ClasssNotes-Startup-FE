import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useTagsListStore } from "../../tags/store/useTagsListStore";
import { getActivityById, getStudentsScores, reviewActivity } from "../../../../shared/actions";

export const useGradeActivity = (activityId) => {
  const { getTagById } = useTagsListStore();
  const [activity, setActivity] = useState(null);
  const [tag, setTag] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [allStudents, setAllStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("Todos los estudiantes");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [scores, setScores] = useState({});
  const [feedbacks, setFeedbacks] = useState({});
  const [currentStudentId, setCurrentStudentId] = useState(null);
  const [currentStudentName, setCurrentStudentName] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const pageSizeOptions = [8, 16, 32];
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: pageSize,
    totalItems: 0,
    totalPages: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  });

  const queryClient = useQueryClient();

  // Query para cargar datos de la actividad y lista de estudiantes
  const { isLoading } = useQuery({
    queryKey: ['activity-grading', activityId],
    queryFn: async () => {
      const toastId = toast.loading("Obteniendo actividad...");
      try {
        const [activityResponse, scoresResponse] = await Promise.all([
          getActivityById(activityId),
          getStudentsScores(activityId, "", 999, 1)
        ]);

        if (activityResponse?.status && scoresResponse?.status) {
          const activityData = {
            ...activityResponse.data,
            studentsList: scoresResponse.data,
          };

          setActivity(activityData);
          setTag(getTagById(activityData.tagActivityId));
          setAllStudents(scoresResponse.data.items);

          const initialScores = {};
          const initialFeedbacks = {};
          scoresResponse.data.items.forEach((student) => {
            const roundedScore = student.score ? Math.round(student.score) : 0;
            initialScores[student.id] = roundedScore.toString();
            initialFeedbacks[student.id] = student.feedBack || "";
          });
          setScores(initialScores);
          setFeedbacks(initialFeedbacks);

          toast.success(activityResponse.message);
          return activityData;
        }
      } catch (error) {
        toast.error("Ha ocurrido un error. Por favor, inténtelo más tarde.");
        console.error(error);
        throw error;
      } finally {
        toast.dismiss(toastId);
      }
    },
    enabled: !!activityId,
    refetchOnWindowFocus: false
  });

  // Mutación para guardar calificaciones
  const saveGradesMutation = useMutation({
    mutationFn: ({ activityId, gradesData }) => reviewActivity(activityId, gradesData),
    onMutate: () => {
      setIsPending(true);
      const toastId = toast.loading("Guardando calificaciones...");
      return { toastId }; 
    },
    onSuccess: (result, context) => {
      if (result.status) {
        // toast.success("¡Calificaciones guardadas correctamente!");	
        toast.success(result.message);
        queryClient.invalidateQueries(['activity-grading', activityId]);
      } else {
        toast.error(result.message);
      }
      toast.dismiss(context.toastId); 
    },
    onError: (error, context) => {
      toast.error("Ha ocurrido un error. Por favor, inténtelo más tarde.");
      console.error(error);
      toast.dismiss(context.toastId);
    },
    onSettled: () => {
      setIsPending(false);
    }
  });

  // Filtrar estudiantes
  useEffect(() => {
    const filtered = allStudents.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase());

      if (filterOption === "Todos los estudiantes") return matchesSearch;
      if (filterOption === "Estudiantes seleccionados")
        return matchesSearch && selectedStudents.includes(student.id);
      if (filterOption === "Pendientes por calificar")
        return (
          matchesSearch &&
          (!scores[student.id] ||
            scores[student.id] === "" ||
            scores[student.id] === "0")
        );

      return matchesSearch;
    });

    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / pagination.pageSize);

    let currentPage = pagination.currentPage;
    if (currentPage > totalPages && totalPages > 0) {
      currentPage = totalPages;
    }

    setPagination({
      currentPage,
      pageSize: pagination.pageSize,
      totalItems,
      totalPages,
      hasPreviousPage: currentPage > 1,
      hasNextPage: currentPage < totalPages,
    });

    const indexOfLastItem = currentPage * pagination.pageSize;
    const indexOfFirstItem = indexOfLastItem - pagination.pageSize;
    const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);
    setFilteredStudents(currentItems);
  }, [
    allStudents,
    searchTerm,
    filterOption,
    selectedStudents,
    scores,
    pagination.pageSize,
    pagination.currentPage,
  ]);

  // Formik para el modal de calificación masiva
  const gradeSelectedFormik = useFormik({
    initialValues: {
      note: "",
    },
    validationSchema: Yup.object().shape({
      note: Yup.number()
        .typeError("Debe ingresar un número válido")
        .required("La calificación es obligatoria")
        .min(0, "La calificación mínima es 0")
        .max(
          activity?.maxScore,
          `La calificación máxima es ${activity?.maxScore}`,
        ),
    }),
    onSubmit: (values) => {
      const updatedScores = { ...scores };
      selectedStudents.forEach((studentId) => {
        updatedScores[studentId] = values.note.toString();
      });
      setScores(updatedScores);
      setIsModalOpen1(false);
      gradeSelectedFormik.resetForm();
    },
  });

  // Formik para el modal de retroalimentación
  const feedbackFormik = useFormik({
    initialValues: {
      feedback: "",
    },
    onSubmit: (values) => {
      if (currentStudentId) {
        setFeedbacks({
          ...feedbacks,
          [currentStudentId]: values.feedback || null,
        });
        setIsModalOpen2(false);
        feedbackFormik.resetForm();
      }
    },
  });

  // Manejar selección de estudiantes
  const handleSelectStudent = (studentId) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter((id) => id !== studentId));
    } else {
      setSelectedStudents([...selectedStudents, studentId]);
    }
  };

  // Manejar selección de todos los estudiantes
  const handleSelectAll = () => {
    if (selectedStudents.length === allStudents.length) {
      setSelectedStudents([]);
    } else {
      const allStudentIds = allStudents.map((student) => student.id);
      setSelectedStudents(allStudentIds);
    }
  };

  // Manejar cambio de calificación
  const handleScoreChange = (studentId, value) => {
    if (
      value === "" ||
      (Number(value) >= 0 && Number(value) <= activity.maxScore)
    ) {
      setScores((prev) => ({
        ...prev,
        [studentId]: value,
      }));
    }
  };

  // Manejar modal de feedback
  const handleOpenFeedbackModal = (studentId) => {
    const student = allStudents.find((s) => s.id === studentId);
    setCurrentStudentId(studentId);
    setCurrentStudentName(student ? student.name : "");
    feedbackFormik.setFieldValue("feedback", feedbacks[studentId] || "");
    setIsModalOpen2(true);
  };

  // Manejar búsqueda
  const handleSearch = (query) => {
    setSearchTerm(query);
    setPagination((prev) => ({
      ...prev,
      currentPage: 1,
    }));
  };

  // Manejar cambio de página
  const handlePageChange = (page) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: page,
    }));
  };

  // Manejar cambio de tamaño de página
  const handlePageSizeChange = (size) => {
    setPagination((prev) => ({
      ...prev,
      pageSize: size,
      currentPage: 1,
    }));
  };

  // Usar mutación para guardar calificaciones
  const handleSaveScores = async () => {
    // Obtener los datos originales de la query
    const originalData = queryClient.getQueryData(['activity-grading', activityId]);
    const originalStudents = originalData?.studentsList?.items || [];
  
    // Filtrar solo los estudiantes con cambios
    const gradesData = allStudents
      .map((student) => {
        const originalStudent = originalStudents.find(s => s.id === student.id);
        
        // Comparar score y feedback
        const currentScore = scores[student.id] ? Math.round(Number(scores[student.id])) : 0;
        const originalScore = originalStudent?.score ? Math.round(originalStudent.score) : 0;
        
        const scoreChanged = currentScore !== originalScore;
        const feedbackChanged = feedbacks[student.id] !== (originalStudent?.feedBack || "");
  
        return {
          StudentId: student.id,
          Note: currentScore,
          Feedback: feedbacks[student.id] || "",
          hasChanges: scoreChanged || feedbackChanged
        };
      })
      .filter(student => student.hasChanges) // Solo mantener los que tengan cambios
      .map(({ ...rest }) => rest);
  
    if (gradesData.length === 0) {
      toast.error("No hay cambios por guardar");
      return;
    }
  
    // Mostrar conteo de cambios
    toast.loading(`Guardando ${gradesData.length} calificación(es) modificada(s)...`);
  
    await saveGradesMutation.mutateAsync({ activityId, gradesData });
  };

  // Restaurar datos iniciales
  const handleReset = async () => {
    setSelectedStudents([]);
    setFeedbacks({});
    await queryClient.invalidateQueries(['activity-grading', activityId]);
  };

  return {
    // Properties
    activity,
    tag,
    allStudents,
    selectedStudents,
    scores,
    feedbacks,
    filterOption,
    currentStudentId,
    currentStudentName,
    gradeSelectedFormik,
    feedbackFormik,
    isLoading,
    isPending,
    isFilterOpen,
    isModalOpen1,
    isModalOpen2,
    searchTerm,
    pageSizeOptions,
    currentItems: filteredStudents,
    totalItems: pagination.totalItems,
    totalPages: pagination.totalPages,
    pageSize: pagination.pageSize,
    currentPage: pagination.currentPage,
    hasPreviousPage: pagination.hasPreviousPage,
    hasNextPage: pagination.hasNextPage,
    // Methods
    handleSelectAll,
    handleSelectStudent,
    handleScoreChange,
    handleSaveScores,
    handleSearch,
    handlePageChange,
    handlePageSizeChange,
    handleOpenFeedbackModal,
    handleReset,
    setPageSize,
    setIsFilterOpen,
    setFilterOption,
    setIsModalOpen1,
    setIsModalOpen2,
    setCurrentStudentId,
  };
};
