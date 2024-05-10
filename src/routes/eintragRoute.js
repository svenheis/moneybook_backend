const express = require("express");
const app = express.Router();
const controller = require("../controller/eintragController");

// Alle Einträge ausgeben
app.get("/", controller.alleEintraege);

// Einträge nach ID ausgeben
app.get("/:id", controller.idEintrag);

// Eintrag hinzufügen
app.post("/", controller.eintragHinzufügen);

// Eintrag löschen
app.delete("/:id", controller.eintragLoeschen);

module.exports = app;
