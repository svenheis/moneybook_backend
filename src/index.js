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

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://moneybook-frontend.onrender.com"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(
  cors({
    origin: "https://moneybook-frontend.onrender.com",
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
  .catch((err) => {
    console.log(err);
  });

// Routen Importe
const EintragRouten = require("./routes/eintragRoute");
const UserRouten = require("./routes/userRoute");

// Endpunkte Standort
app.use("/api/eintrag", EintragRouten);
app.use("/api/user", UserRouten);
