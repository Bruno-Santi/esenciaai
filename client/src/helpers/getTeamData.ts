import api from "./apiToken";
import "axios" from "axios"
export const getTeamData = async (teamId: string) => {
  const response = await axios.get(`https://us-central1-esencia-app.cloudfunctions.net/dashboard_data?team_id=${teamId}`);
  console.log(response)
  return response.data;
};
