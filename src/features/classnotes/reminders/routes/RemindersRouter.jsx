import { Navigate, Route, Routes } from "react-router-dom";
import { RemindersPage } from "../pages/RemindersPage";

export const RemindersRouter = () => {
  return (
    <Routes>
      <Route path="/pendientes" element={<RemindersPage />} />
      <Route path="/*" element={<Navigate to="/courses" />} />
    </Routes>
  );
};
