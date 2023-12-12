const { Router } = require("express");
const router = Router();
const controllers = require("../controllers/authControllers");
const { checkUserToken } = require("../middleware/authMiddlewares");
const { getData } = require("../controllers/analyticsControllers");

//? params:{teamId};
router.get("/:team_id", checkUserToken, async (req, res) => {
  try {
    const { team_id } = req.params;
    const response = await getData(req, res, team_id);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});
module.exports = router;
