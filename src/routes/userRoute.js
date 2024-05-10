const express = require("express");
const app = express.Router();
const controller = require("../controller/userController");
const { check } = require("express-validator");

app.post(
  "/register",

  [
    check("userName").not().isEmpty(),
    check("email").not().isEmpty(),
    check("password").isLength({ min: 4 }),
  ],

  controller.registrieren
);
app.post("/login", controller.anmelden);

app.post("/check", controller.tokenCheck);

app.get("/logout", controller.logout);

module.exports = app;
