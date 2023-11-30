const { Router } = require("express");
const router = Router();
const { checkUserToken } = require("../middleware/authMiddlewares");
const {
  usersGet,
  userById,
  userByEmail,
  updatePasswordPut,
  deletedUser,
  updateUser,
  userScrumGet
} = require("../controllers/userControllers");
const { checkEmail, checkPhone, checkNickname } = require("../middleware/validate/routes/authValidate");


router.get("/", usersGet);
router.get("/scrum/:id", userScrumGet)
router.put("/update_password",  updatePasswordPut);
router.get("/id/:id", userById);
router.get("/email/:email", userByEmail);
router.delete("/id/:id", deletedUser)
router.put("/", updateUser)

router.post("/check_email", 
// checkUserEmail
);
router.post("/check_phone", 
// checkUserPhone
);

router.post("/check_email", checkEmail);
router.post("/check_phone", checkPhone);
router.post("/check_nickname", checkNickname);


module.exports = router;
