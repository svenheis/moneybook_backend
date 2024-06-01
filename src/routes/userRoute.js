// Paket Aufrufe
const express = require("express");
const router = express.Router();
const controller = require("../controller/userController");

//Routen Endpunkte User

// Registrierung
router.post("/register", controller.registrieren);

// Anmeldung
router.post("/login", controller.anmelden);

// Userausgabe
router.get("/user", controller.userAusgeben);

// Logout
router.get("/logout", controller.logout);

// Export
module.exports = router;
