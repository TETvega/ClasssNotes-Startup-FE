import * as Yup from "yup";

export const RecoverInitValues = {
  email: "",
};

export const RecoverValidationSchema = Yup.object({
  email: Yup.string()
    .email("Correo electrónico inválido")
    .required("El correo electrónico es obligatorio"),
});
