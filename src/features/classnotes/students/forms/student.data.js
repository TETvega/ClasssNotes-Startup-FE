import * as Yup from "yup";

export const studentInitValues = {
  students: [
    { firstName: "", lastName: "", email: "" },
    { firstName: "", lastName: "", email: "" },
  ],
  isSingleStudent: false,
  strictMode: true,
  teacherId: "jodsajdo23244",
  courseId: "dsfjnwenfkj4334",
};

export const studentValidationSchema = Yup.object({
  students: Yup.array()
    .of(
      Yup.object({
        firstName: Yup.string()
          .required("El primer nombre es obligatorio")
          .min(3, "El nombre debe tener al menos 3 caracteres"),
        lastName: Yup.string()
          .required("El apellido es obligatorio")
          .min(3, "El apellido debe tener al menos 3 caracteres"),
        email: Yup.string()
          .email("Correo electrónico inválido")
          .required("El correo electrónico es obligatorio"),
      }),
    )
    .test(
      "min-students",
      "Debe haber al menos un estudiante",
      function (students) {
        if (this.parent.isSingleStudent) {
          return (
            students.length >= 1 &&
            students[0]?.firstName &&
            students[0]?.lastName &&
            students[0]?.email
          );
        }
        return (
          students.length >= 2 &&
          students.filter((s) => s?.firstName && s?.lastName && s?.email)
            .length >= 2
        );
      },
    )
    .test(
      "unique-emails",
      "Emails duplicados no están permitidos en modo estricto",
      function (students) {
        if (!this.parent.strictMode) return true;

        const validStudents = students.filter((s) => s?.email?.trim());
        const emails = validStudents.map((s) => s.email.toLowerCase());
        const uniqueEmails = new Set(emails);
        return emails.length === uniqueEmails.size;
      },
    ),
  isSingleStudent: Yup.boolean().required(),
  strictMode: Yup.boolean().required(),
  teacherId: Yup.string().required(),
  courseId: Yup.string().required(),
});
