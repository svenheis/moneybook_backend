// Paket Aufruf
const dotenv = require("dotenv");
// Schema Aufruf
const Eintrag = require("../models/Eintrag");

dotenv.config();

// alle Einträge ausgeben
const alleEintraege = async (req, res, next) => {
  let eintrag;
  try {
    eintrag = await Eintrag.find().populate("user");
    eintrag.sort((a, b) => new Date(b.datum) - new Date(a.datum));
  } catch (error) {
    console.error("Keine Ausgabe möglich", 404);
    return next();
  }
  res.json({ eintrag });
};

// Eintrag hinzufügen
const eintragHinzufügen = async (req, res, next) => {
  const { typ, titel, betrag, datum } = req.body;
  const hinzugefügterEintrag = new Eintrag({
    user: req.auth.userId,
    typ,
    titel,
    betrag,
    datum,
  });
  try {
    await hinzugefügterEintrag.save();
  } catch (error) {
    console.error("Eintrag hinzufügen fehlgeschlagen", 500);
    return next();
  }
  res.status(201).json({ message: hinzugefügterEintrag });
};

// Eintrag löschen
const eintragLoeschen = async (req, res, next) => {
  const eintragsId = req.params.id;
  let eintrag;
  try {
    eintrag = await Eintrag.findByIdAndDelete(eintragsId);
  } catch (error) {
    console.error("Keine Ausgabe nach ID möglich", 500);
    return next();
  }
  res.status(200).json({ message: "Eintrag gelöscht" });
};

exports.alleEintraege = alleEintraege;
exports.eintragHinzufügen = eintragHinzufügen;
exports.eintragLoeschen = eintragLoeschen;
