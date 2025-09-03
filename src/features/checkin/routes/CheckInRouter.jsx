import { Navigate, Route, Routes } from "react-router-dom";
import { CheckInByEmailPage, CheckInByQRCodePage, CheckInSuccesPage } from "../pages";

export const CheckInRouter = () => {
  return (
    <Routes>
      <Route path="/email" element={<CheckInByEmailPage />} />
      <Route path="/qr-code" element={<CheckInByQRCodePage />} />
      <Route path="/success" element={<CheckInSuccesPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
