// Pakete Aufrufen
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
// Schema Aufruf
const User = require("../models/User");

// Lesen der geheimen Infos
dotenv.config();

// User registrieren
const registrieren = async (req, res, next) => {
  const { userName, email, password } = req.body;
  let existierenderUser;
  try {
    existierenderUser = await User.findOne({ email });

    if (existierenderUser) {
      console.error("Benutzer existiert bereits", 422);
      return next();
    }
  } catch (error) {
    console.error("Einloggen fehlgeschlagen", 500);
    return next();
  }
  const userErstellen = new User({
    userName,
    email,
    password: await bcrypt.hash(password, 10),
  });
  try {
    userErstellen.save();
  } catch (error) {
    console.error("User hinzufügen fehlgeschlagen", 500);
    return next();
  }
  res.status(201).json({});
};

// User anmelden
const anmelden = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const existierenderUser = await User.findOne({ email });
    const korrektesPasswort = await existierenderUser.checkPassword(password);

    if (existierenderUser && korrektesPasswort) {
      // Token generieren
      const token = jwt.sign(
        {
          userId: existierenderUser.id,
          userName: existierenderUser.userName,
        },
        process.env.TOKEN_SECRET,
        {
          expiresIn: "100000s",
        }
      );
      // Cookie senden
      res.cookie("token", token, {
        sameSite: "strict",
        httpOnly: true,
        path: "/",
      });
      res.cookie("username", existierenderUser.userName, {
        sameSite: "strict",
        httpOnly: true,
        path: "/",
      });
      return res.send({
        success: true,
        token,
        username: existierenderUser.userName,
      });
    } else {
      console.error("Email oder Passwort falsch", 401);
      return next();
    }
  } catch (error) {
    console.error("Einloggen fehlgeschlagen", 500);
    return next();
  }
};

// Logout
const logout = (req, res, next) => {
  try {
    res.clearCookie("token", {
      sameSite: "strict",
      httpOnly: true,
      path: "/",
    });
    res.clearCookie("username", {
      sameSite: "strict",
      httpOnly: true,
      path: "/",
    });
    res.send({
      success: true,
      message: "Logout erfolgreich",
    });
  } catch (error) {
    console.error("Logout fehlgeschlagen", 401);
    next();
  }
};

// User anzeigen
const userAusgeben = (req, res) => {
  const username = req.cookies.username;
  res.json({ username: username });
};

// Exporte
exports.registrieren = registrieren;
exports.anmelden = anmelden;
exports.logout = logout;
exports.userAusgeben = userAusgeben;
