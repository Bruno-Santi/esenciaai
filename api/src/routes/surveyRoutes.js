const { Router } = require("express");
const router = Router();
const { checkUserToken } = require("../middleware/authMiddlewares");
const {
  dailySurveyPost,
  sendAllMembersPost,
  surveyGet,
} = require("../controllers/surveyController");

// router.post("/retro", checkUserToken, () => {});

router.get("/daily_survey", checkUserToken, surveyGet);

router.post("/daily_survey", checkUserToken, dailySurveyPost);

router.post("/send_all_members/:team_id", checkUserToken, sendAllMembersPost);

// * token u team_id

module.exports = router;
