import { Navigate, Route, Routes } from "react-router-dom";
import { FeedbackRecognition, Main, Retrospectives } from "../pages";
import { useDashboard } from "../../hooks/useDashboard";
import { useEffect } from "react";

export const DashboardRoutes = () => {
  const { startSettingUser, startSettingTeams, userTeams } = useDashboard();

  useEffect(() => {
    const fetchData = async () => {
      await startSettingUser();
      await startSettingTeams();
    };

    fetchData();
  }, []);
  return (
    <Routes>
      <Route element={<Main />} path='/' />
      <Route element={<Retrospectives />} path='/retro' />
      <Route element={<FeedbackRecognition />} path='/feedback' />
      <Route path='/*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};
