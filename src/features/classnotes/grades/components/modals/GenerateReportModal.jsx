import { Dialog } from "@headlessui/react";
import { useGenerateReportForm } from "../../hooks";
import BrutalButton from "../../../../../shared/components/ui/BrutalButton";

export const GenerateReportModal = ({
  isOpen,
  onClose,
  students,
  statistics,
  courseId,
}) => {
  const { formik, isPending } = useGenerateReportForm({
    students,
    statistics,
    courseId,
    onClose,
  });

  return (
    <Dialog
      as="div"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      open={isOpen}
      onClose={onClose}
    >
      <div className="mx-4 w-full rounded-lg border border-black bg-white p-4 shadow-lg sm:mx-auto sm:max-w-[520px] sm:p-6">
        <h2 className="mb-3 text-lg font-bold">Generar Reporte</h2>
        <p className="mb-3 text-sm">Generar un reporte de todo el curso</p>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="format"
              className="mb-2 block text-sm font-medium text-black"
            >
              Formato de salida
            </label>
            <select
              id="format"
              name="format"
              value={formik.values.format}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
            >
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
            </select>
            <div className="flex h-5 items-center">
              <p
                className={`text-sm text-red-500 ${
                  formik.touched.format && formik.errors.format
                    ? "opacity-100"
                    : "opacity-0"
                }`}
              >
                {formik.errors.format}
              </p>
            </div>
          </div>
          <div className="flex justify-between">
            <BrutalButton
              onClick={() => {
                formik.resetForm();
                onClose();
              }}
              variant="icon"
              className="bg-disabled-bg relative hover:bg-gray-300"
            >
              <span className="text-text-active-primary font-extrabold">
                Cancelar
              </span>
            </BrutalButton>
            <BrutalButton
              type="submit"
              variant="icon"
              disabled={formik.isSubmitting || isPending}
            >
              <span className="font-extrabold text-white">Generar reporte</span>
            </BrutalButton>
          </div>
        </form>
      </div>
    </Dialog>
  );
};
