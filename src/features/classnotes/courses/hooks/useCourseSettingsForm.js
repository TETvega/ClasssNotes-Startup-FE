import { useFormik } from "formik";
import { useState } from "react";
import { showBrutalToast } from "../../../../shared/components/ui";

export const useCourseSettingsForm = () => {
  const [courseId, setCourseId] = useState(null);

  const formik = useFormik({
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = {
          data: { id: "3fa85f64-5717-4562-b3fc-2c963f66afa6" }, // Simulación de ID del backend
          status: true,
        };

        if (response.status) {
          setCourseId(response.data.id); // Guarda el ID recibido

          showBrutalToast({
            message: "Configuración guardada con éxito",
            icon: "<MdCheckCircle />",
            variant: "success",
            duration: 5000,
            position: "top-center",
            title: "Éxito",
          });

          resetForm();
        } else {
          showBrutalToast({
            message: "Ocurrió un error al guardar",
            icon: "<MdError />",
            variant: "error",
            duration: 5000,
            position: "top-center",
            title: "Error",
          });
        }
      } catch (error) {
        console.error("Error al enviar:", error);

        showBrutalToast({
          message: "Error al conectar con el servidor",
          icon: "<MdError />",
          variant: "error",
          duration: 5000,
          position: "top-center",
          title: "Error",
        });
      }
    },
  });

  return { formik, courseId };
};
