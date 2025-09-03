import * as Yup from "yup";

export const initialValues = {
  email: "",
};

export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Ingrese un correo electrónico válido")
    .required("El correo electrónico es requerido."),
});
