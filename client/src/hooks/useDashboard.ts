import { useDispatch, useSelector } from "react-redux";

import { onSetUserTeams } from "../store/dashboard/dashboardSlice";
import { teams } from "../mocks";

export const useDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const startLoadingTeams = () => {
    console.log(user);
    console.log(teams[0].creatorId);

    const userTeams = teams.filter((team) => team.creatorId == user);
    console.log(userTeams);

    dispatch(onSetUserTeams(userTeams));
  };
  return {
    startLoadingTeams,
  };
};
