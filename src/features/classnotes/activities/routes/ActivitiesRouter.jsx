import { Navigate, Route, Routes } from "react-router-dom";
import {
  ActivitiesCoursePage,
  AllActivitiesPage,
  CreateActivityPage,
  EditActivityPage,
  GradeActivityPage,
} from "../pages";

export const ActivitiesRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<AllActivitiesPage />} />
      <Route path="/:courseId" element={<ActivitiesCoursePage />} />
      <Route path="/:courseId/new" element={<CreateActivityPage />} />
      <Route path="/:courseId/edit" element={<EditActivityPage />} />
      <Route path="/:activityId/grade" element={<GradeActivityPage />} />
      <Route path="*" element={<Navigate to="/activities" replace />} />
    </Routes>
  );
};
