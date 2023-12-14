import api from "./apiToken";

export const getTeamData = async (teamId: string) => {
  const response = await api.get(`/auth/${teamId}`);
  return response.data;
};
