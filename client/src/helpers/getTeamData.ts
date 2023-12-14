import api from "./apiToken";

export const getTeamData = async (teamId: string) => {
  const response = await api.get(`https://us-central1-esencia-app.cloudfunctions.net/dashboard_data?team_id=${teamId}`);
  console.log(response)
  return response.data;
};
