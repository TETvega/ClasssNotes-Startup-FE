import { SketchPicker } from "react-color";
import { Plus } from "lucide-react";
import { useTagForm } from "../hooks";
import { TagActivityIcon } from "./ui";
import BrutalButton from "../../../../shared/components/ui/BrutalButton";

export const TagForm = ({
  formik,
  title = "Nueva etiqueta",
  submitButtonText = "Crear etiqueta",
  submitButtonIcon = <Plus size={20} />,
  onCancel,
  isPending,
}) => {
  const {
    selectedIcon,
    selectedColor,
    iconLabels,
    availableIcons,
    predefinedColors,
    showColorPicker,
    colorPickerRef,
    setShowColorPicker,
    handleIconSelect,
    handleColorSelect,
    handleColorChange,
  } = useTagForm(formik);

  return (
    <div className="mx-auto w-full max-w-sm rounded-lg bg-gray-50 p-6 shadow-lg sm:max-w-md md:max-w-lg">
      {/* Encabezado */}
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-lg font-bold text-gray-800">{title}</h4>
      </div>

      {/* Formulario */}
      <form onSubmit={formik.handleSubmit} className="space-y-1">
        {/* Nombre de la etiqueta */}
        <div>
          <label className="mb-1 block text-sm font-medium">Nombre</label>
          <input
            type="text"
            name="name"
            placeholder="Ej: Proyecto"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            {...formik.getFieldProps("name")}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="mt-1 text-xs text-red-500">
              {formik.errors.name}
            </div>
          )}
        </div>

        {/* Selección de icono */}
        <div>
          <label className="mb-1 block text-sm font-medium">Icono</label>
          <div className="flex max-w-full space-x-2 overflow-x-auto py-1 pb-2">
            {availableIcons.map((icon) => (
              <div
                key={icon}
                onClick={() => handleIconSelect(icon)}
                className={`flex h-20 w-20 cursor-pointer flex-col items-center justify-center rounded-lg border p-1 transition-all ${
                  selectedIcon === icon
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <div className="mb-0.5 flex h-20 w-20 items-center justify-center">
                  {TagActivityIcon(
                    icon,
                    selectedIcon === icon ? selectedColor : "9ca3af",
                    6,
                  )}
                </div>
                <span className="text-center text-[11px] leading-tight">
                  {iconLabels[icon] || icon}
                </span>
              </div>
            ))}
          </div>
          {formik.touched.icon && formik.errors.icon && (
            <div className="mt-1 text-xs text-red-500">
              {formik.errors.icon}
            </div>
          )}
        </div>

        {/* Selección de color */}
        <div>
          <label className="mb-1 block text-sm font-medium">Color</label>
          {/* Colores predefinidos */}
          <div className="my-2.5 flex justify-between">
            {predefinedColors.map((color) => (
              <div
                key={color}
                onClick={() => handleColorSelect(color)}
                className={`h-7.5 w-7.5 cursor-pointer rounded-full transition-all ${
                  selectedColor === color
                    ? "ring-2 ring-gray-400 ring-offset-1"
                    : ""
                }`}
                style={{ backgroundColor: `#${color}` }}
              ></div>
            ))}
          </div>

          {/* Selector de color con SketchPicker */}
          <div className="relative">
            <div className="flex items-center space-x-2">
              {/* Cuadro de color para abrir el selector */}
              <div
                className="h-8 w-8 cursor-pointer rounded border border-gray-300"
                style={{ backgroundColor: `#${selectedColor}` }}
                onClick={() => setShowColorPicker(!showColorPicker)}
              ></div>
              {/* Input del código */}
              <input
                type="text"
                name="colorHex"
                value={`#${selectedColor}`}
                onChange={handleColorChange}
                className="flex-1 rounded-lg border border-gray-300 p-2 text-sm"
                placeholder="#000000"
                maxLength={7}
              />
              {/* SketchPicker (se muestra cuando showColorPicker es true) */}
              {showColorPicker && (
                <div
                  ref={colorPickerRef}
                  className="absolute bottom-full left-0 z-10 mb-1 rounded-lg shadow-lg"
                >
                  <SketchPicker
                    color={`#${selectedColor}`}
                    onChange={(color) =>
                      handleColorSelect(color.hex.replace("#", ""))
                    }
                    width="220px"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Mensaje de error */}
          {formik.touched.colorHex && formik.errors.colorHex && (
            <div className="mt-1 text-xs text-red-500">
              {formik.errors.colorHex}
            </div>
          )}
        </div>

        {/* Vista previa */}
        <div>
          <label className="mb-1 block text-sm font-medium">Vista previa</label>
          <div className="flex items-center justify-center rounded-lg border border-gray-200 p-2">
            {selectedIcon && selectedColor ? (
              <div className="flex items-center justify-center rounded-lg bg-gray-50 px-2 py-1">
                <div className="mr-1">
                  {TagActivityIcon(
                    selectedIcon,
                    selectedColor,
                    5,
                    formik.values.name,
                  )}
                </div>
              </div>
            ) : (
              <span className="text-disabled-text my-3 text-sm">
                Selecciona un icono y color para ver la vista previa
              </span>
            )}
          </div>
        </div>

        {/* Botones */}
        <div className="mt-4 flex flex-col justify-center gap-4 px-12 sm:flex-row">
          <div className="flex w-50">
            <BrutalButton
              variant="secondary"
              className="h-10 w-50"
              onClick={onCancel}
              disabled={isPending}
            >
              Regresar
            </BrutalButton>
          </div>
          <div className="flex w-50">
            <BrutalButton
              variant="icon"
              className="h-10 w-50"
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
