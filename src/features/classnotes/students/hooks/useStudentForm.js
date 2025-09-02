import { useTransition } from "react";
import { useFormik } from "formik";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { studentInitValues, studentValidationSchema } from "../forms";
import { createStudentsBulkAsync } from "../../../../shared/actions";

export const useStudentForm = () => {
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();
  const { courseId } = useParams();

  const formik = useFormik({
    initialValues: studentInitValues,
    validationSchema: studentValidationSchema,
    onSubmit: async (values, { setSubmitting, setFieldError, resetForm }) => {
      setSubmitting(true);
      const toastId = toast.loading("Creando estudiantes...");

      // Validación de emails duplicados (solo detección)
      const emailMap = {};
      const duplicates = values.students.reduce((acc, student, index) => {
        if (!student.email) return acc;

        const lowerEmail = student.email.toLowerCase();
        if (emailMap[lowerEmail]) {
          acc.push({ email: lowerEmail, index });
        } else {
          emailMap[lowerEmail] = true;
        }
        return acc;
      }, []);

      // Modo estricto: mostrar errores si hay duplicados
      if (values.strictMode && duplicates.length > 0) {
        duplicates.forEach(({ index }) => {
          setFieldError(`students[${index}].email`, "Email duplicado");
          formik.setFieldTouched(`students[${index}].email`, true);
        });

        toast.error(
          `Correos duplicados detectados: ${duplicates.map((d) => d.email).join(", ")}`,
          { id: toastId, duration: 5000 },
        );
        setSubmitting(false);
        return;
      }

      // Datos a enviar al backend
      const dataToSend = {
        StricMode: values.strictMode,
        courseId: courseId || values.courseId,
        students: values.students.map((student) => ({
          firstName: student.firstName.trim(),
          lastName: student.lastName.trim(),
          email: student.email.trim(),
        })),
      };

      startTransition(async () => {
        try {
          const response = await createStudentsBulkAsync(dataToSend);

          if (!response.status) {
            throw new Error(response.message || "Error al crear estudiantes");
          }

          // Invalidar la consulta de estudiantes para actualizar la lista
          await queryClient.invalidateQueries({
            queryKey: ["students", courseId],
          });

          toast.success(
            `${values.students.length} estudiante(s) creado(s) correctamente`,
            { id: toastId },
          );

          resetForm();
          setSubmitting(false);
        } catch (err) {
          console.error("Error al crear estudiantes:", err);
          toast.error(err.message || "Error al crear estudiantes", {
            id: toastId,
          });
          setSubmitting(false);
        }
      });
    },
  });

  return { formik, isPending };
};
