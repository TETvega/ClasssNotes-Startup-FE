import * as Yup from "yup";

export const courseSettingValidationSchema = Yup.object({
  name: Yup.string().required("El nombre de la configuración es requerido"),

  scoreType: Yup.string().required("El tipo de puntaje es requerido"),

  startDate: Yup.date().required("La fecha de inicio es requerida"),

  endDate: Yup.date().required("La fecha de finalización es requerida"),

  getLocationDto: Yup.object({
    x: Yup.string().required("Coordenada X requerida"),
    y: Yup.string().required("Coordenada Y requerida"),
  }),

  validateRangeMeters: Yup.number()
    .typeError("Debe ser un número")
    .required("La distancia de validación es requerida"),

  minimumGrade: Yup.number()
    .typeError("Debe ser un número")
    .required("La nota mínima es requerida"),

  maximumGrade: Yup.number()
    .typeError("Debe ser un número")
    .required("La nota máxima es requerida"),
    
  minimumAttendanceTime: Yup.number()
    .typeError("Debe ser un número")
    .required("El tiempo mínimo de asistencia es requerido"),
});

export const courseValidationSchema = Yup.object({
  courseName: Yup.string()
    .required("El nombre es requerido")
    .max(50, "Debe tener menos de 50 caracteres"),

  section: Yup.string().max(4, "Debe tener menos de 4 caracteres"),

  code: Yup.string().max(15, "Debe tener menos de 15 caracteres"),

  startTime: Yup.string().required("La hora de inicio es requerida"),

  finishTime: Yup.string(),

  centerId: Yup.string().required("El centro es requerido"),

  settingId: Yup.string().nullable(), 

  courseSetting: Yup.object().when("settingId", {
    is: (val) => !val || val.trim() === "",
    then: () =>
      courseSettingValidationSchema.required("La configuración es requerida"),
    otherwise: () => Yup.object().nullable(),
  }),

  units: Yup.array()
    .of(
      Yup.object().shape({
        maxScore: Yup.number()
          .typeError("Debe ser un número")
          .required("La nota máxima es requerida"),
      }),
    )
    .min(1, "Debe haber al menos una unidad")
    .required("Debe haber al menos una unidad"),
});
