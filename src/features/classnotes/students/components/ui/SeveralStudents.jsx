import { useEffect, useRef, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FiAlertCircle, FiX } from "react-icons/fi";
import { HelpIcon } from "../../../../../shared/components/ui";
import BrutalButton from "../../../../../shared/components/ui/BrutalButton";

export const SeveralStudents = ({
  values,
  formik,
  setFieldValue,
  isSingleStudent,
}) => {
  const [strictMode, setStrictMode] = useState(true);

  const inputRefs = useRef([]);
  const [isFirstRender, setIsFirstRender] = useState(true);
  useEffect(() => {
    if (
      inputRefs.current.length > 0 &&
      formik.values.students.length > inputRefs.current.length - 1
    ) {
      inputRefs.current[formik.values.students.length - 1]?.focus();
    }
  }, [isSingleStudent, formik.values.students.length]);

  useEffect(() => {
    formik.setFieldValue("strictMode", strictMode);
    // Cuando cambia el modo estricto, validamos el formulario para activar la validación de emails duplicados
    formik.validateForm();
  }, [strictMode]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
        setIsFirstRender(false);
      }
    }, 50);

    return () => clearTimeout(timeout);
  }, []);

  const toggleStrictMode = () => {
    const newMode = !strictMode;
    setStrictMode(newMode);
    formik.setFieldValue("strictMode", newMode);
  };

  const removeStudentRow = (index) => {
    const newStudents = values.students.filter((_, i) => i !== index);
    setFieldValue("students", newStudents);
    // Validamos después de eliminar para actualizar errores de duplicados
    setTimeout(() => formik.validateForm(), 0);
  };

  const handlePaste = (event, startIndex) => {
    event.preventDefault();
    const pastedData = event.clipboardData.getData("text");
    const rows = pastedData.split("\n").map((row) => row.split("\t"));

    const newEntries = rows
      .map(([firstName, lastName, email]) => ({
        firstName: firstName?.trim() || "",
        lastName: lastName?.trim() || "",
        email: email?.trim() || "",
      }))
      .filter((entry) => entry.firstName || entry.lastName || entry.email);

    const updatedStudents = [...values.students];
    for (let i = 0; i < newEntries.length; i++) {
      if (startIndex + i < updatedStudents.length) {
        updatedStudents[startIndex + i] = newEntries[i];
      } else {
        updatedStudents.push(newEntries[i]);
      }
    }
    setFieldValue("students", updatedStudents);
    // Validamos después de pegar para detectar duplicados inmediatamente
    setTimeout(() => formik.validateForm(), 0);
  };

  // Comprobar si hay errores de emails duplicados
  const hasDuplicateEmailsError =
    formik.errors.students &&
    typeof formik.errors.students === "string" &&
    formik.errors.students.includes("Emails duplicados");

  return (
    <>
      <div className="mt-4 mb-4 flex items-center justify-between gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={strictMode}
            onChange={toggleStrictMode}
            className="accent-action-primary h-4 w-4"
          />
          <span className="flex items-center gap-1">
            Modo estricto
            <HelpIcon
              message="En modo estricto no se permiten emails duplicados"
              position="right"
            />
          </span>
        </label>
        <BrutalButton
          type="button"
          variant="icon"
          icon={<FaTrash />}
          className="h-10 w-full rounded bg-red-500 p-2 text-white hover:bg-red-700 sm:w-auto"
          onClick={formik.resetForm}
        >
          Borrar todos
        </BrutalButton>
      </div>

      {strictMode && hasDuplicateEmailsError && (
        <div className="mb-2 rounded bg-red-100 p-2 text-red-700">
          <FiAlertCircle className="mr-1 inline" />
          Emails duplicados no están permitidos en modo estricto
        </div>
      )}

      {/* Tabla en pantallas grandes */}
      <section className="hidden border sm:block">
        <div className="max-h-96 overflow-auto">
          <table className="w-full">
            <thead className="sticky top-0 z-10 bg-gray-200">
              <tr>
                <th className="p-2">#</th>
                <th className="p-2">Nombre</th>
                <th className="p-2">Apellido</th>
                <th className="p-2">Email</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {values.students.map((student, index) => {
                const isDuplicateEmail =
                  strictMode &&
                  student.email &&
                  values.students.filter(
                    (s) =>
                      s.email.toLowerCase() === student.email.toLowerCase(),
                  ).length > 1;

                return (
                  <tr key={index}>
                    <td className="border p-2 text-center">{index + 1}</td>
                    <td className="border p-2">
                      <input
                        type="text"
                        value={student.firstName}
                        ref={(el) => (inputRefs.current[index] = el)}
                        name={`students[${index}].firstName`}
                        onChange={formik.handleChange}
                        onBlur={
                          index === 1 && isFirstRender
                            ? () => {}
                            : formik.handleBlur
                        }
                        onPaste={(e) => handlePaste(e, index)}
                        className="w-full p-1 focus:outline-none"
                      />
                      {!isFirstRender &&
                        formik.touched.students?.[index]?.firstName &&
                        formik.errors.students?.[index]?.firstName && (
                          <div className="text-xs text-red-500">
                            {formik.errors.students[index].firstName}
                          </div>
                        )}
                    </td>
                    <td className="border p-2">
                      <input
                        type="text"
                        value={student.lastName}
                        name={`students[${index}].lastName`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        onPaste={(e) => handlePaste(e, index)}
                        className="w-full p-1 focus:outline-none"
                      />
                      {formik.touched.students?.[index]?.lastName &&
                        formik.errors.students?.[index]?.lastName && (
                          <div className="text-xs text-red-500">
                            {formik.errors.students[index].lastName}
                          </div>
                        )}
                    </td>
                    <td className="border p-2">
                      <input
                        type="email"
                        name={`students[${index}].email`}
                        value={student.email}
                        onChange={(e) => {
                          formik.handleChange(e);
                          setTimeout(() => formik.validateForm(), 0);
                        }}
                        onBlur={formik.handleBlur}
                        onPaste={(e) => handlePaste(e, index)}
                        className="w-full p-1 focus:outline-none"
                      />
                      {formik.touched.students?.[index]?.email &&
                        formik.errors.students?.[index]?.email && (
                          <div className="text-xs text-red-500">
                            {formik.errors.students[index].email}
                          </div>
                        )}
                      {isDuplicateEmail && (
                        <div className="text-xs text-red-500">
                          Email duplicado
                        </div>
                      )}
                    </td>
                    <td className="border p-2 text-center">
                      {values.students.length > 2 && (
                        <BrutalButton
                          icon={<FiX />}
                          variant="icon"
                          onClick={() => removeStudentRow(index)}
                          className="bg-error-bg p-1 hover:bg-red-600"
                        />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Diseño tipo tarjetas en pantallas pequeñas */}
      <section className="space-y-4 sm:hidden">
        {values.students.map((student, index) => {
          const isDuplicateEmail =
            strictMode &&
            student.email &&
            values.students.filter(
              (s) => s.email.toLowerCase() === student.email.toLowerCase(),
            ).length > 1;

          return (
            <div key={index} className="rounded border p-4 shadow-sm">
              <div className="mb-2 text-sm text-gray-600">
                Estudiante #{index + 1}
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium">Nombre</label>
                <input
                  type="text"
                  value={student.firstName}
                  name={`students[${index}].firstName`}
                  ref={(el) => (inputRefs.current[index] = el)}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  onPaste={(e) => handlePaste(e, index)}
                  className="w-full rounded border px-2 py-1 focus:outline-none"
                />
                {!isFirstRender &&
                  formik.touched.students?.[index]?.firstName &&
                  formik.errors.students?.[index]?.firstName && (
                    <div className="text-xs text-red-500">
                      {formik.errors.students[index].firstName}
                    </div>
                  )}
              </div>

              <div className="mb-2">
                <label className="block text-sm font-medium">Apellido</label>
                <input
                  type="text"
                  value={student.lastName}
                  name={`students[${index}].lastName`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  onPaste={(e) => handlePaste(e, index)}
                  className="w-full rounded border px-2 py-1 focus:outline-none"
                />
                {formik.touched.students?.[index]?.lastName &&
                  formik.errors.students?.[index]?.lastName && (
                    <div className="text-xs text-red-500">
                      {formik.errors.students[index].lastName}
                    </div>
                  )}
              </div>

              <div className="mb-2">
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={student.email}
                  name={`students[${index}].email`}
                  onChange={(e) => {
                    formik.handleChange(e);
                    setTimeout(() => formik.validateForm(), 0);
                  }}
                  onBlur={formik.handleBlur}
                  onPaste={(e) => handlePaste(e, index)}
                  className="w-full rounded border px-2 py-1 focus:outline-none"
                />
                {formik.touched.students?.[index]?.email &&
                  formik.errors.students?.[index]?.email && (
                    <div className="text-xs text-red-500">
                      {formik.errors.students[index].email}
                    </div>
                  )}
                {isDuplicateEmail && (
                  <div className="text-xs text-red-500">Email duplicado</div>
                )}
              </div>

              {values.students.length > 2 && (
                <div className="mt-2 flex justify-end">
                  <BrutalButton
                    icon={<FiX />}
                    variant="icon"
                    onClick={() => removeStudentRow(index)}
                    className="bg-error-bg p-1 hover:bg-red-600"
                  />
                </div>
              )}
            </div>
          );
        })}
      </section>
    </>
  );
};
