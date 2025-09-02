import { Navigate, Route, Routes } from "react-router-dom";
import {
  CoursesCreatePage,
  CoursesDashboardPage,
  CoursesPage,
  EditCoursesPage,
} from "../pages";
import { RemindersPage } from "../../reminders/pages";
import { StudentsPage } from "../../students/pages";

export const CoursesRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<CoursesPage />} />
      <Route path="/:courseId" element={<CoursesDashboardPage />} />
      <Route path="/new" element={<CoursesCreatePage />} />
      <Route path="/:courseId/edit" element={<EditCoursesPage />} />
      <Route path="/:courseId/reminders" element={<RemindersPage />} />
      <Route path="/:courseId/students" element={<StudentsPage />} />  
      {/*
      <Route path="/:courseId/grades" element={<GradesPage />} />
      */}
      <Route path="/*" element={<Navigate to="/courses" />} />
    </Routes>
  );
};
