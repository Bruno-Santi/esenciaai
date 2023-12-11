const { User, Team } = require("../app/db");
const { UserTeam } = require("../app/dbRelations");

const surveyService = {};

surveyService.getDailySurveyData = async (teamId) => {
  console.log(teamId);
  try {
    const response = await fetch(`https://us-central1-esencia-app.cloudfunctions.net/dashboard_data?team_id=${teamId}`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    throw error;
  }
};

module.exports = surveyService.getDailySurveyData;
