import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useBreadcrumbStore } from "../../../../../shared/store/useBreadcrumbStore";
import BrutalButton from "../../../../../shared/components/ui/BrutalButton";

export const InformationModal = ({
  isOpen,
  setIsOpen,
  activeTab,
  setActiveTab,
}) => {
  const { currentCourse } = useBreadcrumbStore();
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      {/* Fondo Oscuro */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true"></div>

      {/* Contenedor del Modal - Siempre centrado */}
      <div className="fixed inset-0 flex min-h-screen min-w-screen items-center justify-center p-4">
        <DialogPanel className="flex w-full max-w-md flex-col rounded-md bg-white p-4 shadow-md sm:p-6">
          {/* Encabezado */}
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-bold">
              Método de Registro
            </DialogTitle>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
          </div>

          {/* Descripción */}
          <p className="mt-2 text-sm text-gray-700">
            Conoce las diferentes formas de registrar la asistencia.
          </p>

          {/* Navegación de Tabs */}
          <div className="mt-4 flex h-10 w-full justify-center rounded-md bg-gray-200">
            <button
              className={`w-1/2 cursor-pointer py-2 text-sm font-semibold ${
                activeTab === "OTP"
                  ? "bg-white text-black shadow-md"
                  : "opacity-50"
              }`}
              onClick={() => setActiveTab("OTP")}
            >
              CÓDIGO OTP
            </button>
            <button
              className={`w-1/2 cursor-pointer py-2 text-sm font-semibold ${
                activeTab === "QR"
                  ? "bg-white text-black shadow-md"
                  : "opacity-50"
              }`}
              onClick={() => setActiveTab("QR")}
            >
              CÓDIGO QR
            </button>
          </div>

          {/* Contenido */}
          <div className="my-4 flex-1 overflow-y-auto text-sm">
            {activeTab === "OTP" && (
              <div>
                <div className="rounded-md bg-gray-100 p-3">
                  <p className="text-gray-600">
                    <strong>Asunto:</strong> Código de Asistencia -{" "}
                    {currentCourse.name}
                  </p>
                  <p className="text-gray-600">
                    <strong>De:</strong> ClassNotes{" "}
                    <span className="text-gray-400">
                      &lt;no-reply@classnotes.edu&gt;
                    </span>
                  </p>
                  <p className="text-gray-600">Tu código de asistencia:</p>
                  <p className="my-2 text-center text-xl font-bold text-green-700">
                    908259
                  </p>
                  <p className="text-gray-600">
                    Este código expirará en 15 minutos. (puese ser diferente)
                  </p>
                </div>
                <h3 className="mt-3 text-base font-semibold">
                  ¿Cómo funciona?
                </h3>
                <ol className="mt-2 list-inside list-decimal space-y-1 text-gray-700">
                  <li>
                    Selecciona la opción &quot;Enviar código OTP por
                    Email&quot;.
                  </li>
                  <li>
                    El sistema enviará un código único a cada estudiante
                    inscrito.
                  </li>
                  <li>
                    Los estudiantes reciben el código en el correo con el que
                    fueron registrados.
                  </li>
                  <li>
                    Ingresan este código en la aplicación o sitio web de
                    ClassNotes.
                  </li>
                  <li>
                    La asistencia se registra cuando el código es validado
                    correctamente.
                  </li>
                </ol>
              </div>
            )}
            {activeTab === "QR" && (
              <div>
                <div className="my-3 flex justify-center">
                  <div className="border-2 border-dashed border-gray-300 p-3">
                    <img
                      src="../../../../../../public/QrCode.svg"
                      alt="Código QR"
                      className="pointer-events-none size-24"
                    />
                  </div>
                </div>
                <p className="text-center text-gray-500">Código QR generado</p>
                <h3 className="mt-3 text-base font-semibold">
                  ¿Cómo funciona?
                </h3>
                <ol className="mt-2 list-inside list-decimal space-y-1 text-gray-700">
                  <li>Selecciona la opción &quot;Generar código QR&quot;.</li>
                  <li>
                    El sistema generará un código QR único para la sesión.
                  </li>
                  <li>
                    Muestra este código a tus estudiantes (proyéctalo o comparte
                    pantalla).
                  </li>
                  <li>
                    Los estudiantes escanean el código con la app de ClassNotes.
                  </li>
                  <li>La asistencia se registra automáticamente.</li>
                </ol>
              </div>
            )}
          </div>

          {/* Botón de Cierre */}
          <BrutalButton variant="secondary" onClick={() => setIsOpen(false)}>
            Entendido
          </BrutalButton>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
