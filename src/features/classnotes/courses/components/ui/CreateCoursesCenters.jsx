import { FiChevronDown } from "react-icons/fi";

export const CreateCourseCenters = ({ formik, centrosEducativos }) => {
  return (
    <div className="relative flex flex-col justify-between p-2 sm:flex-row sm:items-center">
      <label className="text-base font-semibold sm:text-lg">
        Centro educativo:
      </label>
      <div className="relative w-full sm:w-2/3">
        <select
          name="centerId"
          value={formik.values.centerId}
          onChange={formik.handleChange}
          required
          className="border-disabled-text w-full appearance-none rounded-lg border p-2 pl-3 text-sm sm:text-base md:text-lg lg:text-lg"
          {...formik.getFieldProps("centerId")}
        >
          <option value="">Seleccionar centro educativo</option>
          {centrosEducativos.map((centro) => (
            <option key={centro.id} value={centro.id}>
              {centro.id}
            </option>
          ))}
        </select>
        <FiChevronDown className="absolute top-1/2 right-3 -translate-y-1/2 transform text-xl text-gray-500" />
      </div>
    </div>
  );
};
