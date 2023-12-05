const { Router } = require("express");
const router = Router();
const {
  teamPost,
  teamMembersGet,
  userInvitedPost,
  teamByScrumGet
} = require("../controllers/teamControllers");
const express = require("express");

//* it's used:

//? params:{teamId};
router.get("/:id", teamByScrumGet);
//! return: {team, members:[users]};

//? body:{team};
router.post("/", teamPost);
//! return: {team};

//? body:{teamId,user};
router.post("/members", userInvitedPost);

//? body:{teamId,user};
router.patch("/members", userInvitedPost); 

//? body:{teamId,userId};
router.delete("/members", userInvitedPost);

//? params:{teamId};
router.get("/members/:id", teamMembersGet);
//! return: {members:[users]};

//? not sure: nothings some here.

module.exports = router;
