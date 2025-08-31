import { useFormik } from "formik";
import { isObjectEmpty } from "../../../shared/utils/is-object-empty";
import { Link, useNavigate } from "react-router-dom";
import { registerInitValues, registerValidationSchema } from "../forms/register_data";
import { useEffect, useState, useTransition } from "react";
import { useAuthStore } from "../store/useAuthStore";
import FormBrutalButton from "../../../shared/components/ui/FormBrutalButton";
import PasswordInput from "../../../shared/components/ui/PasswordInput";
import toast from "react-hot-toast";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [setIsButtonEnabled] = useState(false);
  const { register, validateAuthentication } = useAuthStore();
  const [isPending, startTransition] = useTransition();

  // Habilitar el botón después de un tiempo
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsButtonEnabled(true);
    }, 10000); // 10 segundos de espera
    return () => clearTimeout(timer);
  }, []);

  const formik = useFormik({
    initialValues: registerInitValues,
    validationSchema: registerValidationSchema,
    validateOnChange: true,
    onSubmit: (formValues) => {
      startTransition(async () => {
        const { error, message } = await register(formValues);
        validateAuthentication();
        if (error) {
          toast.error(message);
          return;
        }

        toast.success(message);
        navigate("/dashboard");
      });
    },
  });

  return (
    <main className="flex-grow px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-8 lg:flex-row lg:items-start lg:gap-16 xl:gap-24">
        {/* Imagen (solo visible en pantallas grandes) */}
        <div className="mt-36 hidden w-90 items-center lg:flex">
          <img src="/ClassNotes.svg" alt="Logo" />
        </div>

        {/* Formulario de registro */}
        <div className="w-full max-w-md sm:w-[90%] md:w-[80%] lg:w-2/3">
          <div className="rounded-xl border bg-white p-4 shadow sm:p-6 md:p-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">
                Crea tu cuenta
              </h2>
              <p className="text-sm text-gray-600 sm:text-base">
                Tu organización, tu estilo, tu cuenta
              </p>
            </div>

            {/* Formulario de Registro */}
            <form onSubmit={formik.handleSubmit} className="space-y-3">
              {/* Nombre y Apellido*/}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                <div>
                  <label
                    className="block text-sm font-semibold text-gray-900"
                    htmlFor="firstName"
                  >
                    Nombre
                  </label>
                  <input
                    className="mt-1 w-full rounded-xs border bg-gray-200 px-3 py-2 text-sm"
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="Juan"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <div className="min-h-[20px] text-xs text-red-500">
                    {formik.touched.firstName && formik.errors.firstName && (
                      <span>{formik.errors.firstName}</span>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    className="block text-sm font-semibold text-gray-900"
                    htmlFor="lastName"
                  >
                    Apellido
                  </label>
                  <input
                    className="mt-1 w-full rounded-xs border bg-gray-200 px-3 py-2 text-sm"
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Pérez"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <div className="min-h-[20px] text-xs text-red-500">
                    {formik.touched.lastName && formik.errors.lastName && (
                      <span>{formik.errors.lastName}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Correo Electrónico */}
              <div>
                <label
                  className="block text-sm font-semibold text-gray-900"
                  htmlFor="email"
                >
                  Correo Electrónico
                </label>
                <input
                  className="mt-1 w-full rounded-xs border bg-gray-200 px-3 py-2 text-sm"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="jperez@gmail.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="min-h-[20px] text-xs text-red-500">
                  {formik.touched.email && formik.errors.email && (
                    <span>{formik.errors.email}</span>
                  )}
                </div>
              </div>

              {/* Contraseña */}
              <div>
                <label
                  className="block text-sm font-semibold text-gray-900"
                  htmlFor="password"
                >
                  Contraseña
                </label>
                <PasswordInput formik={formik} name="password" />
              </div>

              {/* Confirmación de Contraseña */}
              <div>
                <label
                  className="block text-sm font-semibold text-gray-900"
                  htmlFor="confirmPassword"
                >
                  Confirmar Contraseña
                </label>
                <PasswordInput formik={formik} name="confirmPassword" />
              </div>

              {/* Botón de Registro */}
              <div className="mt-6">
                <FormBrutalButton
                  type="submit"
                  disabled={!isObjectEmpty(formik.errors)}
                  onClick={formik.handleSubmit}
                  className="w-full"
                >
                  {isPending ? "Enviando..." : "Registrarse"}
                </FormBrutalButton>
              </div>
            </form>

            {/* Iniciar Sesión */}
            <div className="mt-4 flex justify-center space-x-1.5 text-xs sm:text-sm">
              <span>¿Ya tienes una cuenta?</span>
              <Link
                to="/auth/login"
                className="text-fun-green-700 font-light hover:underline"
              >
                Iniciar Sesión
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
