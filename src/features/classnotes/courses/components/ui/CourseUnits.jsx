import { useWizard } from "react-use-wizard";
import { FiBookOpen } from "react-icons/fi";
import BrutalButton from "../../../../../shared/components/ui/BrutalButton";

export function Step4({ formik, isLoading }) {
  const { previousStep } = useWizard();
  const unitCount = formik.values.units.length;
  const columns = unitCount >= 4 ? "grid-cols-4" : `grid-cols-${unitCount}`;
  const justify = unitCount < 4 ? "justify-center" : "";
  const scoreType = formik.values.courseSetting.scoreType;
  const maxGrade = parseInt(formik.values.courseSetting.maximumGrade, 10);

  const handleUnitChange = (index, value) => {
    const updatedUnits = [...formik.values.units];
    updatedUnits[index].maxScore = parseInt(value, 10);
    formik.setFieldValue("units", updatedUnits);
  };

  const handleUnitsCountChange = (e) => {
    let count = parseInt(e.target.value, 10);
    if (count > 9) count = 9;
    if (count < 1) count = 1;

    const currentUnits = formik.values.units;
    let newUnits = [];

    if (count > currentUnits.length) {
      newUnits = [
        ...currentUnits,
        ...Array.from({ length: count - currentUnits.length }, () => ({
          maxScore: scoreType === "ARITHMETIC_SCORE" ? maxGrade : 100,
        })),
      ];
    } else {
      newUnits = currentUnits.slice(0, count);
    }

    // En tipo aritmético, ajustar pesos automáticamente al maxGrade
    if (scoreType === "ARITHMETIC_SCORE") {
      newUnits = newUnits.map((u) => ({ ...u, maxScore: maxGrade }));
    }

    formik.setFieldValue("units", newUnits);
  };

  const validateWeightedUnits = () => {
    if (scoreType === "WEIGHTED_SCORE") {
      const total = formik.values.units.reduce(
        (sum, u) => sum + Number(u.maxScore),
        0,
      );
      const hasInvalid = formik.values.units.some(
        (u) => Number(u.maxScore) <= 0,
      );
      if (hasInvalid) return "No se permiten valores en 0 o negativos.";
      if (total !== maxGrade)
        return `La suma debe ser igual a ${maxGrade}. Actualmente suma ${total}`;
    }
    return null;
  };

  const validationMessage = validateWeightedUnits();

  return (
    <div className="space-y-6">
      <div className="border-disabled-text border-t-2">
        <h2 className="py-3 text-xl font-bold">Configuración de unidades</h2>
      </div>

      <div className="mt-2 flex flex-row items-center gap-4">
        <label>Cantidad de unidades:</label>
        <input
          type="number"
          value={unitCount}
          onChange={handleUnitsCountChange}
          className="mt-1 w-auto rounded border p-2"
          min={1}
          max={9}
        />
        <label>
          Tipo de puntaje:{" "}
          {scoreType === "ARITHMETIC_SCORE"
            ? "Aritmético"
            : scoreType === "WEIGHTED_SCORE"
              ? "Ponderado"
              : "Puntos oro"}
        </label>
      </div>

      {scoreType === "WEIGHTED_SCORE" && validationMessage && (
        <p className="text-sm text-red-500">{validationMessage}</p>
      )}

      {/* {scoreType !== "GOLD_SCORE" && ( */}
      <div className="max-h-[400px] overflow-y-auto pr-1">
        <div
          className={`border-disabled-text-bg grid h-88 gap-4 border-b-2 ${columns} ${justify}`}
        >
          {formik.values.units.map((unit, i) => (
            <div
              key={i}
              className={`h-40 rounded border p-4 text-center ${scoreType === "GOLD_SCORE" ? "flex flex-col items-center justify-center" : ""}`}
            >
              <div className="flex justify-center">
                <FiBookOpen size={45} />
              </div>
              <div className="mb-2 font-extrabold">Unidad {i + 1}</div>
              <input
                type="number"
                value={unit.maxScore}
                onChange={(e) => handleUnitChange(i, e.target.value)}
                className={`mt-1 w-full rounded border p-2 ${scoreType === "GOLD_SCORE" ? "hidden" : ""}`}
                disabled={scoreType === "ARITHMETIC_SCORE"}
                min={scoreType === "WEIGHTED_SCORE" ? 1 : undefined}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <div className="w-28">
          <BrutalButton variant="secondary" onClick={previousStep}>
            Anterior
          </BrutalButton>
        </div>
        <div className="w-28">
          <BrutalButton
            variant="primary"
            onClick={() => {
              if (!validationMessage) {
                formik.submitForm();
              }
            }}
            disabled={!!validationMessage || isLoading}
          >
            Guardar
          </BrutalButton>
        </div>
      </div>
    </div>
  );
}
