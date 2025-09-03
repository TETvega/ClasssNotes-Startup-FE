import { Route, Routes, Navigate } from "react-router-dom";
import {
  HistoryAttendencePage,
  StudentAttendancePage,
  TakeAttendencePage,
} from "../pages";

export const AttendancesRouter = () => {
  return (
    <Routes>
      <Route path=":courseId/now" element={<TakeAttendencePage />} />
      <Route path=":courseId/history" element={<HistoryAttendencePage />} />
      <Route path=":courseId/student/:studentId" element={<StudentAttendancePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
