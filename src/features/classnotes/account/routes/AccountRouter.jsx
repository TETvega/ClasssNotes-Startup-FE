import { Navigate, Route, Routes } from "react-router-dom";
import {
  AccountPage,
  ChangeEmailPage,
  ChangeNamePage,
  ChangePasswordPage,
} from "../pages";

export const AccountRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<AccountPage />} />
      <Route path="/change-password" element={<ChangePasswordPage />} />
      <Route path="/change-name" element={<ChangeNamePage />} />
      <Route path="/change-email" element={<ChangeEmailPage />} />
      <Route path="/*" element={<Navigate to="/account" />} />
    </Routes>
  );
};
