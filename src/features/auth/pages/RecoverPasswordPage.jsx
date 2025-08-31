import { useRecoverPassword } from "../hooks/useRecoverPassword";
import FormBrutalButton from "../../../shared/components/ui/FormBrutalButton";

export const RecoverPasswordPage = () => {
  const { email, setEmail, isPending, handleSubmit } = useRecoverPassword();

  return (
    <main className="flex-grow">
      <section className="flex min-h-96 items-center justify-center">
        <div className="flex items-center justify-center gap-3">
          {/* Columna de la imagen */}
          <section className="mt-4 hidden lg:flex">
            <img
              src="/Password.svg"
              alt="Ilustración de seguridad"
              className="w-3/4 max-w-md md:max-w-lg"
            />
          </section>

          {/* Columna del formulario */}
          <section className="order-1 flex w-full min-w-[320px] flex-col justify-center p-6 md:order-2 md:w-1/1 lg:w-6/7 xl:w-6/7">
            <h1 className="mb-4 flex text-left text-xl font-bold text-gray-900">
              ¿Olvidaste Tu Contraseña?
            </h1>

            <p className="mb-6 text-left text-sm text-gray-600 sm:text-left md:text-left">
              Por favor ingresa tu correo electrónico, recibirás un código de
              acceso único.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mb-4 flex w-full flex-col items-center"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                className="mb-3 w-full rounded-lg border bg-gray-200 px-3 py-2 text-sm focus:ring-black focus:outline-none"
                required
              />
              <FormBrutalButton type="submit" disabled={isPending}>
                {isPending ? "Enviando..." : "Enviar Código"}
              </FormBrutalButton>
            </form>

            <p className="text-center text-xs text-gray-500">
              No compartas este código con nadie.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
};
