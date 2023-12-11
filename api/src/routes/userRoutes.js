const { Router } = require("express");
const router = Router();
const {
  usersGet,
  userById,
  userByEmail,
  updatePasswordPut,
  deletedUser,
  updateUser,
  userScrumGet,
} = require("../controllers/userControllers");
const { checkEmail, checkPhone, checkNickname } = require("../middleware/validate/routes/authValidate");
const { checkUserToken } = require("../middleware/authMiddlewares");

//* it's used:

//* params: {id}
router.get("/", usersGet);
//! return {user,teamsJoined:["teamId1","teamId2"]}

//? not sure:

// router.get("/scrum/:id", userScrumGet);
// router.put("/update_password", updatePasswordPut);
// router.get("/id/:id", userById);
// router.get("/email/:email", userByEmail);
// router.delete("/id/:id", deletedUser);
// router.put("/", updateUser);
// router.post("/check_email", checkEmail);
// router.post("/check_phone", checkPhone);
// router.post("/check_nickname", checkNickname);

module.exports = router;
