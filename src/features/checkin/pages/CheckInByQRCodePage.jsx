import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import BrutalButton from "../../../shared/components/ui/BrutalButton";
import { initialValues, validationSchema } from "../forms";

export const CheckInByQRCodePage = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    //! TODO: implementar correctamente Formik
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      navigate("/check-in/success");
    },
  });

  return (
    <section className="flex h-[550px] w-screen items-center justify-center">
      <div className="flex flex-col items-center border-2 border-black bg-white p-14 text-center">
        <h1 className="mb-4 text-2xl font-bold">Registro de Asistencia</h1>

        <form onSubmit={formik.handleSubmit} className="w-96">
          <label className="mb-1 flex justify-start text-sm font-semibold">
            Identifíquese con su correo electrónico:
          </label>
          <input
            type="email"
            name="email"
            placeholder="jperez@me.com"
            onChange={formik.handleChange}
            value={formik.values.email}
            className="w-full rounded-sm border-2 border-black p-2 focus:outline-none"
          />
          <div className="mt-1 mr-36 mb-2 h-5 text-sm text-red-500">
            {formik.errors.email && formik.touched.email && (
              <span>{formik.errors.email}</span>
            )}
          </div>
          <BrutalButton type="submit" variant="primary">
            Registrar Asistencia
          </BrutalButton>
        </form>
      </div>
    </section>
  );
};
