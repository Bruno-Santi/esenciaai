const { Router } = require("express");
const { checkUserToken } = require("../middleware/authMiddlewares");

const Users = require("./userRoutes");
const Auth = require("./authRoutes");
const Team = require("./teamRoutes");
const Analytics = require("./analyticsRoutes");
const Survey = require("./surveyRoutes");
const Retro = require("./retroRoutes");

const router = Router();

router.use("/auth", Auth);
router.use("/users", checkUserToken, Users);
router.use("/teams", checkUserToken, Team);
router.use("/analytics", checkUserToken, Analytics);
router.use("/survey", Survey);
router.use("/retro", Retro);


module.exports = router;
