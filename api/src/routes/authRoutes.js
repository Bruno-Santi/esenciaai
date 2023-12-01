const { Router } = require("express");
const router = Router();
const controllers = require("../controllers/authControllers");
const {
  checkUserToken,
  viewPassword,
  checkUserValid,
} = require("../middleware/authMiddlewares");
const { sendResponse, sendError } = require("../helpers/managerController");
const {
  checkEmail,
  checkPhone,
  checkNickname,
} = require("../middleware/validate/routes/authValidate");
const { policyUseGet } = require("../controllers/authControllers")

router.post(
  "/register",
  checkUserValid,
  controllers.registerPost
);
router.post("/login", controllers.loginPost);
router.get("/view/:email", controllers.viewPassword);
router.get("/token", controllers.viewToken)
router.post("/logout", checkUserToken, controllers.logoutPost);

router.get("/test_token", checkUserToken, async (req, res) => {
  try {
    req.user_id_logged;
    sendResponse(res, 200, "Accediste con tu Token.");
  } catch (error) {
    sendError(res, error);
  }
});

router.get("/policy_use", policyUseGet)


module.exports = router;

//$ Registro de Usuario || POST

//% FUNC: Registrar un nuevo usuario en la base de datos.
//% RTA: { "message": "Usuario registrado exitosamente" }.

//$ Inicio de Sesión || POST

//% FUNC: Autenticar al usuario y generar un token JWT.
//% RTA: { "token": "Token_JWT" }.

//$ Cierre de Sesión (opcional) || POST

//% FUNC: Cerrar la sesión del usuario (puede ser opcional en una API).
//% RTA: { "message": "Sesión cerrada" }

//$ Obtener Perfil de Usuario (protegido por autenticación) || GET

//% FUNC: Obtener los datos del perfil del usuario autenticado.
//% RTA (Éxito): { "user": { "id": 1, "nombre": "Ejemplo" } }
