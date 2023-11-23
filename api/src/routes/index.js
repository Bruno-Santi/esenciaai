const { Router } = require('express');

const Users = require("./userRoutes");
const Auth = require("./authRoutes");


const router = Router();


router.use("/users", Users);
router.use("/auth", Auth);




module.exports = router;
