export const CreateCoursesDetails = ({ formik }) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold sm:text-base">Sección</label>
          <input
            type="text"
            name="section"
            value={formik.values.section}
            onChange={formik.handleChange}
            required
            className="border-disabled-text rounded-lg border p-2 pl-3 text-sm sm:text-base md:text-lg lg:text-lg"
            placeholder="Ej. A, B, C"
            {...formik.getFieldProps("section")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold sm:text-base">Código</label>
          <input
            type="text"
            name="code"
            value={formik.values.code}
            onChange={formik.handleChange}
            required
            className="border-disabled-text rounded-lg border p-2 pl-3 text-sm sm:text-base md:text-lg lg:text-lg"
            placeholder="Ej. 12345"
            {...formik.getFieldProps("code")}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold sm:text-base">Inicio</label>
          <input
            type="time"
            name="startTime"
            value={formik.values.startTime}
            onChange={formik.handleChange}
            required
            className="border-disabled-text rounded-lg border p-2 pl-3 text-sm sm:text-base md:text-lg lg:text-lg"
            {...formik.getFieldProps("startTime")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold sm:text-base">Final</label>
          <input
            type="time"
            name="finishTime"
            value={formik.values.finishTime}
            onChange={formik.handleChange}
            required
            className="border-disabled-text rounded-lg border p-2 pl-3 text-sm sm:text-base md:text-lg lg:text-lg"
            {...formik.getFieldProps("finishTime")}
          />
        </div>
      </div>
    </>
  );
};
