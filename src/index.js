// Paket Importe
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const cookie = require("cookie-parser");

// Lesen der geheimen Informationen
dotenv.config();

// Express erstellen
const app = express();
const port = process.env.PORT;
app.use(express.json());

app.use(cookie());
app.use(
  cors({
    credentials: true,
    origin: "https://moneybook-frontend.onrender.com/",
  })
);
const salt = bcrypt.genSaltSync(10);
const TOKEN_SECRET = "SecretToken";

// Datenbank, Port und Startmeldung
mongoose
  .connect(process.env.MONGO)
  .then(
    app.listen(port, () => {
      console.log(`Der Server Startet unter dem Port ${port}`);
    })
  )
  .catch((err) => {
    console.log(err);
  });

// Routen Importe
const EintragRouten = require("./routes/eintragRoute");
const UserRouten = require("./routes/userRoute");

// Endpunkte Standort
app.use("/api/eintrag", EintragRouten);
app.use("/api/user", UserRouten);
