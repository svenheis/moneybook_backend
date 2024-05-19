const dotenv = require("dotenv");
const express = require("express");
const router = express.Router();
const controller = require("../controller/eintragController");
const jwt = require("jsonwebtoken");

dotenv.config();

const verifyToken = async (req, res, next) => {
  console.log(req.cookies.token);
  const token = req.cookies.token;
  console.log("cookie aus token", token);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
    if (err) return res.sendStatus(403);

    req.auth = data;
  });

  next();
};

// Alle Einträge ausgeben
router.get("/", controller.alleEintraege);

// Einträge nach ID ausgeben
router.get("/:id", controller.idEintrag);

// Eintrag hinzufügen
router.post("/", verifyToken, controller.eintragHinzufügen);

// Eintrag löschen
router.delete("/:id", controller.eintragLoeschen);

module.exports = router;
