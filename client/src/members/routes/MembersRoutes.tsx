import { Route, Routes } from "react-router-dom";
import { AdditionalComments, Retro, Survey } from "../pages";
import ROUTES from "../../constants/routes";

export const MembersRoutes = () => {
  return (
    <Routes>
      <Route element={<Survey />} path='/survey' />
      <Route element={<AdditionalComments />} path='/comments' />
      <Route path={`${ROUTES.retro}/*`} element={<Retro />} />
    </Routes>
  );
};
