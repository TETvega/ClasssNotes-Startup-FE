import { Dialog } from "@headlessui/react";
import { useSendEmailForm } from "../../hooks";
import { useState } from "react";
import { SendEmailWarningModal } from "./SendEmailWarningModal";
import BrutalButton from "../../../../../shared/components/ui/BrutalButton";

export const SendEmailModal = ({
  isOpen,
  onClose,
  isFromSendButton,
  selectedCount,
  studentIdFromMailIcon,
  studentNameFromMailIcon,
  isFromActionsLot,
  students,
  selectedStudents,
  endDate,
  courseId,
}) => {
  const { formik, isPending } = useSendEmailForm({
    students,
    selectedStudents,
    studentIdFromMailIcon,
    isFromSendButton,
    isFromActionsLot,
    onClose,
    courseId,
  });

  const disableRadioOptions = true;

  // Determinar la opción según contexto
  const displayCount =
    formik.values.recipients === "allStudents"
      ? 0 // Mostrar 0 para "Todos los estudiantes"
      : studentIdFromMailIcon
        ? 1 // Para botón en la tabla: Mostrar 1 estudiante seleccionado
        : selectedCount; // Para enviar correos: Mostrar Estudiantes seleccionados + contador de seleccionados

  const [showWarningModal, setShowWarningModal] = useState(false);

  const handleCloseWarningModal = () => {
    setShowWarningModal(false);
  };

  const handleOpenWarningModal = async () => {
    try {
      const errors = await formik.validateForm();

      if (Object.keys(errors).length === 0) {
        // Verificar si ya finalizó el curso
        const nowDate = new Date();
        const endCourseDate = new Date(endDate);
        if (nowDate < endCourseDate) {
          setShowWarningModal(true);
        } else {
          formik.handleSubmit();
        }
      }
    } catch (error) {
      console.error("Error al enviar correo:", error);
    }
  };

  const handleConfirmSend = () => {
    formik.handleSubmit();
    handleCloseWarningModal();
  };

  return (
    <>
      {showWarningModal && (
        <SendEmailWarningModal
          isOpen={showWarningModal}
          onClose={handleCloseWarningModal}
          onConfirm={handleConfirmSend}
        />
      )}
      {!showWarningModal && (
        <Dialog
          as="div"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          open={isOpen}
          onClose={onClose}
        >
          <div className="mx-4 w-full rounded-lg border border-black bg-white p-4 shadow-lg sm:mx-auto sm:max-w-[520px] sm:p-6">
            <h2 className="mb-3 text-lg font-bold">
              Enviar calificaciones por correo
            </h2>
            {studentIdFromMailIcon && (
              <p className="mb-2 text-sm text-gray-700">
                Estudiante: <strong>{studentNameFromMailIcon}</strong>
              </p>
            )}
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label
                  htmlFor="recipients"
                  className="mb-2 block text-sm font-medium text-black"
                >
                  Destinatarios
                </label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <input
                      id="recipients-all"
                      name="recipients"
                      type="radio"
                      value="allStudents"
                      checked={formik.values.recipients === "allStudents"}
                      onChange={formik.handleChange}
                      disabled={disableRadioOptions}
                      className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <label
                      htmlFor="recipients-all"
                      className="ml-2 text-sm font-medium text-gray-900"
                    >
                      Todos los estudiantes
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="recipients-selected"
                      name="recipients"
                      type="radio"
                      value="selectedStudents"
                      checked={formik.values.recipients === "selectedStudents"}
                      onChange={formik.handleChange}
                      disabled={disableRadioOptions}
                      className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <label
                      htmlFor="recipients-selected"
                      className="ml-2 text-sm font-medium text-gray-900"
                    >
                      Estudiantes Seleccionados ({displayCount})
                    </label>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-black"
                >
                  Asunto del correo
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formik.values.subject}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                />
                <div className="flex h-5 items-center">
                  <p
                    className={`text-sm text-red-500 ${
                      formik.touched.subject && formik.errors.subject
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  >
                    {formik.errors.subject}
                  </p>
                </div>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-black"
                >
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="3"
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                ></textarea>
                <div className="flex h-5 items-center">
                  <p
                    className={`text-sm text-red-500 ${
                      formik.touched.message && formik.errors.message
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  >
                    {formik.errors.message}
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
                  type="button"
                  variant="icon"
                  disabled={formik.isSubmitting || isPending}
                  onClick={handleOpenWarningModal}
                >
                  Enviar Correos
                </BrutalButton>
              </div>
            </form>
          </div>
        </Dialog>
      )}
    </>
  );
};
