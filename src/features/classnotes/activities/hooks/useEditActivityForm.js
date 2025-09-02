import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editActivity, getActivityById } from "../../../../shared/actions";
import { activityValidationSchema } from "../forms";

export const useEditActivityForm = (activityId) => {
  const [isPending, setIsPending] = useState(false);
  const { courseId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Consulta para cargar los datos de la actividad
  const { data: activityData, isLoading: isQueryLoading } = useQuery({
    queryKey: ['activity', activityId],
    queryFn: async () => {
      if (!activityId) return null;
      const result = await getActivityById(activityId);
      if (!result.status) {
        throw new Error(result.message);
      }
      return result.data;
    },
    refetchOnWindowFocus: false,
    enabled: !!activityId,
    onError: (error) => {
      toast.error(error.message || "No se pudo cargar la actividad");
    }
  });

  // Mutation para editar la actividad
  const editMutation = useMutation({
    mutationFn: (values) => editActivity(activityId, values),
    onMutate: () => {
      setIsPending(true);
    },
    refetchOnWindowFocus: false,
    onSuccess: (result) => {
      if (result.status) {
        toast.success(result.message);
        // Invalida las queries relacionadas
        queryClient.invalidateQueries(['activity', activityId]);
        queryClient.invalidateQueries(['activities-course', courseId]);
        navigate(`/activities/${courseId}`);
      } else {
        toast.error(result.message);
      }
    },
    onError: (error) => {
      toast.error("Ha ocurrido un problema. Por favor, inténtelo más tarde.");
      console.error(error);
    },
    onSettled: () => {
      setIsPending(false);
    }
  });

  // Estado inicial del formulario
  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
    unitId: "",
    tagActivityId: "",
    qualificationDate: "",
    isExtra: false,
    maxScore: 0,
  });

  // Actualizar valores iniciales cuando los datos cargan
  useEffect(() => {
    if (activityData) {
      const unitId = activityData.unit?.id 
        ? String(activityData.unit.id) 
        : activityData.unitId 
          ? String(activityData.unitId) 
          : "";

      setInitialValues({
        name: activityData.name,
        description: activityData.description,
        unitId: unitId,
        tagActivityId: activityData.tagActivityId,
        qualificationDate: activityData.qualificationDate.split("T")[0],
        isExtra: activityData.isExtra,
        maxScore: activityData.maxScore,
      });
    }
  }, [activityData]);

  // Formik
  const formik = useFormik({
    initialValues,
    validationSchema: activityValidationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      editMutation.mutate(values);
    },
  });

  return {
    formik,
    isPending: isPending || isQueryLoading,
    setIsPending,
  };
};
