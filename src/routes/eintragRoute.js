import dotenv from "dotenv";
import express from"express";
import router from express.Router();
import controller from "../controller/eintragController";
import { verifyToken } from "../controller/verifyToken";

dotenv.config();

// Route zum anschauen ob verify funktioniert

router.get("/protected", verifyToken, (req, res) => {
  res.send(`Hello ${req.auth.userName}, you are authenticated!`);
});

// Alle Einträge ausgeben
router.get("/", controller.alleEintraege);

// Einträge nach ID ausgeben
router.get("/:id", controller.idEintrag);

// Eintrag hinzufügen
router.post("/", verifyToken, controller.eintragHinzufügen);

// Eintrag löschen
router.delete("/:id", controller.eintragLoeschen);

module.exports = router;
