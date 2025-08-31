import { Route, Routes, Navigate } from "react-router-dom";

export const AttendancesRouter = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
