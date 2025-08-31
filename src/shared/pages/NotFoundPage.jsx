import BrutalButton from "../components/ui/BrutalButton";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { IoMdHome } from "react-icons/io";

export const NotFoundPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const customMessage = location.state?.message || "Página no encontrada";

  return (
    <div className="justfy-center flex min-h-[600px] min-w-[900px] items-center justify-center rounded-2xl border border-black bg-white px-4 py-10 text-center sm:flex-row sm:px-8 sm:py-30 sm:text-left">
      {/* Código de error */}
      <div className="mb-2 sm:mr-8 sm:mb-0">
        <h1 className="text-7xl font-extrabold sm:text-9xl">404</h1>
      </div>

      {/* Texto y botones */}
      <div className="max-w-md">
        <p className="mb-2 text-2xl font-bold">{customMessage}</p>
        <p className="mb-6 pr-5 text-base text-gray-600">
          Oops! Al parecer hubo un error y la página que buscas no existe o no
          se encuentra disponible.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-start">
          <BrutalButton
            variant="icon"
            className="w-auto"
            icon={<ArrowLeft size={20} />}
            onClick={() => navigate(-3)}
          >
            Regresar
          </BrutalButton>
          <BrutalButton
            variant="icon"
            className="w-auto"
            icon={<IoMdHome size={20} />}
            onClick={() => navigate("/dashboard")}
          >
            Ir a la página de inicio
          </BrutalButton>
        </div>
      </div>
    </div>
  );
};
