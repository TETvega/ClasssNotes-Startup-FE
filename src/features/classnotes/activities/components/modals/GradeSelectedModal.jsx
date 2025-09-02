import { Dialog } from "@headlessui/react";
import BrutalButton from "../../../../../shared/components/ui/BrutalButton";

export const GradeSelectedModal = ({
  isOpen,
  onClose,
  selectedStudents,
  maxScore,
  formik,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 flex items-center justify-center bg-black/50"
    >
      <div className="flex sm:w-1/3 flex-col rounded-lg bg-white p-6">
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col">
            <h3 className="mb-2 text-lg font-semibold">
              Calificar {selectedStudents.length} estudiantes
            </h3>
            <p className="mb-2 text-base">
              Asignar calificación (0-{maxScore})
            </p>
            <input
              type="number"
              min="0"
              max={maxScore}
              className={`w-auto rounded-md border ${formik.errors.note && formik.touched.note ? "border-red-500" : "border-gray-300"} px-2 py-1`}
              style={{
                WebkitAppearance: "none",
                MozAppearance: "textfield",
              }}
              onInput={(e) => { // Validar que no se ingresen caracteres invalidos
                let value = e.target.value;
                value = value.replace(/[^0-9]/g, "");
                if (Number(value) > maxScore) {value = maxScore.toString()}
                e.target.value = value;
              }}
              {...formik.getFieldProps("note")}
            />
            {formik.errors.note && formik.touched.note && (
              <div className="mt-1 text-sm text-red-500">
                {formik.errors.note}
              </div>
            )}
          </div>
          <div className="mt-4 flex w-full justify-end">
            <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:justify-end">
              <BrutalButton
                className="h-10 px-14 sm:w-30"
                variant="secondary"
                type="button"
                onClick={() => {
                  onClose();
                  formik.resetForm();
                }}
              >
                Cancelar
              </BrutalButton>
              <BrutalButton
                className="h-10 w-full sm:w-full md:w-30"
                variant="primary"
                type="submit"
              >
                Aplicar
              </BrutalButton>
            </div>
          </div>
        </form>
      </div>
    </Dialog>
  );
};
