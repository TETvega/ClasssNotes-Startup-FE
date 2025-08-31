import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { usePasswordResetStore } from "../store/usePasswordResetStore";
import { useCountdown } from "../hooks/useCountdown";
import { useCodeInput } from "../hooks/useCodeInput";
import { useResendCode } from "../hooks/useResendCode";
import useOtpVerification from "../hooks/useOtpVerification";
import BrutalButton from "../../../shared/components/ui/BrutalButton";

export const VerificationCodePage = () => {
  const email = usePasswordResetStore((state) => state.email);
  const otpExpirationSeconds = usePasswordResetStore(
    (state) => state.otpExpirationSeconds,
  );
  const requestPasswordReset = usePasswordResetStore(
    (state) => state.requestPasswordReset,
  );
  const validateOtp = usePasswordResetStore((state) => state.validateOtp);

  const { secondsLeft, setSecondsLeft, formatTime } = useCountdown(
    otpExpirationSeconds || 0,
  );
  const { code, inputRefs, handleInputChange, handleKeyDown, handlePaste } =
    useCodeInput();
  const { handleRequest, isPending } = useResendCode(
    requestPasswordReset,
    email,
    setSecondsLeft,
    otpExpirationSeconds,
  );
  const { handleVerification, isPendingOtpValidation } = useOtpVerification(
    validateOtp,
    email,
    code,
  );
  const isButtonDisabled =
    code.join("").length < 6 ||
    isPending === true ||
    isPendingOtpValidation === true;

  return (
    <main className="w-full">
      <section className="flex items-center justify-center">
        <div className="flex w-full flex-col items-center justify-center md:flex-row md:space-x-10 lg:space-x-20 xl:space-x-32">
          <div className="self-start md:hidden">
            <Link
              to="/security/recoverpassword"
              className="mb-4 flex items-center text-sm text-blue-600 hover:underline"
            >
              <FaChevronLeft className="mr-1" />
              <span>Volver</span>
            </Link>
          </div>

          <div className="bg-primary-bg w-full max-w-md border p-9">
            <h1 className="mb-8 text-center text-xl font-bold text-gray-900">
              Código de Verificación
            </h1>
            <p className="mb-8 text-center text-gray-600 md:text-left">
              Por favor escribe el código de acceso enviado al correo{" "}
              <strong>{email}</strong>
            </p>

            <div className="mb-6 flex justify-between gap-2">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={inputRefs[index]}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="size-12 rounded-lg border border-gray-300 text-center text-xl shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:border-green-700 focus:ring-1 focus:ring-green-700 focus:outline-none"
                />
              ))}
            </div>

            {isPending ? (
              <p className="mb-4 text-center text-sm text-gray-500">
                Enviando nuevo código...
              </p>
            ) : secondsLeft > 0 ? (
              <p className="mb-4 text-center text-sm text-gray-500">
                El código expira en: {formatTime(secondsLeft)}
              </p>
            ) : (
              <p className="mb-4 text-center text-sm text-gray-500">
                El código ha expirado.
              </p>
            )}

            <div className="flex-col space-y-4">
              <BrutalButton
                onClick={handleVerification}
                variant="primary"
                disabled={isButtonDisabled}
              >
                Verificar Ahora
              </BrutalButton>

              <div className="text-center text-sm">
                <span className="text-gray-600">No Recibiste un Correo </span>
                <button
                  onClick={handleRequest}
                  className="text-green-700 hover:underline"
                  disabled={isButtonDisabled}
                >
                  Reenviar Código
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
