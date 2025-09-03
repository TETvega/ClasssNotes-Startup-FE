import { classNotesApi } from "../../config";

export const checkInByOtp = async (values) => {
  const { email, OTP, x, y, courseId } = values;
  const url = `/attendancesR/create_my_attendance_OTP?email=${encodeURIComponent(email)}&OTP=${OTP}&x=${x}&y=${y}&courseId=${courseId}`;

  try {
    const response = await classNotesApi.post(url);
    return response.data;
  } catch (error) {
    console.error("Error en check-in:", error);
    throw error;
  }
};
