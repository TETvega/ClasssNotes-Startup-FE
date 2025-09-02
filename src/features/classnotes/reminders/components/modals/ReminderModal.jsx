import { Dialog } from "@headlessui/react";
import { IoIosSave } from "react-icons/io";
import BrutalButton from "../../../../../shared/components/ui/BrutalButton";

export const ReminderModal = ({ isOpen, onClose, mode = "create", formik }) => {
  // Determinar el título del modal según el modo
  const title = mode === "edit" ? "Editar Recordatorio" : "Crear Recordatorio";

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      {/* Contenedor principal del modal */}
      <div
        className="mx-4 w-full rounded-lg border border-black bg-white p-6 shadow-lg sm:mx-auto sm:max-w-2xl sm:p-8" // Margen horizontal en pantallas pequeñas
      >
        {/* Título del modal */}
        <h2 className="mb-6 text-xl font-black">{title}</h2>

        {/* Formulario para crear/editar recordatorio */}
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Campo para el título y la fecha */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            {/* Campo para el título */}
            <div className="flex-1">
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-black"
              >
                Título:
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Título del recordatorio..."
                className={`block w-full rounded-lg border bg-gray-50 p-2.5 text-sm text-gray-900 sm:w-[360px]`}
                {...formik.getFieldProps("title")}
              />
              {/* Espacio reservado para el mensaje de error */}
              <div className="flex h-5 items-center">
                <p
                  className={`text-sm text-red-500 ${
                    formik.touched.title && formik.errors.title
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                >
                  {formik.errors.title}
                </p>
              </div>
            </div>

            {/* Campo para la fecha */}
            <div className="flex-1 sm:ml-4">
              <label
                htmlFor="useDate"
                className="mb-2 block text-sm font-medium text-black"
              >
                Fecha de caducidad:
              </label>
              <input
                type="date"
                id="useDate"
                name="useDate"
                className={`block w-full rounded-lg border bg-gray-50 p-2.5 text-sm text-gray-900`}
                {...formik.getFieldProps("useDate")}
              />
              {/* Espacio reservado para el mensaje de error */}
              <div className="flex h-5 items-center">
                <p
                  className={`text-sm text-red-500 ${
                    formik.touched.useDate && formik.errors.useDate
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                >
                  {formik.errors.useDate}
                </p>
              </div>
            </div>
          </div>

          {/* Campo para los detalles del recordatorio */}
          <div>
            <label
              htmlFor="content"
              className="mb-2 block text-sm font-medium text-black"
            >
              Detalles:
            </label>
            <textarea
              id="content"
              name="content"
              placeholder="Detalles adicionales sobre el recordatorio..."
              className={`sm:text-md block h-[148px] w-full rounded-lg border bg-gray-50 p-2.5 text-sm text-black`}
              {...formik.getFieldProps("content")}
            ></textarea>
            {/* Espacio reservado para el mensaje de error */}
            <div className="flex h-5 items-center">
              <p
                className={`text-sm text-red-500 ${
                  formik.touched.content && formik.errors.content
                    ? "opacity-100"
                    : "opacity-0"
                }`}
              >
                {formik.errors.content}
              </p>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end gap-4">
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
              disabled={formik.isSubmitting}
            >
              <IoIosSave className="h-4 w-4 sm:h-5 sm:w-5" />
              Guardar Recordatorio
            </BrutalButton>
          </div>
        </form>
      </div>
    </Dialog>
  );
};
