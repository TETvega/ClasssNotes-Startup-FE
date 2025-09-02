import { useState } from "react";
import { useCourseSettings } from "../../hooks";
import BrutalSearchBar from "../../../../../shared/components/ui/BrutalSearchBar";
import BrutalButton from "../../../../../shared/components/ui/BrutalButton";

function formatDateToInput(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export const CourseSettingModal = ({
  newConfig,
  isModalOpen,
  setIsModalOpen,
  setScoreType,
  formik,
  setIsScoreTypeReadOnly,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading } = useCourseSettings(searchTerm);

  const scoreTypeLabels = {
    ARITHMETIC_SCORE: "Aritmético",
    WEIGHTED_SCORE: "Ponderado",
    GOLD_SCORE: "Puntos oro",
  };

  if (!isModalOpen) return null;

  return (
    isModalOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div
          className={`${newConfig ? "h-[50%]" : "h-[70%]"} w-full max-w-md overflow-y-auto rounded-lg bg-white p-6 shadow-lg`}
        >
          {newConfig ? (
            <div className="border-disabled-text-bg border-b-2">
              <div className="flex justify-center">
                <h2 className="mb-4 text-center text-xl font-bold">
                  Configuración del curso
                </h2>
              </div>
              <div>
                <label>Nombre de la configuración</label>
                <input
                  type="text"
                  name="courseSetting.name"
                  placeholder="Ej. Matematicas estandar"
                  className="border-disabled-text mt-1 w-full rounded-lg border-2 p-2"
                  value={formik.values.courseSetting.name}
                  onChange={formik.handleChange}
                />
                {formik.touched.courseSetting?.name &&
                  formik.errors.courseSetting?.name && (
                    <p className="mt-1 text-sm text-red-500">
                      {formik.errors.courseSetting?.name}
                    </p>
                  )}
              </div>
              <div className="mt-4 mb-6">
                <label>Tipo de puntaje</label>
                <select
                  className="border-disabled-text mt-1 w-full rounded-lg border-2 p-2"
                  onChange={(e) => {
                    const selected = e.target.value;
                    setScoreType(selected);
                    setIsScoreTypeReadOnly(false);
                    formik.setFieldValue("courseSetting.scoreType", selected);
                  }}
                  onBlur={formik.handleBlur}
                >
                  <option value="">Seleccionar</option>
                  <option value="ARITHMETIC_SCORE">Aritmético</option>
                  <option value="WEIGHTED_SCORE">Ponderado</option>
                  <option value="GOLD_SCORE">Puntos oro</option>
                </select>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-center">
                <h2 className="mb-4 text-center text-xl font-bold">
                  Seleccionar plantilla
                </h2>
              </div>
              <div>
                <BrutalSearchBar
                  placeholder="Buscar centros..."
                  initialValue={searchTerm}
                  onSearch={(value) => setSearchTerm(value)}
                />
              </div>
              <div className="mt-4 max-h-64 space-y-3 overflow-y-auto pr-1">
                {isLoading ? (
                  <p className="text-center text-gray-500">
                    Cargando configuraciones...
                  </p>
                ) : (
                  data?.items?.map((plantilla) => (
                    <div
                      key={plantilla.id}
                      className="flex items-center justify-between rounded-lg border border-gray-300 p-4 shadow-sm"
                    >
                      <div>
                        <h3 className="text-md font-semibold">
                          {plantilla.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {scoreTypeLabels[plantilla.scoreType]}
                        </p>
                      </div>
                      <div className="w-auto">
                        <BrutalButton
                          variant="secondary"
                          className="h-10 px-4"
                          onClick={() => {
                            setScoreType(plantilla.scoreType);
                            formik.setFieldValue("useExistingSetting", true);
                            formik.setFieldValue("settingId", plantilla.id);
                            formik.setFieldValue(
                              "courseSetting.scoreType",
                              plantilla.scoreType,
                            );
                            formik.setFieldValue(
                              "courseSetting.minimumGrade",
                              plantilla.minimumGrade,
                            );
                            formik.setFieldValue(
                              "courseSetting.maximumGrade",
                              plantilla.maximumGrade,
                            );
                            formik.setFieldValue(
                              "courseSetting.startDate",
                              formatDateToInput(plantilla.startDate),
                            );
                            formik.setFieldValue(
                              "courseSetting.endDate",
                              formatDateToInput(plantilla.endDate),
                            );
                            formik.setFieldValue(
                              "courseSetting.validateRangeMeters",
                              plantilla.validateRangeMeters,
                            );
                            formik.setFieldValue(
                              "courseSetting.minimumAttendanceTime",
                              plantilla.minimumAttendanceTime,
                            );
                            setIsScoreTypeReadOnly(true);
                            setIsModalOpen(false);
                          }}
                        >
                          Seleccionar
                        </BrutalButton>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/*Botones de accion*/}
          <div
            className={`mt-4 flex flex-col items-center ${newConfig ? "justify-end" : "justify-center"} gap-4 p-2 sm:flex-row`}
          >
            <div className="w-40">
              <BrutalButton
                variant="secondary"
                className="h-10"
                onClick={() => setIsModalOpen(false)}
              >
                Cancelar
              </BrutalButton>
            </div>
            <div className={`w-40 ${!newConfig ? "hidden" : "block"}`}>
              <BrutalButton
                variant="primary"
                className="h-10"
                onClick={() => {
                  setIsModalOpen(false);
                }}
              >
                Aceptar
              </BrutalButton>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
