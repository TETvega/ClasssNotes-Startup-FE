import { Navigate, Route, Routes } from "react-router-dom";

export const ActivitiesRouter = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/activities" replace />} />
    </Routes>
  );
};
