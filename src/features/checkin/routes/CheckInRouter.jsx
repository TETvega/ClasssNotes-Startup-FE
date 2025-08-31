import { Navigate, Route, Routes } from "react-router-dom";

export const CheckInRouter = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
