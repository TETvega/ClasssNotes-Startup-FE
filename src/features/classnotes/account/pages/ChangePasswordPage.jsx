import { useNavigate } from "react-router-dom";
import { useChangePassword } from "../hooks/useChangePassword";
import PasswordInput from "../../../../shared/components/ui/PasswordInput";
import BrutalButton from "../../../../shared/components/ui/BrutalButton";

export const ChangePasswordPage = () => {
  const { formik, isPending } = useChangePassword();
  const navigate = useNavigate();

  return (
    <main className="mx-auto flex w-full max-w-md flex-col space-y-4 p-4 pb-20 sm:max-w-6xl">
      {/* Título y subtítulo FUERA del contenedor */}
      <h1 className="mb-1 text-center text-3xl font-bold">
        Cambia la contraseña
      </h1>
      <p className="mb-4 text-center text-sm text-gray-600">
        * indica un campo obligatorio
      </p>

      {/* Contenedor del formulario responsivo y alineado */}
      <div className="mx-auto max-w-md min-w-[335px] rounded-lg border border-gray-300 bg-gray-100 p-6 shadow-lg sm:w-[550px] md:max-w-4xl md:p-10 lg:max-w-4xl">
        <div className="w-full">
          <form onSubmit={formik.handleSubmit} className="space-y-3">
            {/* Campo de contraseña actual */}
            <div>
              <label className="mb-1 block text-base font-semibold text-black">
                Contraseña actual *
              </label>
              <PasswordInput
                formik={formik}
                name="currentPassword"
                className="py-2"
              />
            </div>

            {/* Campo de nueva contraseña */}
            <div>
              <label className="mb-1 block text-base font-semibold text-black">
                Nueva contraseña *
              </label>
              <PasswordInput
                formik={formik}
                name="newPassword"
                className="py-2"
              />
            </div>

            {/* Campo de confirmar nueva contraseña */}
            <div>
              <label className="mb-1 block text-base font-semibold text-black">
                Confirmar nueva contraseña *
              </label>
              <PasswordInput
                formik={formik}
                name="confirmNewPassword"
                className="py-2"
              />
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col justify-between gap-4 md:flex-row">
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
      </div>
    </main>
  );
};
