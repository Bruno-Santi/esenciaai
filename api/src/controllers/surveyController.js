const getDailySurveyData = require("../services/surveyServices");

const controller = {};

controller.getData = async (req, res) => {
  try {
    const { teamId } = req.params;
    const data = await getDailySurveyData(teamId);
    res.json(data);
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = controller;
