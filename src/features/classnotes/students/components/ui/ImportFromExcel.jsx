import { FaDownload, FaFolderOpen, FaUpload } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { useState } from "react";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import * as XLSX from "xlsx";
import { useExcelReader } from "../../hooks";
import { createStudentsFromExcelAsync } from "../../../../../shared/actions";
import { HelpIcon } from "../../../../../shared/components/ui";
import { ViewDataFiles } from "./ViewDataFiles";
import BrutalButton from "../../../../../shared/components/ui/BrutalButton";

export const ImportFromExcel = ({ isOpen, onClose }) => {
  const { courseId } = useParams();
  const queryClient = useQueryClient();
  const [strictMode, setStrictMode] = useState(true);

  const {
    file,
    setFile,
    fileData,
    emptyFields,
    readExcelFile,
    isLoading,
    error,
    reset,
  } = useExcelReader();

  // Importar estudiantes desde Excel
  const importStudentsMutation = useMutation({
    mutationFn: () => createStudentsFromExcelAsync(courseId, file, strictMode),
    onSuccess: (response) => {
      if (response.status) {
        toast.success("Estudiantes importados correctamente");
        queryClient.invalidateQueries(["students", courseId]);
        handleClose();
      } else {
        toast.error(`${response.message}`);
      }
    },
  });

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) return;

    // Validación de tamaño
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error(
        "El archivo es demasiado grande. Sube un archivo menor a 5MB.",
      );
      return;
    }

    // Validación de tipo
    const validTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];

    if (!validTypes.includes(selectedFile.type)) {
      toast.error(
        "Por favor selecciona un archivo Excel válido (.xls o .xlsx).",
      );
      return;
    }

    setFile(selectedFile);
    readExcelFile(selectedFile);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleImport = () => {
    if (!file) {
      toast.error("Por favor selecciona un archivo Excel");
      return;
    }
    importStudentsMutation.mutate();
  };

  // Para generar la plantilla
  const handleDownloadTemplate = () => {
    const ws = XLSX.utils.json_to_sheet([
      { Nombre: "Carlos", Apellidos: "Dubón Pineda", Correo: "carlos@me.com" },
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Plantilla");
    XLSX.writeFile(wb, "plantilla_estudiantes.xlsx");
  };

  return (
    isOpen && (
      <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
        <div className="max-h-screen w-full max-w-3xl overflow-auto rounded-lg bg-white p-6 shadow-lg sm:p-8 md:p-10">
          {/* Encabezado */}
          <div className="mb-4 flex flex-wrap items-center justify-between">
            <h2 className="text-xl font-semibold sm:text-2xl">
              Importar Estudiantes
            </h2>
            <button
              onClick={handleClose}
              className="cursor-pointer text-xl text-gray-500 hover:text-gray-700 sm:text-2xl"
            >
              <FiX />
            </button>
          </div>

          {/* Descripción */}
          <p className="mb-4 text-sm text-gray-600 sm:text-base">
            Importa estudiantes desde un archivo Excel para el curso.
          </p>

          {/* Checkbox para StrictMode */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <input
              type="checkbox"
              checked={strictMode}
              onChange={() => setStrictMode(!strictMode)}
              className="accent-action-primary h-4 w-4"
            />
            <span className="flex items-center gap-1.5 text-sm sm:text-base">
              Modo estricto
              <HelpIcon message="En modo estricto no se permiten emails duplicados" />
            </span>
          </div>

          {/* Seleccionar archivo */}
          <div className="mb-4 rounded-md border-2 border-dashed border-gray-300 p-4 text-center">
            <FaUpload className="mx-auto mb-2 text-gray-500" />
            <p className="text-sm text-gray-600 sm:text-base">
              Solo se permiten archivos .xls y .xlsx (máx. 5MB).
            </p>
            <input
              type="file"
              accept=".xls, .xlsx"
              className="hidden"
              id="fileInput"
              onChange={handleFileChange}
              disabled={isLoading || importStudentsMutation.isLoading}
            />
            <label
              htmlFor="fileInput"
              className="mt-2 inline-block cursor-pointer rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-700 sm:text-base"
            >
              {isLoading || importStudentsMutation.isLoading
                ? "Procesando..."
                : "Seleccionar archivo"}
            </label>
            {file && (
              <p className="mt-2 flex flex-wrap items-center justify-center gap-2 text-sm text-green-600 sm:text-base">
                <FaFolderOpen className="h-5 w-5" /> Archivo seleccionado:{" "}
                {file.name}
              </p>
            )}
          </div>

          {/* Pantalla de carga */}
          {(isLoading || importStudentsMutation.isLoading) && (
            <div className="flex items-center justify-center gap-2 p-4 text-sm sm:text-base">
              <CgSpinner className="h-5 w-5 animate-spin" />
              <span>Procesando archivo...</span>
            </div>
          )}

          {/* Mostrar posibles errores */}
          {error && (
            <div className="mb-4 rounded-md bg-red-100 p-3 text-sm text-red-700 sm:text-base">
              {error}
            </div>
          )}

          {/* Mostrar datos del archivo */}
          {fileData.length > 0 && !isLoading && (
            <ViewDataFiles fileData={fileData} emptyFields={emptyFields} />
          )}

          {/* Inforamción sobre el archivo */}
          <div className="mt-6">
            <p className="mb-2 text-sm text-gray-600 sm:text-base">
              El archivo Excel debe tener las siguientes columnas:
            </p>
            <ul className="mb-4 list-disc pl-5 text-sm text-gray-600 sm:text-base">
              <li>Nombre (obligatorio)</li>
              <li>Apellido (obligatorio)</li>
              <li>Email (obligatorio)</li>
            </ul>
          </div>

          {/* Botones */}
          <div className="flex flex-col justify-between gap-4 md:items-end">
            <div className="flex w-full flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 md:w-full">
              <BrutalButton
                variant="secondary"
                icon={<FaDownload />}
                className="h-10 min-w-full md:min-w-[220px]"
                onClick={handleDownloadTemplate}
              >
                Descargar plantilla
              </BrutalButton>
            </div>
            <div className="flex w-full flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-2 md:w-full">
              <BrutalButton
                variant="secondary"
                onClick={handleClose}
                className="h-10 w-full p-3"
              >
                Cancelar
              </BrutalButton>
              <BrutalButton
                variant="primary"
                className="h-10 w-full p-4"
                disabled={
                  !file || isLoading || importStudentsMutation.isLoading
                }
                onClick={handleImport}
              >
                {importStudentsMutation.isLoading
                  ? "Importando..."
                  : "Importar Estudiantes"}
              </BrutalButton>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
