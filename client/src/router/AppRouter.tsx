import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LandingPage } from "../components";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { DashboardRoutes } from "../dashboard/routes/DashboardRoutes";
import { useAuthSlice } from "../hooks/useAuthSlice";
import { OnBoardingRoutes } from "../onboarding/routes/OnBoardingRoutes";
import { MembersRoutes } from "../members/routes/";

export const AppRouter = () => {
  const { status, firstLog, startCheckingUser } = useAuthSlice();

  useEffect(() => {
    startCheckingUser();
  }, [startCheckingUser]);

  useEffect(() => {
    if (status === "authenticated") {
      localStorage.setItem("isAuthenticated", true);
    }
  }, [status]);

  const isAuthenticated = localStorage.getItem("isAuthenticated");

  return (
    <div>
      <Routes>
        {isAuthenticated ? (
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

