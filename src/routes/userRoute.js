const express = require("express");
const router = express.Router();
const controller = require("../controller/userController");
const { check } = require("express-validator");
const { verifyToken } = require("../controller/verifyToken");

router.post(
  "/register",

  [
    check("userName").not().isEmpty(),
    check("email").not().isEmpty(),
    check("password").isLength({ min: 4 }),
  ],

  controller.registrieren
);
router.post("/login", controller.anmelden);

// Route zum anschauen ob verify funktioniert

router.get("/protected", verifyToken, (req, res) => {
  res.send(`Hello ${req.auth.userName}, you are authenticated!`);
});

router.get("/logout", controller.logout);

module.exports = router;
