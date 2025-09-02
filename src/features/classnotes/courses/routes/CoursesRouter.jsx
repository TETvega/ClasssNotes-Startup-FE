import { Navigate, Route, Routes } from "react-router-dom";
import { RemindersPage } from "../../reminders/pages";
import { StudentsPage } from "../../students/pages";
import { GradesPage } from "../../grades/pages";
import {
  CoursesCreatePage,
  CoursesDashboardPage,
  CoursesPage,
  EditCoursesPage,
} from "../pages";

export const CoursesRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<CoursesPage />} />
      <Route path="/:courseId" element={<CoursesDashboardPage />} />
      <Route path="/new" element={<CoursesCreatePage />} />
      <Route path="/:courseId/edit" element={<EditCoursesPage />} />
      <Route path="/:courseId/reminders" element={<RemindersPage />} />
      <Route path="/:courseId/students" element={<StudentsPage />} />
      <Route path="/:courseId/grades" element={<GradesPage />} />
      <Route path="/*" element={<Navigate to="/courses" />} />
    </Routes>
  );
};
