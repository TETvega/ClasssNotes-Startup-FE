import { useFormik } from "formik";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { CenterData, EditInitialValuesCenter } from "../forms/center.data";
import { editCenterAsync } from "../../../../shared/actions";

export const useEditCenterForm = (initialValues, centerId, onCenterEdited) => {
  const [isPending, setIsPending] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: EditInitialValuesCenter(initialValues),
    validationSchema: CenterData,
    onSubmit: async (values) => {
      const toastId = toast.loading("Editando centro...");
      setIsPending(true);

      try {
        const hasNewLogo = values.logo && typeof values.logo !== "string";

        const result = await editCenterAsync(centerId, hasNewLogo, {
          name: values.nombre,
          abbreviation: values.abreviatura,
          imageFile: hasNewLogo ? values.logo : undefined,
        });

        toast.success(result.message);
        if (onCenterEdited) onCenterEdited();
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

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    formik.setFieldValue("logo", file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
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
    setIsDragging,
    handleFileChange,
    handleDrop,
    handleDragOver,
    handleDragLeave,
  };
};
