const { Router } = require("express");
const router = Router();

const { checkUserToken } = require("../middleware/authMiddlewares");
const controller = require("../controllers/surveyController");

// //? body:{teamId,sprint,answers:[r1:2,r2:10]};
// router.post("/retro", checkUserToken, () => {});
// //! return ok;

// //? body:{teamId};
// router.post("/daily", checkUserToken, () => {});
// //! return ok;
router.get("/daily-survey-data/:teamId", checkUserToken, controller.getData);
module.exports = router;
