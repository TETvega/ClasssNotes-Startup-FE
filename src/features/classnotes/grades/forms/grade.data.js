import * as Yup from "yup";

// Valores iniciales para el formulario
export const emailInitValues = {
  recipients: "selectedStudents", // Puede ser "allStudents" o "selectedStudents"
  subject: "",
  message: "",
};

// Esquema de validación para el formulario
export const emailValidationSchema = Yup.object({
  recipients: Yup.string()
    .oneOf(["allStudents", "selectedStudents"], "Debe seleccionar un grupo de destinatarios")
    .required("El campo 'Destinatarios' es obligatorio"),

  subject: Yup.string()
    .min(3, "El asunto debe tener al menos 3 caracteres")
    .max(50, "El asunto no puede exceder los 50 caracteres")
    .required("El asunto del correo es obligatorio"),

  message: Yup.string()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(1000, "El mensaje no puede exceder los 1000 caracteres")
    .required("El mensaje es obligatorio"),
});