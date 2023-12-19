const { Router } = require("express");
const router = Router();
const { checkUserToken } = require("../middleware/authMiddlewares");
const { retroPost, getData } = require("../controllers/analyticsControllers");
const { sendResponse, sendError } = require("../helpers/managerController");
const { long_recommendation_get } = require("../microServices/api_mongo");

router.post("/retro", checkUserToken, retroPost);

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

// router.get("/get_long_recommendation", async (req, res) => {
//   try {
//     const { team_id } = req.query;
//     console.log("sdasdasd")
//     const result = await long_recommendation_get(team_id);
//     sendResponse(res, 200, result);
//   } catch (error) {
//     sendError(res, error);
//   }
// });

module.exports = router;
