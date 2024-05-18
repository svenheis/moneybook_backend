const dotenv = require("dotenv");
const express = require("express");
const app = express.Router();
const controller = require("../controller/eintragController");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");

dotenv.config();
app.use(cookie());

const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  console.log("cookie aus token", token);
  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log("verifizierte Daten", data);
    req.auth = data;
    next();
  } catch (error) {
    console.error("token verifizierung fehlgeschlagen", error);
    res.sendStatus(403);
  }
};

// Route zum anschauen ob verify funktioniert
app.get("/protected", verifyToken, (req, res) => {
  res.send(`Hello ${req.auth.userName}, you are authenticated!`);
});

// Alle Einträge ausgeben
app.get("/", controller.alleEintraege);

// Einträge nach ID ausgeben
app.get("/:id", controller.idEintrag);

// Eintrag hinzufügen
app.post("/", verifyToken, controller.eintragHinzufügen);

// Eintrag löschen
app.delete("/:id", controller.eintragLoeschen);

module.exports = app;
