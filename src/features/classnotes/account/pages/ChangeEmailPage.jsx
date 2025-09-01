import { FiMail } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useChangeEmail } from "../hooks";
import { useUserInfo } from "../../../../shared/hooks/useUserInfo";
import BrutalButton from "../../../../shared/components/ui/BrutalButton";

export const ChangeEmailPage = () => {
  const { formik, isPending } = useChangeEmail();
  const { getUserEmailFromLocalStorage } = useUserInfo();
  const userEmail = getUserEmailFromLocalStorage();
  const navigate = useNavigate();

  return (
    <main className="mx-auto flex w-full max-w-md flex-col space-y-4 p-4 pb-20 sm:max-w-6xl">
      {/* Título principal de la página */}
      <h1 className="mb-2 text-center text-3xl font-bold md:text-3xl">
        Cambia el correo electrónico
      </h1>
      {/* Texto de advertencia sobre los campos obligatorios */}
      <p className="mb-4 text-center text-gray-600">
        * indica un campo obligatorio
      </p>

      {/* Contenedor de formulario con fondo gris y borde */}
      <div className="mx-auto max-w-4xl min-w-[320px] rounded-lg border border-gray-300 bg-gray-100 p-6 shadow-lg sm:w-[550px] md:max-w-4xl md:p-10 lg:max-w-4xl">
        {/* Sección que muestra el correo actual del usuario */}
        <div className="mb-6 flex items-start rounded-lg border border-gray-100 bg-gray-200 px-4 py-3 text-gray-600">
          <FiMail className="mt-2 mr-2 text-gray-500" size={25} />
          <div>
            <p className="ml-2 text-sm font-semibold">
              Correo electrónico actual:
            </p>
            <p className="ml-2 text-sm font-semibold text-gray-800">
              {userEmail}
            </p>
          </div>
        </div>
        {/* Formulario para cambiar el correo */}
        <form onSubmit={formik.handleSubmit} className="space-y-6 md:space-y-6">
          {/* Campo de entrada para el nuevo correo */}
          <div>
            <label className="mb-1 block font-bold text-gray-700">
              Nuevo correo electrónico *
            </label>
            <input
              type="email"
              name="newEmail"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newEmail}
              className="w-full rounded-lg border border-black bg-gray-200 px-4 py-2"
            />
            {/* Mensaje de error si el campo tiene algún error de validación */}
            <div className="flex h-5 items-center">
              {formik.touched.newEmail && formik.errors.newEmail && (
                <p className="mt-1 text-sm text-red-500">
                  {formik.errors.newEmail}
                </p>
              )}
            </div>
          </div>

          {/* Botones para enviar o cancelar el cambio */}
          <div className="flex flex-col gap-4 md:flex-row">
            <BrutalButton type="submit" variant="primary">
              {isPending ? "Guardando..." : "Guardar"}
            </BrutalButton>
            <BrutalButton
              onClick={() => navigate("/account/")}
              variant="secondary"
            >
              Cancelar
            </BrutalButton>
          </div>
        </form>
      </div>
    </main>
  );
};
