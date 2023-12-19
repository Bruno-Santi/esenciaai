const { Router } = require("express");
const router = Router();
const {
  teamPost,
  teamMembersGet,
  userInvitedPost,
  teamByScrumGet,
  removeUserFromTeam,
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
//$T1 obtener los miembros de un team.
//! return: {members:[users]};

//? body:{teamId,user};
router.post("/members", userInvitedPost);

//? body:{teamId,user};
router.patch("/members", () => {
  //$T1 editar un miembro en el team y devolver el usuario creado.
});

//? body:{teamId,userId};
router.delete("/members", removeUserFromTeam);

//? not sure: nothings some here.

module.exports = router;
