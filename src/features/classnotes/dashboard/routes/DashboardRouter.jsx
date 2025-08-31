import { Navigate, Route, Routes } from "react-router-dom";

export const DashboardRouter = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};
