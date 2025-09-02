import BrutalButton from "../../../../../shared/components/ui/BrutalButton";

export const CreateCoursesAdditionalSettings = ({ formik, setIsModalOpen }) => {
  return (
    <>
      <div className="flex flex-col items-start justify-between p-2 sm:flex-row sm:items-center">
        <label className="text-base font-semibold sm:text-lg">
          Configuración del curso
          <p className="text-sm text-gray-500">
            Define unidades, puntajes y requisitos
          </p>
        </label>
        <div className="w-full sm:w-50">
          <BrutalButton
            variant="secondary"
            className="h-10"
            onClick={() => setIsModalOpen(true)}
          >
            Configurar
          </BrutalButton>
        </div>
      </div>

      <div className="flex flex-col items-start justify-between p-2 sm:flex-row sm:items-center">
        <label className="text-base font-semibold sm:text-lg">
          Estado del curso
        </label>
        <div className="flex gap-4">
          <label className="flex items-center font-bold">
            <input
              type="radio"
              name="isActive"
              value="true"
              checked={
                formik.values.isActive === true ||
                formik.values.isActive === "true"
              }
              onChange={() => formik.setFieldValue("isActive", true)}
              className="accent-action-primary mr-2"
            />
            Activo
          </label>

          <label className="flex items-center font-bold">
            <input
              type="radio"
              name="isActive"
              value="false"
              checked={
                formik.values.isActive === false ||
                formik.values.isActive === "false"
              }
              onChange={() => formik.setFieldValue("isActive", false)}
              className="accent-action-primary mr-2"
            />
            Inactivo
          </label>
        </div>
      </div>
    </>
  );
};
