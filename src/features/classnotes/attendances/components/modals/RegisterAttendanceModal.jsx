import { Dialog, DialogTitle, DialogPanel } from "@headlessui/react";
import { IoQrCodeSharp } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { useBreadcrumbStore } from "../../../../../shared/store/useBreadcrumbStore";

export const RegisterAttendanceModal = ({
  isOpen,
  onClose,
  selectedMethods,
  tab,
  setActiveTab = () => {},
  qr,
}) => {
  const { currentCourse } = useBreadcrumbStore();
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Fondo oscuro */}
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 sm:p-6">
        {/* Contenedor del modal */}
        <DialogPanel
          className="w-full max-w-xs rounded-lg bg-white p-4 shadow-lg sm:max-w-md sm:p-6 lg:max-w-lg"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Título */}
          <div className="mb-4 flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold">
              Información de Registro
            </DialogTitle>
            <button
              onClick={onClose}
              className="cursor-pointer text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
          </div>

          <p className="text-inactive-primary-text mb-4 font-bold">
            Detalles de los métodos de registro seleccionados
          </p>

          {/* Tabs de métodos */}
          <div className="mb-4 flex flex-wrap justify-center rounded-lg bg-white sm:justify-start">
            {selectedMethods.includes("QR") && (
              <button
                className={`flex flex-1 cursor-pointer items-center justify-center px-2 py-2 text-sm font-semibold transition-all sm:px-4 sm:py-2 ${
                  tab === "QR"
                    ? "border-success-bg text-text-active-primary border-2"
                    : "bg-disabled-bg text-gray-400"
                }`}
                onClick={() => setActiveTab("QR")}
              >
                <IoQrCodeSharp className="mr-2 text-lg sm:text-2xl" /> Código QR
              </button>
            )}

            {selectedMethods.includes("OTP") && (
              <button
                className={`flex flex-1 cursor-pointer items-center justify-center px-2 py-2 text-sm font-semibold transition-all sm:px-4 sm:py-2 ${
                  tab === "OTP"
                    ? "border-success-bg text-text-active-primary border-2"
                    : "bg-gray-200 text-gray-400"
                }`}
                onClick={() => setActiveTab("OTP")}
              >
                <MdOutlineMail className="mr-2 text-lg sm:text-2xl" /> Código
                OTP
              </button>
            )}
          </div>

          {/* Contenido dinámico */}
          <div className="flex min-h-[300px] flex-col items-center justify-center">
            {tab === "QR" && selectedMethods.includes("QR") && (
              <div className="flex flex-col items-center">
                <img
                  src={`data:image/png;base64,${qr.base64}`}
                  alt="QR Code"
                  className="mx-auto size-64 max-h-full max-w-full rounded-lg shadow-[3px_-1px_17px_4px_rgba(0,_0,_0,_0.2)]"
                />
                <p className="text-disabled-text mt-4 text-center text-sm font-semibold sm:text-base">
                  Puede compartir este código QR con sus alumnos para marcar su
                  asistencia.
                </p>
                <a
                  href={`data:image/png;base64,${qr.base64}`}
                  download={`${currentCourse.name.trim()}-${new Date().toISOString()}.png`}
                  className="bg-primary-bg text-text-active-primary mt-4 flex items-center rounded-lg border border-gray-300 px-3 py-2 font-semibold sm:px-4 sm:py-2"
                >
                  <IoQrCodeSharp className="mr-2 text-lg sm:text-xl" />
                  Descargar QR
                </a>
              </div>
            )}

            {tab === "OTP" && selectedMethods.includes("OTP") && (
              <div className="flex flex-col items-center">
                <div className="bg-disabled-bg m-4 flex h-20 w-20 items-center justify-center rounded-full sm:h-28 sm:w-28">
                  <MdOutlineMail className="text-disabled-text text-4xl sm:text-5xl" />
                </div>
                <h3 className="text-lg font-bold sm:text-xl">
                  Códigos OTP enviados
                </h3>
                <p className="text-disabled-text mt-2 text-center text-sm font-semibold sm:text-base">
                  Los códigos fueron enviados a sus alumnos para que puedan
                  marcar su asistencia.
                </p>
              </div>
            )}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
