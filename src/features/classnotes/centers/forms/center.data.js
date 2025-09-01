import * as Yup from "yup";

export const CenterData = Yup.object({
  nombre: Yup.string().required("El nombre es obligatorio"),
  abreviatura: Yup.string().max(5, "Máximo 5 caracteres"),
});

export const CreateInitialValuesCenter = Yup.object({
  nombre: "",
  abreviatura: "",
  logo: null,
});

export const EditInitialValuesCenter = (initialValues) => ({
  nombre: initialValues.name || "",
  abreviatura: initialValues.abbreviation || "",
  logo: initialValues.logoUrl || null,
});
