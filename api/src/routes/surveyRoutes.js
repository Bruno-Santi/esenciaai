const { Router } = require("express");
const router = Router();
const { checkUserToken } = require("../middleware/authMiddlewares");
const { dailySurveyPost } = require("../controllers/surveyController");

// //? body:{teamId,sprint,answers:[r1:2,r2:10]};
// router.post("/retro", checkUserToken, () => {});
// //! return ok;

// //? body:{teamId};
router.post("/daily_survey", checkUserToken, dailySurveyPost);
// //! return ok;

module.exports = router;
