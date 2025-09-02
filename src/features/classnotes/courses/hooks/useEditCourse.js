import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useEffect, useState, useTransition } from "react";
import {
  editCourseAsync,
  editCourseLocationAsync,
  getCourseById,
} from "../../../../shared/actions";

export const useEditCourse = (courseId) => {
  const [isPending, startTransition] = useTransition();
  const [courseData, setCourseData] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getCourseById(courseId);
        setCourseData(data);
        setIsReady(true);
      } catch (err) {
        console.error("Error al obtener curso:", err);
      }
    };

    fetchCourse();
  }, [courseId]);

  const validate = (values) => {
    const errors = {};
    if (!values.courseName) errors.courseName = "El nombre es obligatorio";
    if (!values.section) errors.section = "La sección es obligatoria";
    if (!values.code) errors.code = "El código es obligatorio";
    if (!values.startTime)
      errors.startTime = "La hora de inicio es obligatoria";
    if (!values.finishTime)
      errors.finishTime = "La hora de finalización es obligatoria";
    return errors;
  };

  const editCourse = async (id, form) => {
    const toastId = toast.loading("Editando curso...");

    startTransition(async () => {
      try {
        const result = await editCourseAsync(id, form);
        if (!result?.id) {
          toast.error(result?.message || "Error al editar el curso.");
          return;
        }
        toast.success("Curso editado correctamente.");
        return result;
      } catch (error) {
        toast.error("Servidor no disponible. Intenta más tarde.");
        console.error(error);
      } finally {
        toast.dismiss(toastId);
      }
    });
  };

  const editCourseLocation = async (id, { x, y }) => {
    const toastId = toast.loading("Editando ubicación...");
    try {
      const result = await editCourseLocationAsync(id, { x, y });

      if (!result?.id) {
        toast.error(result?.message || "Error al editar la ubicación.");
        return;
      }

      toast.success("Ubicación actualizada.");
      return result;
    } catch (error) {
      toast.error("Error al actualizar ubicación.");
      console.error(error);
    } finally {
      toast.dismiss(toastId);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      courseName: courseData?.data?.course.name || "",
      centerId: courseData?.data?.course.centerId || "",
      section: courseData?.data?.course.section || "",
      code: courseData?.data?.course.code || "",
      startTime: courseData?.data?.course.startTime || "",
      finishTime: courseData?.data?.course.finishTime || "",
      isActive: courseData?.data?.course.isActive ?? true,
      x: courseData?.data?.courseSetting?.geoLocation?.x || 0,
      y: courseData?.data?.courseSetting?.geoLocation?.y || 0,
    },
    validate,
    onSubmit: async (values) => {
      const coursePayload = {
        name: values.courseName,
        centerId: values.centerId,
        section: values.section,
        code: values.code,
        startTime: `${values.startTime}`,
        finishTime: `${values.finishTime}`,
        isActive: values.isActive,
      };

      const locationPayload = {
        x: values.x,
        y: values.y,
      };

      await editCourse(courseId, coursePayload);
      await editCourseLocation(courseId, locationPayload);
    },
  });

  return {
    editCourse,
    editCourseLocation,
    formik,
    isPending,
    isReady,
    courseData,
  };
};
