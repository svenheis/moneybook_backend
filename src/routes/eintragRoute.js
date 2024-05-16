const dotenv = require("dotenv");
const express = require("express");
const app = express.Router();
const controller = require("../controller/eintragController");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

dotenv.config();
app.use(cookieParser);

const verifyToken = async (req, res, next) => {
  console.log(req.cookies.token);
  const token = req.cookies.token;
  try {
    const data = await jwt.verify(token, process.env.TOKEN_SECRET);
    req.auth = data;
    next();
  } catch (error) {
    res.sendStatus(403);
  }
};

// Alle Einträge ausgeben
app.get("/", controller.alleEintraege);

// Einträge nach ID ausgeben
app.get("/:id", controller.idEintrag);

// Eintrag hinzufügen
app.post("/", verifyToken, controller.eintragHinzufügen);

// Eintrag löschen
app.delete("/:id", controller.eintragLoeschen);

module.exports = app;
