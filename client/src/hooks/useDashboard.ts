import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  onLoadingTeam,
  onSetUserTeams,
  onSetActiveTeam,
  onCreateTeam,
  onSetUser,
  onSetActiveTeamMembers,
  cleanActiveTeam,
} from "../store/dashboard/dashboardSlice";
import {
  Members,
  TeamMembers,
  teams,
} from "../mocks";
import { UserTeams } from "../store/dashboard/interfaces";
import { useEffect } from "react";
import { useModal } from ".";
import { teamLogo } from "../assets";

export const useDashboard =
  () => {
    const dispatch =
      useDispatch();
    const { user } =
      useSelector(
        (state) =>
          state.auth
      );
    const {
      userTeams,
      activeTeam,
      membersActiveTeam,
    } = useSelector(
      (state) =>
        state.dashboard
    );
    const {
      closeModal,
    } = useModal();
    const startSettingUser =
      () => {
        dispatch(
          onSetUser(
            user
          )
        );
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
      const localTeams =
        localStorage.getItem(
          "userTeams"
        );
      const filteredUserTeams =
        teams.filter(
          (team) =>
            team.creatorId ==
            user.id
        );

      if (
        localTeams
      ) {
        const parsedLocalTeams =
          JSON.parse(
            localTeams
          );

        const uniqueLocalTeams =
          parsedLocalTeams.filter(
            (
              localTeam
            ) =>
              !filteredUserTeams.some(
                (
                  filteredTeam
                ) =>
                  filteredTeam.id ===
                  localTeam.id
              )
          );

        const mergedTeams =
          [
            ...uniqueLocalTeams,
            ...filteredUserTeams,
          ];

        dispatch(
          onSetUserTeams(
            {
              userTeams:
                mergedTeams,
            }
          )
        );
      } else {
        dispatch(
          onSetUserTeams(
            {
              userTeams:
                filteredUserTeams,
            }
          )
        );
      }
      if (
        !localTeams
      ) {
        localStorage.setItem(
          "userTeams",
          JSON.stringify(
            filteredUserTeams
          )
        );
        dispatch(
          onSetUserTeams(
            {
              userTeams:
                filteredUserTeams,
            }
          )
        );
      }
    }, [user]);

    const startSettingActiveTeam =
      (
        id: number
      ) => {
        dispatch(
          cleanActiveTeam()
        );
        dispatch(
          onLoadingTeam()
        );

        dispatch(
          onSetActiveTeam(
            {
              id: id,
            }
          )
        );
      };

    const startCreatingTeam =
      (
        team: UserTeams
      ) => {
        const newTeam =
          {
            ...team,
            creatorId:
              user.id,
            id: Math.random(),
            logo:
              team.logo ||
              teamLogo,
          };
        dispatch(
          onCreateTeam(
            {
              newTeam,
            }
          )
        );

        const updatedUserTeams =
          userTeams
            ? [
                ...userTeams,
                newTeam,
              ]
            : [
                newTeam,
              ];
        console.log(
          updatedUserTeams
        );

        localStorage.setItem(
          "userTeams",
          JSON.stringify(
            updatedUserTeams
          )
        );
        dispatch(
          onSetUserTeams(
            {
              userTeams:
                updatedUserTeams,
            }
          )
        );
        closeModal();
      };

    const startSettingActiveMembers =
      (id) => {
        console.log(
          id
        );

        const membersById: Members[] =
          TeamMembers.filter(
            (
              member
            ) =>
              member.teamId ===
              id
          );
        dispatch(
          onSetActiveTeamMembers(
            {
              members:
                membersById,
            }
          )
        );
        console.log(
          membersById
        );
      };
    return {
      startSettingActiveTeam,
      startCreatingTeam,
      userTeams,
      activeTeam,
      user,
      startSettingUser,
      startSettingActiveMembers,
      membersActiveTeam,
    };
  };
