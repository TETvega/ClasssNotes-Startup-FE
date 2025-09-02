export const SingleStudent = ({ values, formik }) => {
  return (
    <div className="flex flex-col gap-5 p-3">
      <div className="h-20 w-full">
        <label className="text-base font-medium sm:text-lg">Nombre</label>
        <input
          type="text"
          name="students[0].firstName"
          value={values.students[0]?.firstName || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Nombre del estudiante"
          className="w-full rounded-sm border p-2 text-sm focus:ring-2 focus:ring-gray-600 focus:outline-none sm:text-base"
        />
        {formik.touched.students?.[0]?.firstName &&
          formik.errors.students?.[0]?.firstName && (
            <div className="text-sm text-red-500">
              {formik.errors.students[0].firstName}
            </div>
          )}
      </div>

      <div className="h-20 w-full">
        <label className="text-base font-medium sm:text-lg">Apellido</label>
        <input
          type="text"
          name="students[0].lastName"
          value={values.students[0]?.lastName || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Apellido del estudiante"
          className="w-full rounded-sm border p-2 text-sm focus:ring-2 focus:ring-gray-600 focus:outline-none sm:text-base"
        />
        <span>
          {formik.touched.students?.[0]?.lastName &&
            formik.errors.students?.[0]?.lastName && (
              <div className="text-sm text-red-500">
                {formik.errors.students[0].lastName}
              </div>
            )}
        </span>
      </div>

      <div className="h-20 w-full">
        <label className="text-base font-medium sm:text-lg">Email</label>
        <input
          type="email"
          name="students[0].email"
          value={values.students[0]?.email || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Email del estudiante"
          className="w-full rounded-sm border p-2 text-sm focus:ring-2 focus:ring-gray-600 focus:outline-none sm:text-base"
        />
        {formik.touched.students?.[0]?.email &&
          formik.errors.students?.[0]?.email && (
            <div className="text-sm text-red-500">
              {formik.errors.students[0].email}
            </div>
          )}
      </div>
    </div>
  );
};
