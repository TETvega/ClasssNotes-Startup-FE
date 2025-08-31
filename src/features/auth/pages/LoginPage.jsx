import { Link } from "react-router-dom";
import { isObjectEmpty } from "../../../shared/utils/is-object-empty";
import { useLogin } from "../hooks/useLogin";
import FormBrutalButton from "../../../shared/components/ui/FormBrutalButton";
import PasswordInput from "../../../shared/components/ui/PasswordInput";

export const LoginPage = () => {
  const { formik, isPending } = useLogin();

  return (
    <main className="mt-8 flex-grow py-10">
      {/* Logo y lema */}
      <section className="mb-10 text-center"></section>

      {/* Contenedor principal */}
      <div className="flex justify-center gap-32 px-4 md:px-10">
        {/* Imagen (solo visible en pantallas grandes) */}
        <div className="hidden w-90 items-center lg:flex">
          <img src="/ClassNotes.svg" alt="Logo" />
        </div>

        {/* Formulario */}
        <div className="w-full max-w-md rounded-lg border bg-white p-2 py-10">
          <div className="mb-6 text-center">
            <h1 className="text-brand-primary text-2xl font-bold">
              ClassNotes
            </h1>
            <p className="text-gray-600">Organízate con Nosotros</p>
          </div>

          <form onSubmit={formik.handleSubmit} className="px-5 pb-7">
            {/* Email input */}
            <div className="mb-4">
              <label
                className="block pb-1 text-sm font-semibold text-gray-900"
                htmlFor="email"
              >
                Correo electrónico
              </label>
              <input
                className="w-full rounded-xs border bg-gray-200 px-3 py-2 text-sm"
                type="email"
                name="email"
                id="email"
                placeholder="jperez@gmail.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="new-email"
              />
              <div className="mt-1 min-h-[20px] text-xs text-red-500">
                {formik.touched.email && formik.errors.email ? (
                  <span>{formik.errors.email}</span>
                ) : (
                  <span>&nbsp;</span>
                )}
              </div>
            </div>

            {/* Password input */}
            <div className="mb-4">
              <div className="mb-1 flex justify-between">
                <label
                  className="text-sm font-semibold text-gray-900"
                  htmlFor="password"
                >
                  Contraseña
                </label>
                <Link
                  to="/auth/forgot-password"
                  className="text-fun-green-700 text-xs hover:underline md:text-sm"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <PasswordInput formik={formik} name="password" />
            </div>

            {/* Submit button */}
            <FormBrutalButton
              type="submit"
              disabled={!isObjectEmpty(formik.errors)}
              onClick={formik.handleSubmit}
            >
              {isPending ? "Enviando..." : "Iniciar Sesión"}
            </FormBrutalButton>
          </form>

          {/* Register link */}
          <div className="flex justify-center space-x-1.5 text-xs">
            <span>¿No tienes una cuenta?</span>
            <Link
              to="/auth/register"
              className="text-text-active-primary font-light hover:underline lg:font-semibold"
            >
              Crear una cuenta
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};
