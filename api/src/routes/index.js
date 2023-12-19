const { Router } = require("express");
const { checkUserToken } = require("../middleware/authMiddlewares");

const Users = require("./userRoutes");
const Auth = require("./authRoutes");
const Team = require("./teamRoutes");
const Analytics = require("./analyticsRoutes");
const Survey = require("./surveyRoutes");
const Retro = require("./retroRoutes");
const { sendResponse, sendError } = require("../helpers/managerController");
const { long_recommendation_get } = require("../microServices/api_mongo");

const router = Router();

router.use("/auth", Auth);
router.use("/users", checkUserToken, Users);
router.use("/teams", checkUserToken, Team);
router.use("/analytics", Analytics);
router.use("/survey", Survey);
router.use("/retro", Retro);

router.get("/get_long_recommendation", async (req, res) => {
    try {
      const { team_id } = req.query;
      const result = await long_recommendation_get(team_id);
      sendResponse(res, 200, result);
    } catch (error) {
      sendError(res, error);
    }
  });


module.exports = router;
