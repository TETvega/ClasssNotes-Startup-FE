import * as Yup from "yup";

export const reminderInitValues = {
  title: "",
  content: "",
  useDate: "",
};

export const reminderValidationSchema = Yup.object({
  title: Yup.string()
    .min(3, "El titulo debe tener al menos 3 caracteres")
    .max(50, "El titulo no puede exceder los 50 caracteres")
    .required("El titulo de la nota es obligatorio"),

  content: Yup.string()
    .max(1000, "Los detalles no pueden exceder los 1000 caracteres")
    .required("Los detalles de la nota son obligatorios"),

  useDate: Yup.date()
    .typeError("Debe ingresar una fecha válida")
    .required("La fecha es obligatoria.")
    .min(new Date(), "Fecha ya transcurrida.")
    .transform((value, originalValue) => {
      return originalValue ? new Date(originalValue) : null;
    }),
});
