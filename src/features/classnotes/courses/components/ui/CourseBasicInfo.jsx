import { useState } from "react";
import { useWizard } from "react-use-wizard";
import { FaChevronDown, FaGear } from "react-icons/fa6";
import { Listbox } from "@headlessui/react";
import { useCentersCourse } from "../../hooks/useCentersCourse";
import BrutalButton from "../../../../../shared/components/ui/BrutalButton";

export function Step1({
  formik,
  newConfig,
  setNewConfig,
  setIsModalOpen,
  isEditing,
  isPending,
  editLocation,
  setEditLocation,
}) {
  const { nextStep } = useWizard();
  const [configOptionSelected, setConfigOptionSelected] = useState(null);

  const { data } = useCentersCourse();

  const centers = data?.pages.flatMap((page) => page.data) || [];

  return (
    <div className="border-disabled-text-bg space-y-6 border-t-2">
      <div>
        <h2
          className={`mt-3 text-xl font-bold ${isEditing ? "hidden" : "block"}`}
        >
          Información básica del curso
        </h2>
        <h3 className="flex text-sm font-light">
          * establece campos opcionales
        </h3>
      </div>

      <div className={`grid grid-cols-2 gap-4 ${isEditing ? "mt-4" : ""}`}>
        <div>
          <label>Centro educativo</label>
          <Listbox
            value={formik.values.centerId}
            onChange={(value) => formik.setFieldValue("centerId", value)}
            disabled={isEditing}
          >
            {({ open }) => (
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-pointer rounded border p-2 text-left">
                  <span>
                    {centers.find((c) => c.id === formik.values.centerId)
                      ?.name ?? "Selecciona"}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <FaChevronDown className="text-gray-400" />
                  </span>
                </Listbox.Button>
                {open && (
                  <Listbox.Options className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-md border bg-white text-sm shadow-sm focus:outline-none">
                    <Listbox.Option value="">
                      {({ active }) => (
                        <li
                          className={`cursor-pointer p-2 ${
                            active ? "bg-gray-100" : ""
                          }`}
                        >
                          Selecciona
                        </li>
                      )}
                    </Listbox.Option>
                    {centers.map((center) => (
                      <Listbox.Option key={center.id} value={center.id}>
                        {({ selected, active }) => (
                          <li
                            className={`cursor-pointer p-2 ${
                              active ? "bg-gray-100" : ""
                            } ${selected ? "font-semibold" : ""}`}
                          >
                            {center.name}
                          </li>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                )}
              </div>
            )}
          </Listbox>
          {formik.touched.centerId && formik.errors.centerId && (
            <p className="mt-1 text-sm text-red-500">
              {formik.errors.centerId}
            </p>
          )}
        </div>
        <div>
          <label>Nombre del curso</label>
          <input
            type="text"
            name="courseName"
            value={formik.values.courseName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 w-full rounded border p-2"
            placeholder="Ej: Matemáticas 110"
          />
          {formik.touched.courseName && formik.errors.courseName && (
            <p className="mt-1 text-sm text-red-500">
              {formik.errors.courseName}
            </p>
          )}
        </div>
        <div className="mt-2">
          <label>Sección *</label>
          <input
            type="text"
            name="section"
            value={formik.values.section}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 w-full rounded border p-2"
            placeholder="Ej: A,B,1600"
          />
          {formik.touched.section && formik.errors.section && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.section}</p>
          )}
        </div>
        <div className="mt-2">
          <label>Código del curso *</label>
          <input
            type="text"
            name="code"
            value={formik.values.code}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 w-full rounded border p-2"
            placeholder="Ej: IS610"
          />
          {formik.touched.code && formik.errors.code && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.code}</p>
          )}
        </div>
        <div className="mt-2">
          <label>Hora de inicio</label>
          <input
            type="time"
            name="startTime"
            value={formik.values.startTime}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 w-full rounded border p-2"
          />
          {formik.touched.startTime && formik.errors.startTime && (
            <p className="mt-1 text-sm text-red-500">
              {formik.errors.startTime}
            </p>
          )}
        </div>
        <div className="mt-2">
          <label>Hora de finalización *</label>
          <input
            type="time"
            name="finishTime"
            value={formik.values.finishTime}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 w-full rounded border p-2"
          />
          {formik.touched.finishTime && formik.errors.finishTime && (
            <p className="mt-1 text-sm text-red-500">
              {formik.errors.finishTime}
            </p>
          )}
        </div>
      </div>

      <div className="border-disabled-text-bg mt-4 border-t-2 border-b-2 py-4">
        {isEditing ? (
          <div>
            <h3 className="mb-2 font-semibold">Geolocalización</h3>
            <label className="flex items-center gap-2">
              <div className="border-disabled-text-bg flex h-5 w-5 cursor-pointer items-center justify-center rounded-md border">
                <input
                  type="radio"
                  name="option"
                  value="1"
                  className="peer hidden"
                  onClick={() => {
                    setEditLocation(true);
                  }}
                />
                <div className="peer-checked:border-brand-secondary peer-checked:bg-brand-secondary h-3 w-3 rounded-full transition-all duration-150"></div>
              </div>
              Editar ubicación del curso
            </label>
          </div>
        ) : (
          <div>
            <h3 className="mb-2 font-semibold">Configuración del curso</h3>
            <div className="mb-2 flex items-center gap-4">
              <label className="flex items-center gap-2">
                <div className="border-disabled-text-bg flex h-5 w-5 cursor-pointer items-center justify-center rounded-md border">
                  <input
                    type="radio"
                    name="option"
                    value="1"
                    className="peer hidden"
                    onClick={() => {
                      setNewConfig(true);
                      setConfigOptionSelected("nueva");
                    }}
                  />
                  <div className="peer-checked:border-brand-secondary peer-checked:bg-brand-secondary h-3 w-3 rounded-full transition-all duration-150"></div>
                </div>
                Crear nueva configuración
              </label>
              <label className="flex items-center gap-2">
                <div className="border-disabled-text-bg flex h-5 w-5 cursor-pointer items-center justify-center rounded-md border">
                  <input
                    type="radio"
                    name="option"
                    value="1"
                    className="peer hidden"
                    onClick={() => {
                      setNewConfig(false);
                      setConfigOptionSelected("plantilla");
                    }}
                  />
                  <div className="peer-checked:border-brand-secondary peer-checked:bg-brand-secondary h-3 w-3 rounded-full transition-all duration-150"></div>
                </div>
                Usar plantilla existente
              </label>
            </div>
            {configOptionSelected && (
              <div className="mt-4">
                <BrutalButton
                  variant="icon"
                  icon={<FaGear size={20} />}
                  onClick={() => setIsModalOpen(true)}
                >
                  {newConfig ? "Configurar curso" : "Seleccionar plantilla"}
                </BrutalButton>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-end">
        {isEditing ? (
          editLocation ? (
            <div className="w-28">
              <BrutalButton variant="primary" onClick={nextStep}>
                Siguiente
              </BrutalButton>
            </div>
          ) : (
            <div className="w-44">
              <BrutalButton
                variant="primary"
                onClick={formik.handleSubmit}
                disabled={isPending}
              >
                {isPending ? "Guardando..." : "Guardar cambios"}
              </BrutalButton>
            </div>
          )
        ) : (
          <div className="w-28">
            <BrutalButton variant="primary" onClick={nextStep}>
              Siguiente
            </BrutalButton>
          </div>
        )}
      </div>
    </div>
  );
}
