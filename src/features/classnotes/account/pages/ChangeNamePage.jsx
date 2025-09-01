import { useNavigate } from "react-router-dom";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { useChangeName } from "../hooks";
import { useUserInfo } from "../../../../shared/hooks/useUserInfo";
import BrutalButton from "../../../../shared/components/ui/BrutalButton";

export const ChangeNamePage = () => {
  const { formik, isPending } = useChangeName();
  const { getUserNameFromLocalStorage } = useUserInfo();
  const userName = getUserNameFromLocalStorage();
  const navigate = useNavigate();

  return (
    <main className="mx-auto flex w-full max-w-md flex-col space-y-4 p-4 pb-20 sm:max-w-6xl">
      <h1 className="mb-2 text-center text-2xl font-bold md:text-3xl">
        Cambia tu nombre
      </h1>
      <p className="mb-4 text-center text-gray-600">
        * indica un campo obligatorio
      </p>

      {/* Contenedor del formulario con estilo */}
      <div className="mx-auto max-w-md min-w-[320px] rounded-lg border border-gray-300 bg-gray-100 p-6 shadow-lg sm:w-[550px] md:max-w-4xl md:p-10 lg:max-w-4xl">
        <div className="mb-6 flex items-start rounded-lg border border-gray-100 bg-gray-200 px-4 py-3 text-gray-600">
          <BsFillPersonVcardFill
            className="mt-2 mr-2 text-gray-500"
            size={25}
          />
          <div>
            <p className="ml-2 text-sm font-semibold">Nombre actual:</p>
            <p className="ml-2 text-sm font-semibold text-gray-800">
              {userName}
            </p>
          </div>
        </div>

        {/* Formulario para cambiar el nombre */}
        <form onSubmit={formik.handleSubmit} className="space-y-4 md:space-y-6">
          {/* Campo para el nuevo nombre */}
          <div>
            <label className="mb-1 block font-bold text-gray-700">
              Nuevo nombre *
            </label>
            <input
              type="text"
              name="firstName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
              className="w-full rounded-lg border border-black bg-gray-200 px-4 py-2"
            />
            {/* Mostrar error si el campo 'firstName' tiene un error */}
            <div className="flex h-6 items-center">
              {formik.touched.firstName && formik.errors.firstName && (
                <p className="mt-1 text-sm text-red-500">
                  {formik.errors.firstName}
                </p>
              )}
            </div>
          </div>

          {/* Campo para el nuevo apellido */}
          <div>
            <label className="mb-1 block font-bold text-gray-700">
              Nuevo apellido *
            </label>
            <input
              type="text"
              name="lastName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
              className="w-full rounded-lg border border-black bg-gray-200 px-4 py-2"
            />
            {/* Mostrar error si el campo 'lastName' tiene un error */}
            <div className="mt-1 flex min-h-[24px] items-center">
              {formik.touched.lastName && formik.errors.lastName && (
                <p className="mt-1 text-sm text-red-500">
                  {formik.errors.lastName}
                </p>
              )}
            </div>
          </div>

          {/* Botones para enviar el formulario o cancelar */}
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
    </main>
  );
};
