import * as Yup from "yup";

export const tagActivityInitValues = {
  name: "",
  colorHex: "",
  icon: "",
};

// Lista de iconos por defecto que se permiten ingresar
const validIcons = [
  "doc",
  "book",
  "message",
  "project",
  "flask",
  "completed",
  "forum",
  "presentation",
  "star",
  "award",
  "travel",
  "tasks",
  "question",
  "movies",
  "content",
];

export const tagActivityValidationSchema = Yup.object({
  name: Yup.string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(15, "El nombre no puede exceder los 15 caracteres")
    .required("El nombre de la etiqueta es obligatorio"),

  colorHex: Yup.string()
    .matches(
      /^[A-Fa-f0-9]{6}$/,
      "El código hexadecimal debe tener el formato correcto, sin incluir el #.",
    )
    .required("Es requerido ingresar el código hexadecimal de la etiqueta."),

  icon: Yup.string()
    .oneOf(validIcons, "El icono seleccionado no es válido.")
    .required("Es requerido ingresar un icono para la etiqueta."),
});
