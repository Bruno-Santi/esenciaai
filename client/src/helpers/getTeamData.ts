import api from "./apiToken";

export const getTeamData = async (teamId: string) => {
  const response = await api.get(`/survey/daily-survey-data/${teamId}`);
  return response.data;
};
