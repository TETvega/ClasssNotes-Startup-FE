import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRemindersStore } from "../store";
import { reminderInitValues, reminderValidationSchema } from "../forms";

export const useCreateReminderForm = ({
  courseId,
  closeCreateModal,
  setActiveButton,
}) => {
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);
  const createReminder = useRemindersStore((state) => state.createReminder);

  // Validación del formulario con Formik
  const formik = useFormik({
    initialValues: reminderInitValues,
    validationSchema: reminderValidationSchema,
    onSubmit: async (values) => {
      const toastId = toast.loading("Creando Nota...");
      setIsPending(true);

      try {
        const reminderData = { ...values, courseId };
        const result = await createReminder(reminderData);

        if (!result.status) {
          toast.error(result.message || "Error al crear la nota");
          console.error("Error al crear la nota:", result.message);
          return;
        }

        toast.success(result.message || "Nota creada exitosamente");
        formik.resetForm();
        closeCreateModal();
        setActiveButton("Pendientes");
        navigate(`/courses/${courseId}/reminders`);
      } catch (error) {
        toast.error(
          "El servidor no está disponible. Por favor, inténtelo más tarde.",
        );
        console.error("Error al crear la nota:", error);
      } finally {
        toast.dismiss(toastId);
        setIsPending(false);
      }
    },
  });

  return {
    navigate,
    setIsPending,
    formik,
    isPending,
  };
};
