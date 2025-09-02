import * as Yup from "yup";

// Valores iniciales para el formulario
export const reportInitValues = {
  format: "pdf",
};

// Esquema de validación para el formulario
export const reportValidationSchema = Yup.object({
  format: Yup.string()
    .oneOf(["pdf", "excel"], "Formato no válido")
    .required("El formato de salida es obligatorio"),
});
