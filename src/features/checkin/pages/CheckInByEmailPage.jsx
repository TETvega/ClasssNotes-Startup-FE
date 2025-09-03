import toast from "react-hot-toast";
import { useEffect } from "react";
import { useCheckIn } from "../hooks";
import BrutalButton from "../../../shared/components/ui/BrutalButton";

export const CheckInByEmailPage = () => {
  const {
    code,
    inputRefs,
    isLoading,
    areParams,
    handleInputChange,
    handleKeyDown,
    handlePaste,
    handleClick,
  } = useCheckIn();

  useEffect(() => {
    if (areParams) {
      toast.custom(
        (t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } pointer-events-auto flex max-w-md items-start gap-3 rounded-md border-l-4 border-yellow-500 bg-yellow-100 p-4 shadow-md`}
          >
            <span className="text-xl">📍</span>
            <div className="text-sm text-yellow-800">
              <strong>Se requiere tu ubicación:</strong>
              <br />
              Asegúrate de permitir el acceso cuando se te solicite.
            </div>
          </div>
        ),
        {
          duration: 9000,
          id: "location-warning",
        },
      );
    }
  }, []);

  return (
    <section className="flex min-h-[550px] w-full items-center justify-center px-4">
      <div className="flex w-full max-w-sm flex-col items-center rounded-md border bg-white p-6 text-center shadow-lg md:p-10 lg:p-14">
        {/* Título */}
        <h1 className="mb-4 text-2xl font-bold text-gray-800">
          Registro de Asistencia
        </h1>

        {/* Texto de indicación */}
        <p className="text-md mb-6 w-full text-gray-700">
          Ingrese el código y presione el botón para registrar su asistencia.
        </p>

        {/* Campos de código */}
        <div className="mb-6 flex justify-center gap-2">
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

        {/* Botón */}
        <BrutalButton
          onClick={handleClick}
          variant="primary"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Validando..." : "Registrar Asistencia"}
        </BrutalButton>
      </div>
    </section>
  );
}
