import { useWizard } from "react-use-wizard";
import BrutalButton from "../../../../../shared/components/ui/BrutalButton";

export function Step2({
  formik,
  scoreType,
  setScoreType,
  isScoreTypeReadOnly,
}) {
  const { nextStep, previousStep } = useWizard();

  console.log(isScoreTypeReadOnly);

  return (
    <div className="space-y-6">
      <div className="border-disabled-text-bg border-t-2 border-b-2">
        <h2 className="py-3 text-xl font-bold">Sistema de evaluación</h2>

        <div className="mb-6 grid grid-cols-2 gap-4">
          <div className="mt-2">
            <label>Tipo de puntaje</label>
            <select
              name="courseSetting.scoreType"
              className={`mt-1 w-full rounded border p-2 ${isScoreTypeReadOnly ? "cursor-not-allowed bg-gray-200 text-gray-500" : ""}`}
              value={formik.values.courseSetting.scoreType}
              disabled={isScoreTypeReadOnly}
              onChange={(e) => {
                setScoreType(e.target.value); // actualiza estado local
                formik.handleChange(e); // actualiza Formik
              }}
              onBlur={formik.handleBlur}
            >
              <option value="">Seleccionar</option>
              <option value="ARITHMETIC_SCORE">Aritmético</option>
              <option value="WEIGHTED_SCORE">Ponderado</option>
              <option value="GOLD_SCORE">Puntos oro</option>
            </select>
            {formik.touched.courseSetting?.scoreType &&
              formik.errors.courseSetting?.scoreType && (
                <p className="mt-1 text-sm text-red-500">
                  {formik.errors.courseSetting?.scoreType}
                </p>
              )}
          </div>
          <div className="mt-2">
            <label>Calificación mínima (aprobación)</label>
            <input
              type="number"
              name="courseSetting.minimumGrade"
              value={formik.values.courseSetting.minimumGrade}
              onChange={(e) => {
                if (!isScoreTypeReadOnly) {
                  formik.setFieldValue(
                    "courseSetting.minimumGrade",
                    e.target.value,
                  );
                }
              }}
              disabled={isScoreTypeReadOnly}
              onBlur={formik.handleBlur}
              className={`mt-1 w-full rounded border p-2 ${isScoreTypeReadOnly ? "cursor-not-allowed bg-gray-200 text-gray-500" : ""}`}
              placeholder="Ej. 60"
            />
            {formik.touched.courseSetting?.minimumGrade &&
              formik.errors.courseSetting?.minimumGrade && (
                <p className="mt-1 text-sm text-red-500">
                  {formik.errors.courseSetting?.minimumGrade}
                </p>
              )}
          </div>
          <div className="mt-2">
            <label>Calificación máxima</label>
            <input
              type="number"
              name="courseSetting.maximumGrade"
              value={formik.values.courseSetting.maximumGrade}
              onChange={(e) => {
                if (!isScoreTypeReadOnly) {
                  formik.setFieldValue(
                    "courseSetting.maximumGrade",
                    e.target.value,
                  );
                }
              }}
              disabled={isScoreTypeReadOnly}
              onBlur={formik.handleBlur}
              className={`mt-1 w-full rounded border p-2 ${isScoreTypeReadOnly ? "cursor-not-allowed bg-gray-200 text-gray-500" : ""}`}
              placeholder="100 máximo"
            />
            {formik.touched.courseSetting?.maximumGrade &&
              formik.errors.courseSetting?.maximumGrade && (
                <p className="mt-1 text-sm text-red-500">
                  {formik.errors.courseSetting?.maximumGrade}
                </p>
              )}
          </div>
          <div className="mt-2">
            <label>Duración de toma de asistencia (minutos)</label>
            <input
              type="number"
              name="courseSetting.minimumAttendanceTime"
              value={formik.values.courseSetting.minimumAttendanceTime}
              onChange={(e) => {
                if (!isScoreTypeReadOnly) {
                  formik.setFieldValue(
                    "courseSetting.minimumAttendanceTime",
                    e.target.value,
                  );
                }
              }}
              disabled={isScoreTypeReadOnly}
              onBlur={formik.handleBlur}
              className={`mt-1 w-full rounded border p-2 ${isScoreTypeReadOnly ? "cursor-not-allowed bg-gray-200 text-gray-500" : ""}`}
              placeholder="5 mínimo"
            />
            {formik.touched.courseSetting?.minimumAttendanceTime &&
              formik.errors.courseSetting?.minimumAttendanceTime && (
                <p className="mt-1 text-sm text-red-500">
                  {formik.errors.courseSetting?.minimumAttendanceTime}
                </p>
              )}
          </div>
          <div className="mt-2">
            <label>Fecha de inicio</label>
            <input
              type="date"
              name="courseSetting.startDate"
              value={formik.values.courseSetting.startDate}
              onChange={(e) => {
                if (!isScoreTypeReadOnly) {
                  formik.setFieldValue(
                    "courseSetting.startDate",
                    e.target.value,
                  );
                }
              }}
              disabled={scoreType.isReadOnly}
              onBlur={isScoreTypeReadOnly}
              className={`mt-1 w-full cursor-pointer rounded border p-2 ${isScoreTypeReadOnly ? "cursor-not-allowed bg-gray-200 text-gray-500" : ""}`}
            />
            {formik.touched.courseSetting?.startDate &&
              formik.errors.courseSetting?.startDate && (
                <p className="mt-1 text-sm text-red-500">
                  {formik.errors.courseSetting?.startDate}
                </p>
              )}
          </div>
          <div className="mt-2">
            <label>Fecha de finalización</label>
            <input
              type="date"
              name="courseSetting.endDate"
              value={formik.values.courseSetting.endDate}
              onChange={(e) => {
                if (!isScoreTypeReadOnly) {
                  formik.setFieldValue("courseSetting.endDate", e.target.value);
                }
              }}
              disabled={isScoreTypeReadOnly}
              onBlur={formik.handleBlur}
              className={`mt-1 w-full cursor-pointer rounded border p-2 ${isScoreTypeReadOnly ? "cursor-not-allowed bg-gray-200 text-gray-500" : ""}`}
            />
            {formik.touched.courseSetting?.endDate &&
              formik.errors.courseSetting?.endDate && (
                <p className="mt-1 text-sm text-red-500">
                  {formik.errors.courseSetting?.endDate}
                </p>
              )}
          </div>
          <div className="mt-2">
            <label>
              Distancia permitida para marcar asistencia (en metros)
            </label>
            <input
              type="number"
              name="courseSetting.validateRangeMeters"
              value={formik.values.courseSetting.validateRangeMeters}
              onChange={(e) => {
                if (!isScoreTypeReadOnly) {
                  formik.setFieldValue(
                    "courseSetting.validateRangeMeters",
                    e.target.value,
                  );
                }
              }}
              onBlur={formik.handleBlur}
              disabled={isScoreTypeReadOnly}
              className={`mt-1 w-full rounded border p-2 ${isScoreTypeReadOnly ? "cursor-not-allowed bg-gray-200 text-gray-500" : ""}`}
              placeholder="30 mínimo"
            />
            {formik.touched.courseSetting?.validateRangeMeters &&
              formik.errors.courseSetting?.validateRangeMeters && (
                <p className="mt-1 text-sm text-red-500">
                  {formik.errors.courseSetting?.validateRangeMeters}
                </p>
              )}
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="w-28">
          <BrutalButton variant="secondary" onClick={previousStep}>
            Anterior
          </BrutalButton>
        </div>
        <div className="w-28">
          <BrutalButton variant="primary" onClick={nextStep}>
            Siguiente
          </BrutalButton>
        </div>
      </div>
    </div>
  );
}
