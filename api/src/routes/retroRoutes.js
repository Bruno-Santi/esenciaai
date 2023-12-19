const fs = require("fs");
const path = require("path");
const { Router } = require("express");
const { sendResponse, sendError } = require("../helpers/managerController");
const { sendRetro } = require("../microServices/email/nodeMailer");
const { sendRequestOfRetro } = require("../services/retroServices");
const router = Router();

// router.post("/retro", checkUserToken, () => {});

router.get("/sdsdsd", async (req, res) => {
  try {
    const filePath = path.join(
      path.resolve(__dirname, ".."),
      "public",
      "retro_test.html"
    );
    await new Promise((resolve, reject) => {
      fs.readFile(filePath, "utf8", (err, html) => {
        if (err) reject(err);
        else resolve(html);
      });
    }).then((html) => {
      sendResponse(res, 200, html, "view");
    });
  } catch (error) {
    sendError(res, error);
  }
});

router.post("/:teamId", async (req, res) => {
  try {
    const { teamId } = req.params;
    console.log(teamId);
    const result = await sendRequestOfRetro(teamId);
    sendResponse(res, 200, result);
  } catch (error) {
    console.log(error);
    sendError(res, error);
  }
});

module.exports = router;
