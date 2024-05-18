const bcrypt = require("bcrypt");
const HttpError = require("../models/HttpError");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

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
      });

      console.log(existierenderUser);
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
    console.error(err);
    const error = new HttpError("Einloggen fehlgeschlagen", 500);
    return next(error);
  }
};

// Logout
const logout = (req, res, next) => {
  try {
    res.clearCookie("username", {
      sameSite: "strict",
      httpOnly: true,
    });
    res.clearCookie("token", {
      sameSite: "strict",
      httpOnly: true,
    });

    res.send({ success: true, message: "Logout erfolgreich" });
  } catch (err) {
    const error = new HttpError("Logout fehlgeschlagen", 401);
    next(error);
  }
};
exports.registrieren = registrieren;
exports.anmelden = anmelden;
exports.logout = logout;
