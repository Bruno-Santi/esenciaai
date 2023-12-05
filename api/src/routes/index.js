const { Router } = require("express");
const { checkUserToken } = require("../middleware/authMiddlewares");

const Users = require("./userRoutes");
const Auth = require("./authRoutes");
const Team = require("./teamRoutes");
const Analytics = require("./analyticsRoutes");
const Survey = require("./surveyRoutes");

const router = Router();

router.use("/users", checkUserToken, Users);
router.use("/auth", Auth);
router.use("/team", checkUserToken, Team);
router.use("/analytics", checkUserToken, Analytics);
router.use("/survey", checkUserToken, Survey);

module.exports = router;
