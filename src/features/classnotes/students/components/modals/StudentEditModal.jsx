import { Dialog } from "@headlessui/react";
import { IoIosSave } from "react-icons/io";
import toast from "react-hot-toast";
import { useStudentEditForm } from "../../hooks";
import BrutalButton from "../../../../../shared/components/ui/BrutalButton";

export const StudentEditModal = ({ isOpen, onClose, student }) => {
  const title = "Editar información del estudiante";
  const { formik } = useStudentEditForm(student, onClose);

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Marcar todos los campos como tocados para mostrar errores
    await formik.setTouched({
      firstName: true,
      lastName: true,
      email: true,
    });

    // Forzar validación
    const errors = await formik.validateForm();
    if (Object.keys(errors).length > 0) {
      toast.error("Por favor, completa todos los campos obligatorios");
      return;
    }

    // Enviar formulario si es válido
    await formik.handleSubmit();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      {/* Contenedor principal del modal */}
      <div className="mx-4 w-full rounded-lg border border-black bg-white p-6 shadow-lg sm:mx-auto sm:max-w-2xl sm:p-8">
        <h2 className="mb-2 text-center text-xl font-black">{title}</h2>
        <div className="mt-4 mb-6 border-1 border-gray-200"></div>

        {/* Formulario para editar estudiante */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Campo para el nombre */}
            <div>
              <label
                htmlFor="firstName"
                className="mb-2 block text-sm font-medium text-black"
              >
                Nombre:
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Nombre del estudiante..."
                className={`block w-full rounded-lg border p-2.5 text-sm text-gray-900 ${
                  formik.touched.firstName && formik.errors.firstName
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-gray-600"
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName || ""}
              />
              {/* Espacio reservado para el mensaje de error */}
              <div className="flex h-5 items-center">
                <p
                  className={`text-sm text-red-500 ${
                    formik.touched.firstName && formik.errors.firstName
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                >
                  {formik.errors.firstName || " "}
                </p>
              </div>
            </div>

            {/* Campo para los apellidos */}
            <div>
              <label
                htmlFor="lastName"
                className="mb-2 block text-sm font-medium text-black"
              >
                Apellidos:
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Apellidos del estudiante..."
                className={`block w-full rounded-lg border p-2.5 text-sm text-gray-900 ${
                  formik.touched.lastName && formik.errors.lastName
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-gray-600"
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName || ""}
              />
              {/* Espacio reservado para el mensaje de error */}
              <div className="flex h-5 items-center">
                <p
                  className={`text-sm text-red-500 ${
                    formik.touched.lastName && formik.errors.lastName
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                >
                  {formik.errors.lastName || " "}
                </p>
              </div>
            </div>
          </div>

          {/* Campo para el correo */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-black"
            >
              Correo Electrónico:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Correo del estudiante..."
              className={`block w-full rounded-lg border p-2.5 text-sm text-gray-900 ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-gray-600"
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email || ""}
            />
            {/* Espacio reservado para el mensaje de error */}
            <div className="flex h-5 items-center">
              <p
                className={`text-sm text-red-500 ${
                  formik.touched.email && formik.errors.email
                    ? "opacity-100"
                    : "opacity-0"
                }`}
              >
                {formik.errors.email || " "}
              </p>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-between">
            <BrutalButton
              onClick={() => {
                formik.resetForm();
                onClose();
              }}
              variant="icon"
              className="bg-disabled-bg hover:bg-gray-300"
            >
              <span className="text-text-active-primary font-extrabold">
                Cancelar
              </span>
            </BrutalButton>

            <BrutalButton
              type="submit"
              variant="icon"
              disabled={formik.isSubmitting || !formik.isValid || !formik.dirty}
              className={`${
                formik.isSubmitting || !formik.isValid || !formik.dirty
                  ? "px-4 py-2"
                  : ""
              }`}
            >
              <IoIosSave className="mr-1 h-4 w-4 sm:h-5 sm:w-5" />
              Guardar Cambios
            </BrutalButton>
          </div>
        </form>
      </div>
    </Dialog>
  );
};
