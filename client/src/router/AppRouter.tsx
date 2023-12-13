import { Navigate, Route, Routes } from "react-router-dom";
import { LandingPage } from "../components";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { DashboardRoutes } from "../dashboard/routes/DashboardRoutes";
import { useAuthSlice } from "../hooks/useAuthSlice";
import { OnBoardingRoutes } from "../onboarding/routes/OnBoardingRoutes";
import { MembersRoutes } from "../members/routes/";
import { useEffect } from "react";

export const AppRouter = () => {
  const { status, firstLog } = useAuthSlice();
  const isAuthenticated = status === "authenticated";
  const { startCheckingUser } = useAuthSlice();
  useEffect(() => {
    startCheckingUser();
    if (status === "authenticated") localStorage.setItem("isAuthenticated", 'true');
  }, []);
  const isAuthenticated1 = localStorage.getItem("isAuthenticated");

  return (
    <div>
      <Routes>
        {isAuthenticated1 ? (
          <>
            {/* Rutas para usuarios autenticados */}
            <Route element={<LandingPage />} path={"/"} />
            <Route element={<OnBoardingRoutes />} path={`/onboarding/*`} />
            <Route element={<DashboardRoutes />} path={`/dashboard/*`} />
            <Route element={<MembersRoutes />} path={`/members/*`} />
            {firstLog === "0" ? (
              <Route element={<Navigate to={"/onboarding"} />} path={`/auth/*`} />
            ) : (
              <Route element={<Navigate to={"/dashboard"} />} path={`/auth/*`} />
            )}
          </>
        ) : (
          <>
            {/* Rutas para usuarios no autenticados */}
            <Route element={<LandingPage />} path={"/"} />
            <Route element={<AuthRoutes />} path={`/auth/*`} />
            <Route element={<Navigate to='/' />} path={`/dashboard/*`} />
            <Route element={<Navigate to='/' />} path={`/onboarding/*`} />
          </>
        )}
      </Routes>
    </div>
  );
};
