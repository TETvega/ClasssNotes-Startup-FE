import { Navigate, Route, Routes } from "react-router-dom";
import { ChangePasswordPage } from "../pages/ChangePasswordPage";

export const AccountRouter = () => {
  return (
    <Routes>
      <Route path="/change-password" element={<ChangePasswordPage />} />
      <Route path="/*" element={<Navigate to="/account" />} />
    </Routes>
  );
};
