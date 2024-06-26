const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const HttpError = require("../models/HttpError");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// User registrieren
const registrieren = async (req, res, next) => {
  const { userName, email, password } = req.body;
  let existierenderUser;
  try {
    existierenderUser = await User.findOne({ email });
  } catch (err) {
    const error = new HttpError("Einloggen fehlgeschlagen", 500);
    return next(error);
  }
  if (existierenderUser) {
    const error = new HttpError("Benutzer existiert bereits", 422);
    return next(error);
  }
  const userErstellen = new User({
    userName,
    email,
    password: await bcrypt.hash(password, 10),
  });
  try {
    userErstellen.save();
  } catch (err) {
    const error = new HttpError("User hinzufügen fehlgeschlagen", 500);
    return next(error);
  }
  res.status(201).json({});
};

// User anmelden
const anmelden = async (req, res, next) => {
  const { email, password } = req.body;
  let existierenderUser;
  let korrektesPasswort = false;
  try {
    existierenderUser = await User.findOne({ email });
    korrektesPasswort = await bcrypt.compare(
      password,
      existierenderUser.password
    );
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
      });
      res.cookie("username", existierenderUser.userName, {
        sameSite: "strict",
        httpOnly: true,
      });
      return res.send({
        success: true,
        token,
        username: existierenderUser.userName,
      });
    } else {
      const error = new HttpError("Email oder Passwort falsch", 401);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError("Einloggen fehlgeschlagen", 500);
    return next(error);
  }
};

// Token Check
const tokenCheck = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const status = await tokenSchutz(token);
    res.status(status).send({ message: "Token-Check erfolgreich" });
  } catch (err) {
    const error = new HttpError("Token-Check fehlgeschlagen", 401);
    return next(error);
  }
};

// Logout
const logout = (req, res, next) => {
  res.clearCookie("username", {
    sameSite: "strict",
    httpOnly: true,
  });
  res.clearCookie("token", {
    sameSite: "strict",
    httpOnly: true,
  });
  res.send({ success: true, message: "Logout erfolgreich" });
  next();
};
exports.registrieren = registrieren;
exports.anmelden = anmelden;
exports.tokenCheck = tokenCheck;
exports.logout = logout;
