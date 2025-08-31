import { Navigate, Route, Routes } from "react-router-dom";

export const CentersRouter = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/centers" replace />} /> 
    </Routes>
  );
};
