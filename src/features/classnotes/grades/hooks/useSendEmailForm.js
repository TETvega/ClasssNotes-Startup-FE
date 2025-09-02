import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { emailInitValues, emailValidationSchema } from "../forms";
import { sendEmailToAllStudents, sendEmailToStudent } from "../../../../shared/actions";

export const useSendEmailForm = ({
  students,
  selectedStudents,
  studentIdFromMailIcon,
  isFromSendButton,
  isFromActionsLot,
  onClose,
  courseId,
}) => {
  const [isPending, setIsPending] = useState(false);

  // Determinar la opción del modal según su contexto
  const initialRecipients = studentIdFromMailIcon
    ? "selectedStudents"
    : isFromActionsLot
      ? "selectedStudents"
      : isFromSendButton
        ? "allStudents"
        : "selectedStudents";

  const formik = useFormik({
    initialValues: {
      ...emailInitValues,
      recipients: initialRecipients,
    },
    validationSchema: emailValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const toastId = toast.loading("Enviando correos...");
      setIsPending(true);

      try {
        let result;

        if (values.recipients === "allStudents") {
          // Para enviar calificaciones a todos los estudiantes
          result = await sendEmailToAllStudents({
            courseId,
            content: `${values.subject}\n\n${values.message}`,
          });

          if (!result.status) {
            throw new Error(result.message);
          }

          toast.success(
            "Correos enviados exitosamente a todos los estudiantes",
          );
          onClose();
          formik.resetForm();
        } else {
          // Para enviar calificaciones a uno o varios estudiantes
          let results = [];
          let studentsToEmail = [];

          if (studentIdFromMailIcon) {
            const result = await sendEmailToStudent({
              courseId,
              studentId: studentIdFromMailIcon,
              content: `${values.subject}\n\n${values.message}`,
            });
            results.push(result);
            studentsToEmail = students.filter(
              (s) => s.id === studentIdFromMailIcon,
            );
          } else {
            studentsToEmail = students.filter((s) =>
              selectedStudents.includes(s.id),
            );
            for (const studentId of selectedStudents) {
              const result = await sendEmailToStudent({
                courseId,
                studentId,
                content: `${values.subject}\n\n${values.message}`,
              });
              results.push(result);
            }
          }

          const allSuccessful = results.every((result) => result.status);

          if (allSuccessful) {
            toast.success("Todos los correos se enviaron exitosamente");
            onClose();
            formik.resetForm();
          } else {
            const failedEmails = results
              .filter((result) => !result.status)
              .map((result) => result.message)
              .join(", ");
            toast.error(
              `Algunos correos no se pudieron enviar: ${failedEmails}`,
            );
          }
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "El servidor no está disponible. Por favor, inténtelo más tarde.";
        toast.error(errorMessage);
      } finally {
        setIsPending(false);
        toast.dismiss(toastId);
      }
    },
  });

  return {
    formik,
    isPending,
  };
};
