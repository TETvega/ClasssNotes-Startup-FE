import * as Yup from 'yup';

export const courseSettingValidationSchema = Yup.object({
  settingName: Yup.string()
    .required('El nombre es requerido')
    .max(25, 'Debe tener menos de 25 caracteres'),

  scoreType: Yup.string()
    .required('El tipo de puntuación es requerido')
    .max(15, 'Debe tener menos de 15 caracteres'),

  startDate: Yup.date()
    .required('La fecha de inicio es requerida'),

  endDate: Yup.date()
    .nullable(),

  locationX: Yup.number()
    .required('La ubicación X es requerida'),

  locationY: Yup.number()
    .required('La ubicación Y es requerida'),

  validateRangeMeters: Yup.number()
    .required('El rango de validación es requerido')
    .min(30, 'Mínimo 30 metros')
    .max(200, 'Máximo 200 metros'),

  minimumGrade: Yup.number()
    .required('La nota mínima es requerida')
    .min(0, 'Debe ser mayor o igual a 0')
    .max(100, 'Debe ser menor o igual a 100'),

  maximumGrade: Yup.number()
    .required('La nota máxima es requerida')
    .min(0, 'Debe ser mayor o igual a 0')
    .max(100, 'Debe ser menor o igual a 100'),

  minimumAttendanceTime: Yup.number()
    .required('El tiempo mínimo para asistencia es requerido')
    .min(5, 'Mínimo 5 minutos')
    .max(59, 'Máximo 59 minutos'),
});
