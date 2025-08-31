import { useNewPasswordForm } from "../hooks/useNewPasswordForm";
import FormBrutalButton from "../../../shared/components/ui/FormBrutalButton";
import PasswordInput from "../../../shared/components/ui/PasswordInput";

export const NewPasswordPage = () => {
  const { formik } = useNewPasswordForm();

  return (
    <div className="mt-20 mb-10 flex min-w-[320px] flex-col items-center justify-center">
      <h1 className="mb-8 text-center text-3xl font-bold text-green-800 md:text-4xl">
        Cambia la contraseña
      </h1>
      <main className="w-full max-w-lg rounded-lg border-1 bg-gray-100 px-4 py-8 shadow-2xl sm:px-10 md:w-4xl lg:w-4xl xl:w-4xl">
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Nueva contraseña
            </label>
            <PasswordInput formik={formik} name="password" />
          </div>
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Confirmar nueva contraseña
            </label>
            <PasswordInput formik={formik} name="password_confirmation" />
          </div>
          <FormBrutalButton type="submit">Confirmar</FormBrutalButton>
        </form>
      </main>
    </div>
  );
};
