import * as Yup from "yup";

export const NewPasswordInitValues = {
  password: "",
  password_confirmation: "",
};

export const NewPasswordValidationSchema = Yup.object({
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

  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden.")
    .required("La confirmación de la contraseña es obligatoria."),
});
