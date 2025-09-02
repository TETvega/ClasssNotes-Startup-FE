import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTagsListStore } from "../store/useTagsListStore";
import { tagActivityInitValues, tagActivityValidationSchema } from "../forms";
import { createTag } from "../../../../shared/actions";

export const useCreateTagForm = (goToStep) => {
  const [isPending, setIsPending] = useState(false);
  const { fetchTagsAndStore } = useTagsListStore();

  const formik = useFormik({
    initialValues: tagActivityInitValues,
    validationSchema: tagActivityValidationSchema,
    onSubmit: async (values) => {
      const toastId = toast.loading("Creando etiqueta...");
      setIsPending(true);

      try {
        const result = await createTag(values);

        if (!result.status) {
          toast.error(result.message);
          console.error("Error al crear la etiqueta: ", result.message);
          return;
        }

        toast.success(result.message);

        // Actualizar tags
        fetchTagsAndStore();

        // Volver al paso anterior
        goToStep(0);
        
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
