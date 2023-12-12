import { useDispatch, useSelector } from "react-redux";
import {
  onLoadingTeam,
  onSetUserTeams,
  onSetActiveTeam,
  onCreateTeam,
  onSetUser,
  onSetActiveTeamMembers,
  cleanActiveTeam,
  onSaveMetricsForToday,
} from "../store/dashboard/dashboardSlice";
import { UserTeams } from "../store/dashboard/interfaces";
import { useModal } from ".";
import { useEffect, useState } from "react";
import api from "../helpers/apiToken";
import { getTeamData } from "../helpers/getTeamData";

import { toastSuccess, toastWarning } from "../helpers";

export const useDashboard = () => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [loading, setLoading] = useState(true);
  const { user } = useSelector(({ auth }) => auth);
  const { userTeams, activeTeam, membersActiveTeam, metricsForToday, linesMetrics, dataAmount, isLoading } =
    useSelector(({ dashboard }) => dashboard);

  const startSettingUser = () => {
    dispatch(onSetUser(user));
  };

  const startSettingTeams = async () => {
    const { data } = await api.get(`/users`);
    const { team_list } = data;
    console.log(team_list);

    dispatch(onSetUserTeams({ userTeams: team_list }));
    setLoading(false);
  };

  const starGettingData = async (id) => {
    try {
      const surveyData = await getTeamData(id);
      console.log(surveyData);

      if (surveyData.error) {
        dispatch(
          onSaveMetricsForToday({
            metricsForToday: [],
            linesMetrics: [],
            dataAmount: [],
          })
        );
      } else {
        dispatch(
          onSaveMetricsForToday({
            metricsForToday: surveyData.pie_chart,
            linesMetrics: surveyData.lines_graph,
            dataAmount: surveyData.data_amounts,
          })
        );
      }
      const dataToSave = {
        metricsForToday: surveyData.pie_chart,
        linesMetrics: surveyData.lines_graph,
        dataAmount: surveyData.data_amounts,
      };
      localStorage.setItem("surveyData", JSON.stringify(dataToSave));
    } catch (error) {
      console.log(error);
    }
  };
  const startSettingActiveTeam = async (id: number) => {
    const dataToSave = {
      metricsForToday: [],
      linesMetrics: [],
      dataAmount: [],
    };
    localStorage.setItem("surveyData", JSON.stringify(dataToSave));
    dispatch(cleanActiveTeam());
    dispatch(onLoadingTeam());
    starGettingData(id);
    console.log(id);

    dispatch(
      onSetActiveTeam({
        id: id,
      })
    );
  };

  const startCreatingTeam = async (newTeam: UserTeams) => {
    const team = { team: newTeam };
    team.logo =
      newTeam.logo ||
      "https://res.cloudinary.com/di92lsbym/image/upload/c_thumb,w_200,g_face/v1701895638/team-logo_2_fq5yev.png";

    try {
      const resp = await api.post("/teams/", team);
    } catch (error) {
      console.log(error);
    }
    dispatch(
      onCreateTeam({
        newTeam,
      })
    );

    const updatedUserTeams = userTeams ? [...userTeams, newTeam] : [newTeam];

    localStorage.setItem("userTeams", JSON.stringify(updatedUserTeams));
    dispatch(
      onSetUserTeams({
        userTeams: updatedUserTeams,
      })
    );
    closeModal();
  };
  const startAddingMember = async (userData, teamId) => {
    console.log(userData, teamId);

    try {
      const formData = {
        team_id: teamId,
        user: {
          first_name: userData.first_name,
          last_name: userData.last_name || "",
          email: userData.email,
        },
      };

      const response = await api.post(`/teams/members/`, formData);
      startGettingMembers(teamId);
      console.log(formData);

      console.log(response.data);
    } catch (error) {
      console.error("Error adding member:", error);
    }
  };
  const startGettingMembers = async (id) => {
    try {
      const { data } = await api.get(`/teams/members/${id}`);
      console.log(data);

      dispatch(onSetActiveTeamMembers({ members: data.user_list }));
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const startCreatingSurvey = async (teamName: string, teamId) => {
    try {
      const users = await startGettingMembers(teamId);

      console.log(users);

      const response = await api.post(`/survey/newSurvey?teamId=${teamId}`, users);
      console.log(response);

      return toastSuccess(`Survey sended to the team: ${teamName}`);
    } catch (error) {
      toastWarning(`The team ${teamName} doesnt have any member`);
      console.log(error);
    }
  };

  return {
    startSettingActiveTeam,
    starGettingData,
    startGettingMembers,
    startCreatingTeam,
    userTeams,
    activeTeam,
    linesMetrics,
    dataAmount,
    user,
    isLoading,
    startSettingUser,
    startAddingMember,
    membersActiveTeam,
    startSettingTeams,
    loading,
    metricsForToday,
    startCreatingSurvey,
  };
};
