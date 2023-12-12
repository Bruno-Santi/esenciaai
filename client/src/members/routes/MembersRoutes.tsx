import { Route, Routes } from "react-router-dom";
import { AdditionalComments, Retro, Survey } from "../pages";
import ROUTES from "../../constants/routes";
import SurveyWrapper from "../helpers/SurveyWrapper";
import { FinishedSurvey } from "../pages/FinishedSurvey";

export const MembersRoutes = () => {
  return (
    <Routes>
      <Route path='/survey' element={<SurveyWrapper />} />
      <Route element={<AdditionalComments />} path='/comments' />
      <Route path={`${ROUTES.retro}/*`} element={<Retro />} />
      <Route path={"/finished"} element={<FinishedSurvey />} />
    </Routes>
  );
};
