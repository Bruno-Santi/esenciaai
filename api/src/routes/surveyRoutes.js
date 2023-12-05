const { Router } = require("express");
const router = Router();
const { checkUserToken } = require("../middleware/authMiddlewares");

// //? body:{teamId,sprint,answers:[r1:2,r2:10]};
// router.post("/retro", checkUserToken, () => {});
// //! return ok;

// //? body:{teamId};
// router.post("/daily", checkUserToken, () => {});
// //! return ok;

module.exports = router;
