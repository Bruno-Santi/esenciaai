//! no usar este archivo, queda de pruebas para los microservices de mongo.

const { daily_survey_post } = require(".");
const { DailySurvey } = require("./classes");

const randomService = async (
  dailySurvey = new DailySurvey(),
  param2 = "2309"
) => {
  //   const daily = new DailySurvey("123123", "124312", 1, 2, 8, 5, 2, "good team");
  const daily = new DailySurvey(dailySurvey);
  return await daily_survey_post(daily);

  //* etc. */
};
