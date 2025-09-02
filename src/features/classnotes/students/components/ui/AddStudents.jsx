import { FiUser, FiUsers, FiX } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { useStudentForm } from "../../hooks";
import { SingleStudent } from "./SingleStudent";
import { SeveralStudents } from "./SeveralStudents";
import BrutalButton from "../../../../../shared/components/ui/BrutalButton";

export const AddStudents = ({ isOpen, onClose }) => {
  const [isSingleStudent, setIsSingleStudent] = useState(false);
  const { formik, isPending } = useStudentForm();

  const { values, setFieldValue } = formik;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = await formik.validateForm();
    if (Object.keys(errors).length > 0) {
      formik.setTouched(errors);
      return; 
    }

    try {
      await formik.submitForm();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleStudentTypeChange = (type) => {
    setIsSingleStudent(type);
    setFieldValue(
      "students",
      type
        ? [{ firstName: "", lastName: "", email: "" }]
        : [
            { firstName: "", lastName: "", email: "" },
            { firstName: "", lastName: "", email: "" },
          ],
    );
    setFieldValue("isSingleStudent", type);
  };

  const addStudentRow = () => {
    setFieldValue("students", [
      ...values.students,
      { firstName: "", lastName: "", email: "" },
    ]);
  };

  const isSingleStudentValid =
    isSingleStudent &&
    values.students[0]?.firstName?.trim() !== "" &&
    values.students[0]?.lastName?.trim() !== "" &&
    values.students[0]?.email?.trim() !== "";

  const isMultipleStudentsValid =
    !isSingleStudent &&
    values.students.filter(
      (s) => s?.firstName?.trim() && s?.lastName?.trim() && s?.email?.trim(),
    ).length >= 2;

  const isButtonDisabled = !isSingleStudentValid && !isMultipleStudentsValid;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-2 py-4 sm:px-4">
          <div className="relative flex h-full w-full max-w-4xl flex-col overflow-auto rounded-lg bg-white p-6 sm:p-8 md:p-10">
            {/* Encabezado */}
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold sm:text-2xl">Añadir Estudiantes</h2>
              <button
                onClick={() => {
                  onClose();
                  formik.resetForm();
                }}
                className="cursor-pointer text-xl text-gray-500 hover:text-gray-700 sm:text-2xl"
              >
                <FiX />
              </button>
            </div>
            {/* Descripción */}
            <p className="mb-4 text-sm text-gray-600 sm:text-base">
              Añade uno o varios estudiantes al curso Matemáticas Avanzadas, puedes añadir estudiantes de forma manual o pegando una lista de estudiantes.
            </p>
  
            {/* Selección de uno o varios */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-center rounded border p-2">
              <button
                type="button"
                onClick={() => handleStudentTypeChange(false)}
                className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded py-2 text-sm font-semibold hover:bg-gray-100 sm:text-base ${!isSingleStudent ? "bg-gray-300" : "text-gray-500"}`}
              >
                <FiUsers /> Múltiples estudiantes
              </button>
              <button
                type="button"
                onClick={() => handleStudentTypeChange(true)}
                className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded py-2 text-sm font-semibold hover:bg-gray-100 sm:text-base ${isSingleStudent ? "bg-gray-300" : "text-gray-500"}`}
              >
                <FiUser /> Un estudiante
              </button>
            </div>
  
            {/* Contenido con scroll */}
            <div className="mt-4 flex-1 overflow-y-auto pr-2">
              <form onSubmit={handleSubmit} className="">
                {isSingleStudent ? (
                  <SingleStudent values={values} formik={formik} />
                ) : (
                  <SeveralStudents
                    values={values}
                    formik={formik}
                    setFieldValue={setFieldValue}
                    isSingleStudent={isSingleStudent}
                  />
                )}
              </form>
            </div>
  
            {/* Botones */}
            <div className="w-full sticky bottom-0 mt-5 flex flex-col gap-2 bg-white pt-4 pb-4 sm:flex-row sm:items-end sm:justify-between">
              {!isSingleStudent && (
                <div className="flex w-full items-center justify-start gap-2">
                  <BrutalButton
                    className="w-full sm:w-52"
                    type="button"
                    variant="icon"
                    icon={<FaPlus />}
                    onClick={addStudentRow}
                  >
                    Añadir otra fila
                  </BrutalButton>
                </div>
              )}
              <div className="flex flex-col w-full justify-end gap-2 sm:flex-row sm:space-x-2 items-center">
                  <BrutalButton
                    className="w-full sm:w-40"
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      onClose();
                      formik.resetForm();
                    }}
                  >
                    Cancelar
                  </BrutalButton>
                  <BrutalButton
                    className="w-full sm:w-60"
                    variant="primary"
                    disabled={isButtonDisabled || isPending}
                    type="submit"
                    onClick={handleSubmit}
                  >
                    {isPending ? "Guardando..." : "Guardar Estudiantes"}
                  </BrutalButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );  
};
