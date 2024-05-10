// .env Datei konfigurieren

const dotenv = require("dotenv");
dotenv.config();

// Datenbankanbindung

const mongoose = require("mongoose");

// Verbindung MongoDB

const mongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB verbunden");
  } catch (error) {
    console.error("Fehler beim Verbinden mit MongoDB:", error);
  }
};

exports.mongoDB = mongoDB;
