import { useDispatch, useSelector } from "react-redux";

import { onSetUserTeams } from "../store/dashboard/dashboardSlice";
import { teams } from "../mocks";

export const useDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { userTeams } = useSelector((state) => state.dashboard);
  const startLoadingTeams = () => {
    console.log(user);
    console.log(teams[0].creatorId);

    const filteredUserTeams = teams.filter((team) => team.creatorId == user);
    console.log(userTeams);
    localStorage.setItem("userTeams", JSON.stringify(userTeams));

    dispatch(onSetUserTeams({ userTeams: filteredUserTeams }));
  };
  return {
    startLoadingTeams,
    userTeams,
  };
};
