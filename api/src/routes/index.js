const { Router } = require('express');

const Users = require("./userRoutes");
const Auth = require("./authRoutes");
const Team = require("./teamRoutes")


const router = Router();


router.use("/users", Users);
router.use("/auth", Auth);
router.use("/team", Team);



module.exports = router;
