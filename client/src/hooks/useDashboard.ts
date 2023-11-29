import { useDispatch, useSelector } from "react-redux";

import {
  onLoadingTeam,
  onSetUserTeams,
  onSetActiveTeam,
  onCreateTeam,
  onSetUser,
} from "../store/dashboard/dashboardSlice";
import { teams } from "../mocks";
import { UserTeams } from "../store/dashboard/interfaces";
import { useEffect } from "react";

export const useDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { userTeams, activeTeam } = useSelector((state) => state.dashboard);

  const startSettingUser = () => {
    dispatch(onSetUser(user));
  };
  // const startLoadingTeams = () => {
  //   const localTeams = localStorage.getItem("userTeams");
  //   if (localTeams) {
  //     dispatch(onSetUserTeams({ userTeams: localTeams }));
  //   } else {
  //     const filteredUserTeams = teams.filter((team) => team.creatorId == user.id);
  //     dispatch(onSetUserTeams({ userTeams: filteredUserTeams }));
  //   }
  // };
  useEffect(() => {
    const localTeams = localStorage.getItem("userTeams");
    const filteredUserTeams = teams.filter((team) => team.creatorId == user.id);

    if (localTeams) {
      const parsedLocalTeams = JSON.parse(localTeams);

      const uniqueLocalTeams = parsedLocalTeams.filter(
        (localTeam) => !filteredUserTeams.some((filteredTeam) => filteredTeam.id === localTeam.id)
      );

      const mergedTeams = [...uniqueLocalTeams, ...filteredUserTeams];

      dispatch(onSetUserTeams({ userTeams: mergedTeams }));
    } else {
      dispatch(onSetUserTeams({ userTeams: filteredUserTeams }));
    }
    if (!localTeams) {
      localStorage.setItem("userTeams", JSON.stringify(filteredUserTeams));
      dispatch(onSetUserTeams({ userTeams: filteredUserTeams }));
    }
  }, [user]);

  const startSettingActiveTeam = (id: number) => {
    dispatch(onLoadingTeam());
    setTimeout(() => {
      dispatch(onSetActiveTeam({ id: id }));
    }, 1000);
  };

  const startCreatingTeam = (team: UserTeams) => {
    const newTeam = {
      ...team,
      creatorId: user.id,
      id: Math.random(),
    };
    dispatch(onCreateTeam({ newTeam }));

    const updatedUserTeams = userTeams ? [...userTeams, newTeam] : [newTeam];
    console.log(updatedUserTeams);

    localStorage.setItem("userTeams", JSON.stringify(updatedUserTeams));
    dispatch(onSetUserTeams({ userTeams: updatedUserTeams }));
  };
  return {
    startSettingActiveTeam,
    startCreatingTeam,
    userTeams,
    activeTeam,
    user,
    startSettingUser,
  };
};
