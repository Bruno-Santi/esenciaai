import { Navigate, Route, Routes } from "react-router-dom";
import { LandingPage } from "../components";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { DashboardRoutes } from "../dashboard/routes/DashboardRoutes";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route element={<LandingPage />} path='/' />
        <Route element={<DashboardRoutes />} path='/dashboard/*' />
        <Route element={<AuthRoutes />} path='/auth/*' />
        <Route element={<Navigate to='/' />} path='/*' />
      </Routes>
    </>
  );
};
