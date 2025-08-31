import { Navigate, Route, Routes } from "react-router-dom";

export const CoursesRouter = () => {
  return (
    <Routes>
      <Route path="/*" element={<Navigate to="/courses" />} />
    </Routes>
  );
};
