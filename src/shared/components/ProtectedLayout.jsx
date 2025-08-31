import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../features/auth/store";

export const ProtectedLayout = () => {
  const isAuthenicated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenicated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="h-full w-full">
      <Outlet />
    </div>
  );
};
