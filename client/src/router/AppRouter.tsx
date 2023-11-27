import { Navigate, Route, Routes } from "react-router-dom";
import { LandingPage } from "../components";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { DashboardRoutes } from "../dashboard/routes/DashboardRoutes";
import { useAuthSlice } from "../hooks/useAuthSlice";

import { OnBoardingRoutes } from "../onboarding/routes/OnBoardingRoutes";

export const AppRouter = () => {
  const { status } = useAuthSlice();
  const isAuthenticated = status === "authenticated";

  return (
    <div>
      <Routes>
        <Route element={<LandingPage />} path='/' />
        {isAuthenticated ? (
          <>
            {/* Rutas para usuarios autenticados */}

            <Route element={<DashboardRoutes />} path='/dashboard/*' />
            <Route element={<OnBoardingRoutes />} path='/onboarding/*' />
            <Route element={<Navigate to='/dashboard' />} path='/auth/*' />
          </>
        ) : (
          <>
            {/* Rutas para usuarios no autenticados */}
            <Route element={<AuthRoutes />} path='/auth/*' />
            <Route element={<Navigate to='/' />} path='/dashboard/*' />
          </>
        )}
      </Routes>
    </div>
  );
};
