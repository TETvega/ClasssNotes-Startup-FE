import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage, RecoverPasswordPage, RegisterPage, VerificationCodePage } from "../pages";
import { NewPasswordPage } from "../pages/NewPasswordPage";
import { usePasswordResetStore } from "../store/usePasswordResetStore";

export const AuthRouter = () => {
  const isEmailExisting = usePasswordResetStore(
    (state) => state.isEmailExisting,
  );

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<RecoverPasswordPage />} />
      <Route
        path="/verify-code"
        element={
          isEmailExisting ? (
            <VerificationCodePage />
          ) : (
            <Navigate to="/auth/login" />
          )
        }
      />
      <Route
        path="/reset-password"
        element={
          isEmailExisting ? <NewPasswordPage /> : <Navigate to="/auth/login" />
        }
      />
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
