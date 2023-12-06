const { Router } = require("express");
const router = Router();
const controllers = require("../controllers/authControllers");
const {
  checkUserToken,
  checkUserValid,
} = require("../middleware/authMiddlewares");
const { sendResponse, sendError } = require("../helpers/managerController");
const { sendExternalEmail } = require("../microServices/email/nodeMailer");

//* it's used:
router.post("/register", controllers.registerPost);
//!return msg;

//* body: {user}
router.post("/login", controllers.loginPost);
//!return msg;

router.post("/logout", checkUserToken, controllers.logoutPost);
//!return msg;

//!envio de link para usuarios anoninos:

// 1 agregar un miembro en la ruta post.

// 2 crear un link con los parametros necesarios:
// ej:
// http://localhost:3000/survey?token=02i302i3012i3lñiswkdqawspd
// &team_id=028310283102830128&user_id=woeijfoweuir23o23o4

// 3 enviar ese link por mail.

//? not sure:

router.get("/view/:email", controllers.viewPassword);
router.get("/token", controllers.viewToken);

router.get("/test_token", checkUserToken, async (req, res) => {
  try {
    // req.user_id_token;
    sendExternalEmail(
      "facu995electro@hotmail.com",
      "Complete the surveys of the day.",
      {
        token: "MY_TOKEN",
        team_id: "TEAM_ID",
        user_id: "USER_ID",
      }
    );
    sendResponse(res, 200, "Accediste con tu Token.");
  } catch (error) {
    sendError(res, error);
  }
});

//Falta:
//ruta password.

module.exports = router;
