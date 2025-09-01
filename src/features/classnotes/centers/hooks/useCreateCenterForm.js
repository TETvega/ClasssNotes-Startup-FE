import { useRef, useState } from "react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { CenterData, CreateInitialValuesCenter } from "../forms/center.data";
import { createCenterAsync } from "../../../../shared/actions";

export const useCreateCenterForm = (onCenterCreated) => {
  const [isPending, setIsPending] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Referencia al input de archivo para poder activarlo manualmente desde otro elemento
  const fileInputRef = useRef(null);

  // useFormik maneja el estado y validación del formulario
  const formik = useFormik({
    initialValues: CreateInitialValuesCenter,
    validationSchema: CenterData,
    onSubmit: async (values) => {
      const toastId = toast.loading("Creando Centro...");
      setIsPending(true);

      try {
        const result = await createCenterAsync({
          name: values.nombre,
          abbreviation: values.abreviatura || null,
          imageFile: values.logo || null,
        });

        if (!result.status) {
          toast.error(result.message);
          console.error("Error al crear el centro: ", result.message);
          return;
        }

        toast.success(result.message);
        if (onCenterCreated) {
          onCenterCreated();
        }
        formik.handleReset();
      } catch (error) {
        toast.error(
          "El servidor no está disponible. Por favor, inténtelo más tarde.",
        );
        console.error(error);
      } finally {
        toast.dismiss(toastId);
        setIsPending(false);
      }
    },
  });

  // Maneja el cambio de archivo cuando el usuario sube una imagen
  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null; // Obtiene el primer archivo o null si no hay archivo
    formik.setFieldValue("logo", file); // Establece el valor del logo en Formik
  };

  //* Manejar archivo soltado
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      formik.setFieldValue("logo", file);
      e.dataTransfer.clearData();
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return {
    formik,
    fileInputRef,
    isPending,
    isDragging,
    handleFileChange,
    handleDrop,
    setIsDragging,
    handleDragOver,
    handleDragLeave,
  };
};
