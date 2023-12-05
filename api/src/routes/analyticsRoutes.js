const { Router } = require("express");
const router = Router();
const controllers = require("../controllers/authControllers");
const { checkUserToken } = require("../middleware/authMiddlewares");

//? params:{teamId};
router.get("/:id", checkUserToken, () => {});

module.exports = router;
