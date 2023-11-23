const { Router } = require("express");
const router = Router();
const { checkUserToken } = require("../middleware/authMiddlewares");
const {
  usersGet,
  userById,
  userByEmail,
  updatePasswordPut,
  deletedUser,
  updateUser
} = require("../controllers/userControllers");
const { checkEmail, checkPhone, checkNickname } = require("../middleware/validate/routes/authValidate");


router.get("/", usersGet);
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



// PUT => PONER ID => podes cambiar nombre, apellido, ciudad, estado(provincia), genero y pais //  

// //% Query's: {tag_name, price_value, price_comparison, current_page, per_page}

module.exports = router;
