const express = require("express");
const router = express.Router();
const controller = require("../controller/userController");
const { check } = require("express-validator");

router.post("/register", controller.registrieren);
router.post("/login", controller.anmelden);
router.get("/user", controller.userAusgeben);
router.get("/logout", controller.logout);

module.exports = router;
