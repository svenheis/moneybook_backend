const dotenv = require("dotenv");
const express = require("express");
const app = express.Router();
const controller = require("../controller/eintragController");
const jwt = require("jsonwebtoken");

dotenv.config();

const verifyToken = async (req, res, next) => {
  console.log(req.cookies.token);

  const token = req.cookies.token;

  jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
    if (err) return res.sendStatus(403);

    req.auth = data;
  });

  next();
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
