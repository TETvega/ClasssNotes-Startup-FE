import { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useBreadcrumbStore } from "../shared/store/useBreadcrumbStore";
import { useAuthStore } from "../features/auth/store";
import { useAttendanceStatusStore } from "../features/classnotes/attendances/store/useAttendanceStatusStore";
import { NavBar } from "../shared/components/ui/NavBar";
import { NavBarAuth } from "../features/auth/components/NavBarAuth";
import { AuthRouter } from "../features/auth/routes/AuthRouter";
import { LandingPage } from "../shared/pages/LandingPage";
import { CheckInRouter } from "../features/checkin/routes/CheckInRouter";
import { ProtectedLayout } from "../shared/components/ProtectedLayout";
import { DashboardRouter } from "../features/classnotes/dashboard/routes/DashboardRouter";
import { CentersRouter } from "../features/classnotes/centers/routes/CentersRouter";
import { CoursesRouter } from "../features/classnotes/courses/routes/CoursesRouter";
import { ActivitiesRouter } from "../features/classnotes/activities/routes/ActivitiesRouter";
import { AccountRouter } from "../features/classnotes/account/routes/AccountRouter";
import { AttendancesRouter } from "../features/classnotes/attendances/routes/AttendancesRouter";
import { NotFoundPage } from "../shared/pages/NotFoundPage";
import { useTagsListStore } from "../features/classnotes/tags/store/useTagsListStore";

export const ClassNotesRouter = () => {
  const { getCurrentCenter, getCurrentCourse, getCurrentActivity } = useBreadcrumbStore();
  const { isAuthenticated, validateAuthentication } = useAuthStore();
  const { getAttendancesInProgress } = useAttendanceStatusStore();
  const { getTags } = useTagsListStore();

  useEffect(() => {
    validateAuthentication();
    getCurrentCenter();
    getCurrentCourse();
    getCurrentActivity();
    getTags();
    getAttendancesInProgress();
  }, [validateAuthentication]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 bg-[url(https://i.postimg.cc/wjx6rjtv/bg-auth.jpg)]">
      
      {/* Condición para mostrar u ocultar NavBar */}
      {isAuthenticated ? <NavBar /> : <NavBarAuth />}{" "}

      <div className="w-3/4 flex-grow py-5">
        <div className="flex justify-between">
          <Routes>

            {/* Rutas públicas */}
            <Route path="/auth/*" element={<AuthRouter />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/check-in/*" element={<CheckInRouter />} />

            {/* Rutas protegidas */}
            <Route element={<ProtectedLayout />}>
              <Route path="/dashboard/*" element={<DashboardRouter />} />
              <Route path="/centers/*" element={<CentersRouter />} />
              <Route path="/courses/*" element={<CoursesRouter />} />
              <Route path="/activities/*" element={<ActivitiesRouter />} />
              <Route path="/account/*" element={<AccountRouter />} />
              <Route path="/attendances/*" element={<AttendancesRouter />} />
            </Route>

            {/* Rutas no encontradas */}
            <Route path="/not-found/*" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>
        </div>
      </div>
    </div>
  );
};
