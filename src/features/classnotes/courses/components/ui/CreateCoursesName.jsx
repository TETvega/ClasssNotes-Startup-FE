export const CreateCoursesName = ({ formik }) => {
  return (
    <div className="flex flex-col justify-between p-2 sm:flex-row sm:items-center">
      <label className="text-base font-semibold sm:text-lg">
        Nombre del curso
      </label>
      <input
        type="text"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        required
        className="border-disabled-text w-full rounded-lg border p-2 pl-3 text-sm sm:w-2/3 sm:text-base md:text-lg lg:text-lg"
        placeholder="Ingrese el nombre del curso"
        {...formik.getFieldProps("name")}
      />
    </div>
  );
};
