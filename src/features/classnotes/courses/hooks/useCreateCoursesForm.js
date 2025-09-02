import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createCourseAsync } from "../../../../shared/actions";
import { courseValidationSchema } from "../forms";

export const useCreateCourseForm = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const response = await createCourseAsync(formData);
      return response;
    },
    onSuccess: () => {
      toast.success("Curso creado con éxito");
      navigate(`/courses`);
    },
    onError: () => {
      toast.error("Servidor no disponible. Intenta más tarde.");
    },
  });

  const formik = useFormik({
    initialValues: {
      centerId: "",
      courseName: "",
      section: "",
      code: "",
      startTime: "",
      finishTime: "",
      settingId: "",
      units: [{ maxScore: "" }],
      courseSetting: {
        name: "",
        scoreType: "",
        startDate: "",
        endDate: "",
        getLocationDto: {
          x: "",
          y: "",
        },
        validateRangeMeters: "",
        minimumGrade: "",
        maximumGrade: "",
        minimumAttendanceTime: "",
      },
    },
    validationSchema: courseValidationSchema,
    validateOnBlur: true,
    onSubmit: async (values) => {
      const creatingNewSetting =
        !values.settingId || values.settingId.trim() === "";

      const formData = {
        course: {
          name: values.courseName,
          section: values.section,
          startTime: `${values.startTime}:00`,
          finishTime: `${values.finishTime}:00`,
          code: values.code,
          centerId: values.centerId,
          ...(creatingNewSetting ? {} : { settingId: values.settingId }),
        },
        ...(creatingNewSetting && {
          courseSetting: {
            name: values.courseSetting.name,
            scoreType: values.courseSetting.scoreType,
            startDate: new Date(values.courseSetting.startDate).toISOString(),
            endDate: new Date(values.courseSetting.endDate).toISOString(),
            getLocationDto: {
              x: values.courseSetting.getLocationDto.x,
              y: values.courseSetting.getLocationDto.y,
            },
            validateRangeMeters: values.courseSetting.validateRangeMeters,
            minimumGrade: values.courseSetting.minimumGrade,
            maximumGrade: values.courseSetting.maximumGrade,
            minimumAttendanceTime: values.courseSetting.minimumAttendanceTime,
          },
        }),
        units: values.units.map((unit, index) => ({
          unitNumber: index + 1,
          maxScore: unit.maxScore,
        })),
      };

      mutation.mutate(formData);
    },
  });

  return {
    formik,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    courseData: mutation.data,
  };
};
