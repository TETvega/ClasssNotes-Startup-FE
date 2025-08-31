import * as Yup from 'yup';

export const loginInitValues = {
  email: '',
  password: '',
}

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Correo electrónico inválido")
    .required("El correo electrónico es obligatorio"),
  password: Yup.string()
    .required('La contraseña es obligatoria.'),
});