import * as Yup from "yup";

export const activityInitValues = {
  name: "",
  description: "",
  unitId: "",
  tagActivityId: "",
  qualificationDate: "",
  isExtra: false,
  maxScore: 0,
};

export const activityValidationSchema = Yup.object({
  name: Yup.string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(50, "El nombre no puede exceder los 50 caracteres")
    .required("El nombre de la actividad es obligatorio"),

  description: Yup.string()
    .max(200, "La descripción no puede exceder los 200 caracteres")
    .notRequired(),

  unitId: Yup.string()
    .required("Seleccionar una unidad es obligatorio")
    .test(
      "is-not-default",
      "Debe seleccionar una unidad válida",
      (value) => value !== "" && value !== undefined,
    ),

  tagActivityId: Yup.string()
    .required("Seleccionar una etiqueta es obligatorio")
    .test(
      "is-not-default",
      "Debe seleccionar una etiqueta válida",
      (value) => value !== "" && value !== undefined,
    ),

  qualificationDate: Yup.date()
    .typeError("Debe ingresar una fecha válida")
    .required("La fecha de calificación es obligatoria")
    .min(new Date(), "La fecha no puede ser anterior al día actual")
    .transform((value, originalValue) => {
      return originalValue ? new Date(originalValue) : null;
    }),

  isExtra: Yup.boolean().required(
    "Debe especificar si la actividad es sobre 100 puntos",
  ),

  maxScore: Yup.number()
    .typeError("Debe ingresar un número válido")
    .required("La calificación máxima es obligatoria")
    .positive("La calificación debe ser un número positivo")
    .min(1, "La calificación mínima es 1")
    .max(100, "La calificación máxima no puede exceder 100"),
});
