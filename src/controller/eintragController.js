const uuid = require("uuidv4");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Eintrag = require("../models/Eintrag");
const mongoDB = require("../utils/mongoDB");
const HttpError = require("../models/HttpError");

dotenv.config();

// Datumsformat einstellen
function datumsFormat(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

// alle Einträge ausgeben
const alleEintraege = async (req, res, next) => {
  const eintragAll = req.params;
  let eintrag;
  try {
    eintrag = await Eintrag.find(eintragAll);
    eintrag.sort((a, b) => new Date(b.datum) - new Date(a.datum));

    eintrag = eintrag.map((e) => ({
      ...e.toObject(),
      datum: datumsFormat(e.datum),
    }));
  } catch (err) {
    const error = new HttpError("Keine Ausgabe möglich", 404);
    return next(error);
  }
  res.json({ eintrag });
};

// id Eintrag ausgeben
const idEintrag = async (req, res, next) => {
  const eintragId = req.params.id;
  let eintrag;
  try {
    eintrag = await Eintrag.findById(eintragId);
  } catch (err) {
    const error = new HttpError("Keine Ausgabe nach ID möglich", 404);
    return next(error);
  }
  res.json({ eintrag });
};

// Eintrag hinzufügen
const eintragHinzufügen = async (req, res, next) => {
  const { typ, titel, betrag, datum } = req.body;

  const hinzugefügterEintrag = new Eintrag({
    typ,
    titel,
    betrag,
    datum,
  });
  try {
    await hinzugefügterEintrag.save();
  } catch (err) {
    const error = new HttpError("Eintrag hinzufügen fehlgeschlagen", 500);
    return next(error);
  }

  res.status(201).json({ message: hinzugefügterEintrag });
};

// Eintrag löschen
const eintragLoeschen = async (req, res, next) => {
  const eintragsId = req.params.id;
  let eintrag;
  try {
    eintrag = await Eintrag.findByIdAndDelete(eintragsId);
  } catch (err) {
    const error = new HttpError("Keine Ausgabe nach ID möglich", 500);
    return next(error);
  }
  res.status(200).json({ message: "Eintrag gelöscht" });
};

exports.alleEintraege = alleEintraege;
exports.idEintrag = idEintrag;
exports.eintragHinzufügen = eintragHinzufügen;
exports.eintragLoeschen = eintragLoeschen;
