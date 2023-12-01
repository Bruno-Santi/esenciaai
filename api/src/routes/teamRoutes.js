const { Router } = require("express");
const router = Router();
const { teamPost, teamMembersGet } = require("../controllers/teamControllers")
const express = require('express');

//router.use(express.json())

router.post("/", teamPost)
router.get("/members/:id", teamMembersGet)

module.exports = router