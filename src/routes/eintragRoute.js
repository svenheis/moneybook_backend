const dotenv = require("dotenv");
const express = require("express");
const router = express.Router();
const controller = require("../controller/eintragController");
const { verifyToken } = require("../controller/verifyToken");

dotenv.config();

// Alle Einträge ausgeben
router.get("/", controller.alleEintraege);

// Einträge nach ID ausgeben
router.get("/:id", controller.idEintrag);

// Eintrag hinzufügen
router.post("/", verifyToken, controller.eintragHinzufügen);

// Eintrag löschen
router.delete("/:id", controller.eintragLoeschen);

module.exports = router;
