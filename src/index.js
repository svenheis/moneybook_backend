// Paket Aufrufe
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// Lesen der geheimen Informationen
dotenv.config();

// Express erstellen
const app = express();
const port = process.env.PORT;
app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: "https://moneybook.heis-design.ch", // Render Einstellung
    //origin: "http://localhost:5173", // Lokale Einstellung
    credentials: true,
  })
);

// Datenbank, Port und Startmeldung
mongoose
  .connect(process.env.MONGO)
  .then(
    app.listen(port, () => {
      console.log(`Der Server Startet unter dem Port ${port}`);
    })
  )
  .catch((error) => {
    console.error("Fehler aufgetreten", error);
  });

// Routen Importe
const EintragRouten = require("./routes/eintragRoute");
const UserRouten = require("./routes/userRoute");

// Endpunkte Standort
app.use("/api/eintrag", EintragRouten);
app.use("/api/user", UserRouten);
