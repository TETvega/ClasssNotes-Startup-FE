import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRemindersStore } from "../store";
import { reminderValidationSchema } from "../forms";

export const useEditReminderForm = ({
  reminderId,
  courseId,
  closeEditModal,
  setActiveButton,
}) => {
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);
  const getReminder = useRemindersStore((state) => state.getReminder);
  const updateReminder = useRemindersStore((state) => state.updateReminder);

  // Estado inicial para el formulario
  const [initialValues, setInitialValues] = useState({
    title: "",
    content: "",
    useDate: "",
  });

  // Cargar los datos del recordatorio
  useEffect(() => {
    const fetchReminder = async () => {
      setIsPending(true);
      const result = await getReminder(reminderId);
      if (result.status && result.data) {
        setInitialValues({
          title: result.data.title,
          content: result.data.content,
          useDate: result.data.useDate.split("T")[0], // Formato YYYY-MM-DD
        });
      } else {
        toast.error("No se pudo cargar el recordatorio.");
      }
      setIsPending(false);
    };
    if (reminderId) {
      fetchReminder();
    }
  }, [reminderId, getReminder]);

  // Validación del formulario con Formik
  const formik = useFormik({
    initialValues,
    validationSchema: reminderValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const toastId = toast.loading("Editando Nota...");
      setIsPending(true);

      try {
        const reminderData = { id: reminderId, courseId, ...values };
        const result = await updateReminder(reminderData);

        if (!result.status) {
          toast.error(result.message || "Error al editar la nota");
          console.error("Error al editar la nota:", result.message);
          return;
        }

        toast.success(result.message || "Nota editada exitosamente");
        formik.resetForm();
        closeEditModal();
        setActiveButton("Pendientes");
        navigate(`/courses/${courseId}/reminders`);
      } catch (error) {
        toast.error(
          "El servidor no está disponible. Por favor, inténtelo más tarde.",
        );
        console.error("Error al editar la nota:", error);
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
