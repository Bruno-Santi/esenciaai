import { Navigate, Route, Routes } from "react-router-dom";
import { LandingPage } from "../components";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { DashboardRoutes } from "../dashboard/routes/DashboardRoutes";
import { useAuthSlice } from "../hooks/useAuthSlice";

import { OnBoardingRoutes } from "../onboarding/routes/OnBoardingRoutes";
import ROUTES from "../constants/routes";
export const AppRouter = () => {
  const { status, firstLog } = useAuthSlice();
  const isAuthenticated = status === "authenticated";

  return (
    <div>
      <Routes>
        <Route element={<LandingPage />} path={ROUTES.landing} />
        {isAuthenticated ? (
          <>
            {/* Rutas para usuarios autenticados */}
            <Route element={<OnBoardingRoutes />} path={`${ROUTES.onboarding}/*`} />
            <Route element={<DashboardRoutes />} path={`${ROUTES.dashboard}/*`} />
            {firstLog === "0" ? (
              <Route element={<Navigate to={ROUTES.onboarding} />} path={`${ROUTES.auth}/*`} />
            ) : (
              <Route element={<Navigate to={ROUTES.dashboard} />} path={`${ROUTES.auth}/*`} />
            )}
          </>
        ) : (
          <>
            {/* Rutas para usuarios no autenticados */}
            <Route element={<AuthRoutes />} path={`${ROUTES.auth}/*`} />
            <Route element={<Navigate to='/' />} path={`${ROUTES.dashboard}/*`} />
            <Route element={<Navigate to='/' />} path={`${ROUTES.onboarding}/*`} />
          </>
        )}
      </Routes>
    </div>
  );
};
