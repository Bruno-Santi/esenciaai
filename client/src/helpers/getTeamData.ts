import api from "./apiToken";
import "axios" from "axios"
export const getTeamData = async (teamId: string) => {
  const response = await axios.get(`https://us-central1-esencia-app.cloudfunctions.net/dashboard_data?team_id=${teamId}`, {
      headers: {
        'Access-Control-Allow-Origin': 'https://esenciaai.vercel.app',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  console.log(response)
  return response.data;
};
