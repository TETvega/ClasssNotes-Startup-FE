import { Navigate, Route, Routes } from "react-router-dom";
import { CenterCoursesPage, CentersPage } from "../pages";

export const CentersRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<CentersPage />} />
      <Route path="/:centerId/courses" element={<CenterCoursesPage />} />
      <Route path="*" element={<Navigate to="/centers" replace />} />
    </Routes>
  );
};
