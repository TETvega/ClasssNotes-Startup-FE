import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { studentInitValues } from "../forms";
import { updateStudentAsync } from "../../../../shared/actions";

// Esquema de validación para un solo estudiante
const singleStudentValidationSchema = Yup.object({
  firstName: Yup.string()
    .trim()
    .required("El nombre es obligatorio")
    .min(3, "El nombre debe tener al menos 3 caracteres"),
  lastName: Yup.string()
    .trim()
    .required("El apellido es obligatorio")
    .min(3, "El apellido debe tener al menos 3 caracteres"),
  email: Yup.string()
    .trim()
    .email("Correo electrónico inválido")
    .required("El correo electrónico es obligatorio"),
});

export const useStudentEditForm = (student, onClose) => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [isPending, setIsPending] = useState(false);
  const queryClient = useQueryClient();

  // Configuración de Formik
  const formik = useFormik({
    initialValues: {
      firstName: student?.firstName || studentInitValues.students[0].firstName,
      lastName: student?.lastName || studentInitValues.students[0].lastName,
      email: student?.eMail || studentInitValues.students[0].email,
    },
    validationSchema: singleStudentValidationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting }) => {
      const toastId = toast.loading("Editando estudiante...");
      setIsPending(true);

      try {
        // Llamada al backend para actualizar el estudiante
        const response = await updateStudentAsync(student.studentId, {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
        });

        if (!response.status) {
          throw new Error(
            response.message || "Error al actualizar el estudiante",
          );
        }

        // Actualizar la lista de estudiantes
        await queryClient.invalidateQueries({
          queryKey: ["students", courseId],
        });

        toast.success("Estudiante editado correctamente", { id: toastId });
        onClose();
        setSubmitting(false);
        setIsPending(false);
        navigate(`/courses/${courseId}/students`);
      } catch (error) {
        toast.error(`${error.message}`, {
          id: toastId,
        });
        setSubmitting(false);
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
