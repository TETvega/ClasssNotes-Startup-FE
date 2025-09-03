import { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { IoInformationCircleOutline, IoQrCodeOutline } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { HelpIcon } from "../../../../shared/components/ui";
import BrutalButton from "../../../../shared/components/ui/BrutalButton";
import { InformationModal, RegisterAttendanceModal } from "./modals";

export const ControlAssistedAttendance = ({
  status,
  qrChecked,
  setQrChecked,
  otpChecked,
  setOtpChecked,
  strictMode,
  setStrictMode,
  selectedMethods,
  startAttendanceProcess,
  isLoading,
  qr,
  isModalOpen,
  activeTab,
  setActiveTab,
  hasTakenAttendanceToday,
  expiresIn,
}) => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(isModalOpen);

  const handleStrictModeChange = () => {
    setStrictMode(!strictMode);
    if (qrChecked && otpChecked) {
      setQrChecked(false);
      setOtpChecked(false);
    }
  };

  const handleOpenModal = () => {
    if (!activeTab) return;
    if (status) {
      setIsRegisterModalOpen(true);
    } else {
      setIsInfoModalOpen(true);
    }
  };

  const isDisabled = (method) => {
    return !selectedMethods.includes(method) && status;
  };

  return (
    <div className="mb-6 max-w-full rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-2xl">
      <h2 className="mb-4 text-center text-xl font-bold md:text-left">
        Control de Asistencia
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Estado Actual */}
        <div className="w-full">
          <h3 className="text-lg font-bold">Estado Actual</h3>
          <p
            className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-bold ${
              !status
                ? "bg-yellow-100 text-yellow-800"
                : hasTakenAttendanceToday
                  ? "bg-blue-100 text-blue-900"
                  : "bg-green-100 text-green-900"
            }`}
          >
            {!status
              ? "No Iniciada"
              : hasTakenAttendanceToday
                ? "Finalizada"
                : "En Proceso"}
          </p>

          <p className="mt-2 flex items-center text-gray-600">
            <FaCalendarAlt className="mr-2" />
            <strong className="mr-1">Fecha:</strong>{" "}
            {!status ? "--/--/----" : `${new Date().toLocaleDateString()}`}
          </p>
          {expiresIn != null && (
            <p className="mt-2 flex items-center text-gray-600">
              <FaCalendarAlt className="mr-2" />
              <strong className="mr-1">Termina en aprox.</strong>
              {expiresIn} minutos
            </p>
          )}
        </div>

        {/* Métodos de Registro */}
        <div className="flex justify-center md:justify-end">
          <div className="w-full max-w-md">
            <div className="flex flex-col justify-start gap-3 md:flex-row lg:items-center lg:justify-between">
              <h3 className="text-center text-lg font-semibold md:text-left">
                Métodos de Registro
              </h3>

              {/* Checkbox para StrictMode */}
              <div className="flex items-center justify-start gap-2 lg:flex-wrap">
                <input
                  type="checkbox"
                  disabled={status}
                  checked={strictMode}
                  onChange={handleStrictModeChange}
                  className={`accent-action-primary size-4 cursor-pointer ${status ? "disabled:cursor-not-allowed" : ""}`}
                />
                <span
                  onClick={() => {
                    if (!status) return setStrictMode(!strictMode);
                  }}
                  className={`${!status ? "cursor-pointer hover:underline" : ""} flex items-center gap-1.5 text-sm sm:text-base`}
                >
                  <span className="flex md:hidden lg:flex">Modo Estricto</span>
                  <span className="hidden md:flex lg:hidden">Estricto</span>
                </span>
                <HelpIcon message="El modo estricto permite seleccionar solo un método de registro, evitando que los estudiantes utilicen múltiples métodos para marcar asistencia." />
              </div>
            </div>

            {/* Generar código QR */}
            <div className="mt-3 flex flex-wrap items-center space-x-2 rounded-md border-2 border-gray-200 p-2">
              <input
                type="checkbox"
                checked={qrChecked}
                onChange={() => setQrChecked(!qrChecked)}
                disabled={(otpChecked && strictMode) || status}
                className="accent-action-primary size-5 cursor-pointer disabled:cursor-default"
              />
              <IoQrCodeOutline
                className={`${isDisabled("QR") && "text-gray-300"} text-2xl`}
              />
              <span className={`${isDisabled("QR") && "text-gray-300"} flex-1`}>
                Generar código QR
              </span>
              <IoInformationCircleOutline
                className={`${!isDisabled("QR") ? "cursor-pointer" : "text-gray-300"} text-2xl`}
                title="Genera un código QR que los estudiantes pueden escanear para registrar su asistencia."
                onClick={() => {
                  if (isDisabled("QR")) return;
                  setActiveTab("QR");
                  handleOpenModal();
                }}
              />
            </div>

            {/* Enviar código OTP por Email */}
            <div className="mt-2 flex flex-wrap items-center space-x-2 rounded-md border-2 border-gray-200 p-2">
              <input
                type="checkbox"
                checked={otpChecked}
                onChange={() => setOtpChecked(!otpChecked)}
                disabled={(qrChecked && strictMode) || status}
                className="accent-action-primary size-5 cursor-pointer disabled:cursor-default disabled:text-gray-300"
              />
              <MdOutlineMail
                className={`${isDisabled("OTP") && "text-gray-300"} text-2xl`}
              />

              <span
                className={`${isDisabled("OTP") && "text-gray-300"} flex-1`}
              >
                Enviar código OTP por Email
              </span>
              <IoInformationCircleOutline
                className={`${!isDisabled("OTP") ? "cursor-pointer" : "text-gray-300"} text-2xl`}
                title="Envía un código único por correo electrónico a cada estudiante para registrar su asistencia."
                onClick={() => {
                  if (isDisabled("OTP")) return;
                  setActiveTab("OTP");
                  handleOpenModal();
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Botón Iniciar Asistencia */}
      {!status && (
        <div className="flex items-center justify-center">
          <div className="mt-6 flex w-40 justify-center">
            <BrutalButton
              variant="primary"
              onClick={() => {
                startAttendanceProcess();
              }}
              disabled={(!qrChecked && !otpChecked) || isLoading}
              className="flex w-36 justify-center disabled:cursor-not-allowed disabled:opacity-50"
            >
              Iniciar Asistencia
            </BrutalButton>
          </div>
        </div>
      )}

      {/* Modal de Información */}
      <InformationModal
        isOpen={isInfoModalOpen}
        setIsOpen={setIsInfoModalOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Modal de Registro de Asistencia */}
      <RegisterAttendanceModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        selectedMethods={selectedMethods}
        tab={activeTab}
        setActiveTab={setActiveTab}
        qr={qr}
      />
    </div>
  );
};
