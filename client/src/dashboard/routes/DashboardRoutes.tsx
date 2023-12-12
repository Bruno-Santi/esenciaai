import { Navigate, Route, Routes } from "react-router-dom";
import { FeedbackRecognition, Main, Retrospectives } from "../pages";

export const DashboardRoutes = () => {
  return (
    <Routes>
      <Route element={<Main />} path='/' />
      <Route element={<Retrospectives />} path='/retro' />
      <Route element={<FeedbackRecognition />} path='/feedback' />
      <Route path='/*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};
