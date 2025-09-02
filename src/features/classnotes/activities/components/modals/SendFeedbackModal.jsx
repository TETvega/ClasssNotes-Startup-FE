import { Dialog } from "@headlessui/react";
import BrutalButton from "../../../../../shared/components/ui/BrutalButton";

export const SendFeedbackModal = ({ isOpen, onClose, formik, studentName }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 flex items-center justify-center bg-black/50"
    >
      <div className="flex sm:w-1/2 flex-col rounded-lg bg-white p-6">
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col">
            <h3 className="mb-2 text-lg font-semibold">
              Retroalimentación para {studentName}
            </h3>
            <p className="text-base">Escriba un mensaje de retroalimentación acerca de la actividad</p>
            <textarea
              name="feedback"
              placeholder="Ej: Se necesita mejorar en..."
              rows={5}
              className="border-disabled-text mt-2 w-full rounded-lg border p-2 pl-3 text-sm sm:text-base"
              {...formik.getFieldProps("feedback")}
            />
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
                Guardar
              </BrutalButton>
            </div>
          </div>
        </form>
      </div>
    </Dialog>
  );
};
