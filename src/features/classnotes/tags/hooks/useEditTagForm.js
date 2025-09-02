import { useState } from "react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useTagsListStore } from "../store/useTagsListStore";
import { tagActivityValidationSchema } from "../forms";
import { editTag } from "../../../../shared/actions";

export const useEditTagForm = (goToStep, tag) => {
  const [isPending, setIsPending] = useState(false);
  const { fetchTagsAndStore } = useTagsListStore();

  // Validación del formulario con Formik
  const formik = useFormik({
    initialValues: {
      id: tag?.id || "",
      name: tag?.name || "",
      colorHex: tag?.colorHex || "",
      icon: tag?.icon || "",
    },
    enableReinitialize: true,
    validationSchema: tagActivityValidationSchema,
    onSubmit: async (values) => {
      const toastId = toast.loading("Editando etiqueta...");
      setIsPending(true);

      try {
        const result = await editTag(values);

        if (!result.status) {
          toast.error(result.message);
          console.error("Error al editar la etiqueta: ", result.message);
          return;
        }

        toast.success(result.message);
        
        // Actualizar tags
        fetchTagsAndStore();

        // Volver al paso anterior
        goToStep(0);

      } catch (error) {
        toast.error(
          "Ha ocurrido un error. Por favor, inténtelo más tarde.",
        );
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
