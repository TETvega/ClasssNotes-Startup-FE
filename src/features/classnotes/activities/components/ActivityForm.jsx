import { FiChevronDown } from "react-icons/fi";
import { CiCirclePlus } from "react-icons/ci";
import { LucideTag, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TbAlertCircle } from "react-icons/tb";
import { HelpIcon } from "../../../../shared/components/ui";
import { TagActivityIcon } from "../../tags/components/ui";
import BrutalButton from "../../../../shared/components/ui/BrutalButton";

export const ActivityForm = ({
  formik,
  units = [],
  tags = [],
  title = "Formulario de Actividad",
  submitButtonText = "Botón Formulario",
  submitButtonIcon = <CiCirclePlus size={20} />,
  onCancel,
  isPending,
  className = "",
  setIsModalOpen,
  showDeleteButton = false,
  onDelete,
  editMode = false,
}) => {
  // Asegurarse de que tags sea un array antes de usar find
  const tagsArray = Array.isArray(tags) ? tags : [];
  const navigate = useNavigate();
  // Encontrar la etiqueta seleccionada
  const selectedTag = formik.values.tagActivityId
    ? tagsArray.find(
        (tag) => String(tag.id) === String(formik.values.tagActivityId),
      )
    : null;

  const handleCancel = () => {
    if (onCancel) {
      formik.resetForm();
      navigate(-1);
    }
  };

  return (
    <div className={`border shadow-xl rounded-lg bg-gray-50 mt-6 p-4 sm:p-6 ${className}`}>
      {/* Titulo */}
      <h1 className="mb-4 text-xl font-bold sm:text-2xl">{title}</h1>

      {/* Formulario */}
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Nombre */}
        <div>
          <label className="text-sm font-medium sm:text-base">
            Nombre de la actividad
          </label>
          <input
            type="text"
            name="name"
            placeholder="Ej: Tarea #1"
            className="border-disabled-text mt-2 w-full rounded-lg border p-2 pl-3 text-sm sm:text-base"
            {...formik.getFieldProps("name")}
            required
          />
          {formik.touched.name && formik.errors.name && (
            <div className="mt-1 text-sm text-red-500">
              {formik.errors.name}
            </div>
          )}
        </div>

        {/* Descripción */}
        <div>
          <label className="text-sm font-medium text-gray-700 sm:text-base">
            Descripción (opcional)
          </label>
          <textarea
            name="description"
            type="text"
            placeholder="Ej: La siguiente tarea consiste en..."
            rows={3}
            className="border-disabled-text mt-2 w-full rounded-lg border p-2 pl-3 text-sm sm:text-base"
            {...formik.getFieldProps("description")}
          />
          {formik.touched.description && formik.errors.description && (
            <div className="mt-1 text-sm text-red-500">
              {formik.errors.description}
            </div>
          )}
        </div>

        {/* Selectores */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Seleccionar unidad */}
          {!editMode ? (
            <div className="relative">
              <label className="text-sm font-medium sm:text-base">Unidad</label>
              <div className="relative mt-2">
                <select
                  name="unitId"
                  className="border-disabled-text w-full appearance-none rounded-lg border p-2 pr-10 pl-3 text-sm sm:text-base"
                  {...formik.getFieldProps("unitId")}
                  required
                >
                  <option value="">Seleccionar unidad</option>
                  {units.map((unit) => (
                    <option key={unit.id} value={unit.id}>
                      {unit.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-1 flex items-center px-2">
                  <FiChevronDown size={16} />
                </div>
              </div>
              {formik.touched.unitId && formik.errors.unitId && (
                <div className="mt-1 text-sm text-red-500">
                  {formik.errors.unitId}
                </div>
              )}
            </div>
          ) : (
            // En modo edición la unidad solo se muestra pero no se puede cambiar
            <div className="relative">
              <label className="flex gap-1 items-center text-sm font-medium sm:text-base">
                <span>Unidad</span>
              </label>
              <div className="relative mt-2">
                <div className="border-disabled-text bg-gray-100 w-full appearance-none rounded-lg border p-2 pr-10 pl-3 text-sm sm:text-base">
                  {units.find((unit) => unit.id === formik.values.unitId)?.name}
                </div>
                <div className="absolute inset-y-0 right-1 flex items-center px-2">
                  <HelpIcon
                    icon={<TbAlertCircle size={19} />}
                    message="No es permitido cambiar la unidad de una actividad"
                    position="top"
                    width="80"
                    height="10"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Seleccionar etiqueta (Modal) */}
          <div className="relative">
            <label className="text-sm font-medium sm:text-base">Etiqueta</label>
            <div className="relative mt-2">
              {selectedTag && selectedTag.icon && selectedTag.colorHex ? (
                <div
                  className="border-disabled-text cursor-pointer overflow-hidden rounded-lg border p-0"
                  onClick={() => setIsModalOpen(true)}
                >
                  <div
                    style={{
                      backgroundColor: `#${selectedTag.colorHex}33`,
                    }}
                    className="flex w-full items-center justify-between py-0.5 pr-3 pl-0.5"
                  >
                    <div className="flex items-center">
                      {TagActivityIcon(
                        selectedTag.icon,
                        selectedTag.colorHex,
                        5,
                      )}
                    </div>
                    <div
                      className="mr-1 font-medium"
                      style={{ color: `#${selectedTag.colorHex}` }}
                    >
                      {selectedTag.name === "Undefined" ? "Sin etiqueta" : selectedTag.name}
                    </div>
                    <LucideTag
                      size={16}
                      style={{ color: `#${selectedTag.colorHex}` }}
                    />
                  </div>
                </div>
              ) : (
                <div
                  className="border-disabled-text flex w-full cursor-pointer items-center justify-between rounded-lg border p-2 pr-10 pl-3 text-sm sm:text-base"
                  onClick={() => setIsModalOpen(true)}
                >
                  <span>Seleccionar etiqueta</span>
                  <div className="absolute inset-y-0 right-1 flex items-center px-2">
                    <LucideTag size={16} />
                  </div>
                </div>
              )}
            </div>
            {formik.touched.tagActivityId && formik.errors.tagActivityId && (
              <div className="mt-1 text-sm text-red-500">
                {formik.errors.tagActivityId}
              </div>
            )}
          </div>

          {/* Seleccionar fecha */}
          <div>
            <label className="text-sm font-medium sm:text-base">
              Fecha de calificación
            </label>
            <input
              type="date"
              name="qualificationDate"
              className="border-disabled-text mt-2 w-full appearance-none rounded-lg border p-2 pl-3 text-sm sm:text-base"
              {...formik.getFieldProps("qualificationDate")}
              required
            />
            {formik.touched.qualificationDate &&
              formik.errors.qualificationDate && (
                <div className="mt-1 text-sm text-red-500">
                  {formik.errors.qualificationDate}
                </div>
              )}
          </div>
        </div>

        {/* Toggle de sobre 100 */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-inactive-primary-text text-sm font-medium sm:text-base">
            La actividad se califica sobre 100 puntos
          </span>
          <label className="flex cursor-pointer items-center">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                {...formik.getFieldProps("isExtra")}
                checked={formik.values.isExtra}
                onChange={() => {
                  formik.setFieldValue("isExtra", !formik.values.isExtra);
                }}
              />
              <div
                className={`h-4 w-10 rounded-full shadow-inner ${
                  formik.values.isExtra ? "bg-action-primary" : "bg-gray-300"
                }`}
              ></div>
              <div
                className={`dot border-disabled-text absolute -top-1 left-0 h-6 w-6 rounded-full border bg-white shadow transition ${
                  formik.values.isExtra ? "translate-x-4" : ""
                }`}
              ></div>
            </div>
          </label>
          {/* Icono de información al pasar el cursor */}
          <HelpIcon
            message="El puntaje de la actividad contará como puntos extra"
            position="top"
            width="80"
            height="10"
          />
        </div>

        {/* Calificación maxima */}
        <div>
          <label className="text-sm font-medium sm:text-base">
            Calificación máxima
          </label>
          <input
            type="number"
            placeholder="Ej: 20"
            name="maxScore"
            className="border-disabled-text mt-2 w-full rounded-lg border p-2 pl-3 text-sm sm:text-base"
            {...formik.getFieldProps("maxScore")}
            onInput={(e) => {
              e.target.value = e.target.value
                .replace(/[^0-9]/g, "")
                .replace(/^0+/, "");
            }}
            required
          />
          {formik.touched.maxScore && formik.errors.maxScore && (
            <div className="mt-1 text-sm text-red-500">
              {formik.errors.maxScore}
            </div>
          )}
        </div>

        {/* Botones */}
        <div className="flex w-full flex-col justify-between gap-3 sm:flex-row">
          <div className="flex w-full justify-center sm:mr-3 sm:w-auto sm:justify-start">
            {/* Botón de eliminar (opcional) */}
            {showDeleteButton && (
              <BrutalButton
                variant="icon"
                className="h-10 w-full bg-red-500 px-6 hover:bg-red-600"
                icon={<Trash2 size={20} />}
                onClick={onDelete}
                disabled={isPending}
              >
                Eliminar actividad
              </BrutalButton>
            )}
          </div>
          <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:justify-end">
            <BrutalButton
              className="h-10 px-14 sm:w-auto"
              onClick={handleCancel}
              variant="secondary"
              disabled={isPending}
            >
              Cancelar
            </BrutalButton>
            <BrutalButton
              className="h-10 w-full sm:w-full md:w-60"
              variant="icon"
              icon={submitButtonIcon}
              type="submit"
              disabled={isPending}
            >
              {submitButtonText}
            </BrutalButton>
          </div>
        </div>
      </form>
    </div>
  );
};
