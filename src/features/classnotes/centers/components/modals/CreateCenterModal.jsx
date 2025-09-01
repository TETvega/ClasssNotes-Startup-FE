import { Upload, ImageIcon } from "lucide-react";
import { Dialog } from "@headlessui/react";
import { useCreateCenterForm } from "../../hooks";
import BrutalButton from "../../../../../shared/components/ui/BrutalButton";

export const CreateCenterModal = ({ isOpen, onClose, onCenterCreated }) => {
  const {
    formik,
    fileInputRef,
    isPending,
    isDragging,
    handleFileChange,
    handleDrop,
    handleDragOver,
    handleDragLeave,
  } = useCreateCenterForm(onCenterCreated);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 flex items-center justify-center bg-black/50"
    >
      {/* Contenedor principal del modal */}
      <div className="w-full max-w-2xl rounded-lg border border-black bg-white p-6 shadow-lg">
        {/* Título del formulario */}
        <div className="ml-4 border-b-2">
          <h2 className="mb-4 text-center text-2xl font-bold">Crear Centro</h2>
        </div>
        {/* Formulario con Formik */}
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Campo para el nombre del centro */}
          <div className="mt-4 ml-4 h-14">
            <label className="block text-black">
              Nombre del centro educativo:
            </label>
            <input
              type="text"
              name="nombre"
              placeholder="Ej: Centro Educativo"
              className="mt-1 w-full rounded border p-2"
              {...formik.getFieldProps("nombre")}
            />
            {/* Mensaje de error si hay problemas con la validación */}
            {formik.touched.nombre && formik.errors.nombre && (
              <div className="text-sm text-red-500">{formik.errors.nombre}</div>
            )}
          </div>

          <div className="flex gap-4">
            {/* Contenedor de inputs */}
            <div className="flex w-1/2 flex-col justify-between p-4">
              {/* Campo para la abreviatura */}
              <div>
                <label className="block text-black">Abreviatura:</label>
                <input
                  type="text"
                  name="abreviatura"
                  placeholder="Ej: CE"
                  className="mt-1 w-full rounded border p-2"
                  {...formik.getFieldProps("abreviatura")}
                />
                {/* Mensaje de error si hay problemas con la validación */}
                <div className="h-3">
                  {formik.touched.abreviatura && formik.errors.abreviatura && (
                    <div className="text-sm text-red-500">
                      {formik.errors.abreviatura}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <span className="flex items-center gap-1">
                  <label className="mt-2 mb-2 block font-bold text-black">
                    Logo:
                  </label>
                  <label htmlFor="">(opcional)</label>
                </span>
                <div
                  className={`flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded border-2 border-dashed border-black transition hover:bg-gray-100 ${
                    isDragging ? "border-4 border-green-600 bg-green-200" : ""
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <Upload className="text-3xl text-black" />
                  <p className="mt-2 text-center text-sm">
                    Arrastra tu archivo aquí o haz clic para seleccionarlo
                  </p>
                  <p className="mt-1 text-sm font-bold">2 MB</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 mb-4 flex h-64 w-1/2 items-center justify-center rounded border-2 border-dashed border-black bg-green-100">
              {formik.values.logo ? (
                <img
                  //* Muestra una vista previa del archivo cargado
                  src={URL.createObjectURL(formik.values.logo)}
                  alt="Vista previa"
                  className="max-h-full object-contain"
                />
              ) : (
                <div className="text-center">
                  <ImageIcon className="mx-auto text-4xl text-green-600" />
                  <p className="mt-2 text-sm">Vista previa del logo</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 flex justify-center gap-4">
            <BrutalButton
              variant="primary"
              className="ml-10"
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Creando..." : "Crear"}
            </BrutalButton>
            <BrutalButton
              variant="secondary"
              className="mr-10"
              onClick={() => {
                formik.handleReset();
                onClose();
              }}
              disabled={isPending}
            >
              Cancelar
            </BrutalButton>
          </div>
        </form>
      </div>
    </Dialog>
  );
};
