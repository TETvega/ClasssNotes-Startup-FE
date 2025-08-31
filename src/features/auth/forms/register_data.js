import * as Yup from "yup";

// Valores iniciales para el formulario de registro
export const registerInitValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

// Esquema de validación para el formulario de registro utilizando Yup
export const registerValidationSchema = Yup.object({
  // Validación para el campo de nombre
  firstName: Yup.string()
    .max(30, "El nombre no puede tener más de 30 caracteres")
    .required("El nombre es obligatorio"),

  // Validación para el campo de apellido
  lastName: Yup.string()
    .max(30, "El apellido no puede tener más de 30 caracteres")
    .required("El apellido es obligatorio"),

  // Validación para el campo de correo electrónico
  email: Yup.string()
    .email("Correo electrónico inválido")
    .required("El correo electrónico es obligatorio"),

  // Validación para el campo de contraseña
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres.")
    .matches(
      /[A-Z]/,
      "La contraseña debe contener al menos una letra mayúscula.",
    )
    .matches(
      /[a-z]/,
      "La contraseña debe contener al menos una letra minúscula.",
    )
    .matches(/[0-9]/, "La contraseña debe contener al menos un número.")
    .matches(
      /[@$!%*?&]/,
      "La contraseña debe contener al menos un carácter especial (@$!%*?&).",
    )
    .required("La contraseña es obligatoria."),

  // Validación para el campo de confirmación de contraseña
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden")
    .required("Debes confirmar la contraseña"),
});
