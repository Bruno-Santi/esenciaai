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
import { toast } from "react-toastify";

export const useDashboard = () => {
  const [surveyLoading, setSurveyLoading] = useState(false);
  const [creatingLoading, setCreatingLoading] = useState(false);
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
    try {
      const { data } = await api.get(`/users`);
      const { team_list } = data;
      console.log(team_list);

      dispatch(onSetUserTeams({ userTeams: team_list }));
      localStorage.setItem("userTeams", JSON.stringify(team_list));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const starGettingData = async (id: string) => {
    try {
      const surveyData = await getTeamData(id);
      console.log(surveyData.data);

      if (surveyData.error) {
        dispatch(
          onSaveMetricsForToday({
            metricsForToday: {},
            linesMetrics: {},
            dataAmount: [],
          })
        );
      } else {
        dispatch(
          onSaveMetricsForToday({
            metricsForToday: surveyData.data.pie_chart || {}, // Verificar si existe y es un array
            linesMetrics: surveyData.data.lines_graph || {}, // Verificar si existe y es un array
            dataAmount: surveyData.data.data_amounts || [], // Verificar si existe y es un array
          })
        );
      }

      const dataToSave = {
        metricsForToday: surveyData.data.pie_chart || {}, // Verificar si existe y es un array
        linesMetrics: surveyData.data.lines_graph || {}, // Verificar si existe y es un array
        dataAmount: surveyData.data.data_amounts || [], // Verificar si existe y es un array
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
    //@ts-expect-error 'efefe'
    starGettingData(id);
    console.log(id);

    dispatch(
      onSetActiveTeam({
        id: id,
      })
    );
  };

  const startCreatingTeam = async (newTeam: UserTeams) => {
    newTeam.logo =
      newTeam.logo ||
      "https://res.cloudinary.com/di92lsbym/image/upload/c_thumb,w_200,g_face/v1701895638/team-logo_2_fq5yev.png";
    const team = { team: newTeam };

    try {
      const resp = await api.post("/teams/", team);
      const createdTeam = resp.data; // Obtener información del nuevo equipo desde la respuesta

      // Actualizar el estado después de que la solicitud API se complete
      dispatch(onCreateTeam(createdTeam.team));

      const updatedUserTeams = userTeams ? [...userTeams, createdTeam.team] : [createdTeam.team];

      localStorage.setItem("userTeams", JSON.stringify(updatedUserTeams));
      dispatch(onSetUserTeams({ userTeams: updatedUserTeams }));
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };
  const startAddingMember = async (userData, teamId) => {
    console.log(userData, teamId);
    setCreatingLoading(true);
    try {
      const formData = {
        team_id: teamId,
        user: {
          first_name: userData.first_name,
          last_name: userData.last_name || "",
          email: userData.email,
        },
      };
      toast.success(`${formData.user.first_name} added to the team `, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      const response = await api.post(`/teams/members/`, formData);
      startGettingMembers(teamId);
      setCreatingLoading(false);
    } catch (error) {
      toastWarning("Error while creating members");
      console.error("Error adding member:", error);
      setCreatingLoading(false);
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

  const startCreatingSurvey = async (teamName: string, teamId: string) => {
    setSurveyLoading(true);
    try {
      const users = await startGettingMembers(teamId);

      console.log(users);
      if (users.length === 0) {
        toastWarning(`The team ${teamName} doesnt have any member`);
      } else {
        const response = await api.post(`/survey/send_all_members/${teamId}`);
        console.log(response);
        setSurveyLoading(false);
        return toastSuccess(`Survey sended to the team: ${teamName}`);
      }
    } catch (error) {
      toastWarning(`${error.message}`);
      setSurveyLoading(false);
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
    surveyLoading,
    creatingLoading,
  };
};
