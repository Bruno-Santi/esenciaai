const { Router } = require("express");
const { checkUserToken } = require("../middleware/authMiddlewares");

const Users = require("./userRoutes");
const Auth = require("./authRoutes");
const Team = require("./teamRoutes");
const Analytics = require("./analyticsRoutes");
const Survey = require("./surveyRoutes");

const router = Router();

router.use("/users", Users);
router.use("/auth", Auth);
router.use("/team",  Team);
router.use("/analytics", Analytics);
router.use("/survey",  Survey);

module.exports = router;
