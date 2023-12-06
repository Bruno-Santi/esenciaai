const { Router } = require("express");
const router = Router();
const {
  teamPost,
  teamMembersGet,
  userInvitedPost,
  teamByScrumGet,
} = require("../controllers/teamControllers");
const express = require("express");

//* it's used:

//? params:{teamId};
router.get("/:id", teamByScrumGet);
//! return: {team, members:[users]};

//? body:{team};
router.post("/", teamPost);
//! return: {team};

//? params:{teamId};
router.get("/members/:id", teamMembersGet);
//! return: {members:[users]};

//? body:{teamId,user};
router.post("/members", () => {
  //$T1 crear un miembro en el team y devolver el usuario creado.
});

//? body:{teamId,user};
router.patch("/members", () => {
  //$T1 editar un miembro en el team y devolver el usuario creado.
});

//? body:{teamId,userId};
router.delete("/members", () => {
  //$T1 eliminar un usuario y devolver un msg satifactorio.
});

//? not sure: nothings some here.

module.exports = router;
