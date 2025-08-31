import { Toaster, toast } from "react-hot-toast";

/**
 * Componente reutilizable de notificación.
 *
 * @param {Object} options - Opciones de la notificación.
 * @param {"success" | "error" | "warning" | "info"} [options.variant="info"] - Tipo de notificación.
 * @param {React.ReactNode} [options.icon] - Icono opcional.
 * @param {string} options.message - Mensaje de la notificación.
 * @param {number} [options.duration=3000] - Duración en milisegundos.
 * @param {string} [options.className=""] - Clases CSS adicionales.
 * @param {string} [options.position="top-right"] - Posición de la notificación.
 * @param {string} [options.title] - Título de la notificación.
 */

const showBrutalToast = ({
  variant = "info",
  icon = null,
  message,
  title,
  duration = 10000,
  className = "",
  position = "top-right",
}) => {
  const variants = {
    success: "bg-white text-success-text",
    error: "bg-white text-error-text",
    warning: "bg-white text-warning-text",
    info: "bg-white text-info-text",
  };

  toast.custom(
    (t) => (
      <div
        className={`ju flex w-80 items-start gap-3 rounded-lg border-2 border-t-8 p-4 shadow-md ${variants[variant]} ${className}`}
        style={{ animation: t.visible ? "fadeIn 0.5s" : "fadeOut 0.5s" }}
      >
        {icon && <span className="text-4xl">{icon}</span>}
        <div>
          <p className="text-lg font-bold">{title}</p>
          <p className="text-sm">{message}</p>
        </div>
      </div>
    ),
    { duration, position },
  );
};

const BrutalToastContainer = () => <Toaster position="top-right" />; // Se deja en la raíz de la aplicación.

export { showBrutalToast, BrutalToastContainer };
