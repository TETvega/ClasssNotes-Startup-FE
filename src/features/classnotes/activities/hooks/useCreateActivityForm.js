import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { activityInitValues, activityValidationSchema } from "../forms";
import { createActivity } from "../../../../shared/actions";

export const useCreateActivityForm = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [isPending, setIsPending] = useState(false);

  // Validación del formulario con Formik
  const formik = useFormik({
    initialValues: activityInitValues,
    validationSchema: activityValidationSchema,
    onSubmit: async (values) => {
      const toastId = toast.loading("Creando Actividad...");
      setIsPending(true);

      try {
        const result = await createActivity(values);

        if (!result.status) {
          toast.error(result.message);
          console.error("Error al crear la actividad: ", result.message);
          return;
        }

        toast.success(result.message);
        navigate(`/activities/${courseId}`);
        
      } catch (error) {
        toast.error("Ha ocurrido un error. Por favor, inténtelo más tarde.");
        console.error(error);
      } finally {
        toast.dismiss(toastId);
        setIsPending(false);
      } 
    },
  });

  return {
    formik,
    isPending,
    setIsPending,
  };
};
