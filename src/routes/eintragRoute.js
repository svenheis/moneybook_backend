// Paket Aufrufe
const dotenv = require("dotenv");
const express = require("express");
const router = express.Router();
const controller = require("../controller/eintragController");
const jwt = require("jsonwebtoken");

// Lesen der geheimen Informationen
dotenv.config();

// Token wird mit Secret aus der .env Datei kontrolliert
const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  jwt.verify(token, process.env.TOKEN_SECRET, (error, data) => {
    if (error) return res.sendStatus(403);
    req.auth = data;
  });
  next();
};

//Routen Endpunkte Einträge

// Alle Einträge ausgeben
router.get("/", controller.alleEintraege);

// Eintrag hinzufügen
router.post("/", verifyToken, controller.eintragHinzufügen);

// Eintrag löschen
router.delete("/:id", controller.eintragLoeschen);

// Export
module.exports = router;
