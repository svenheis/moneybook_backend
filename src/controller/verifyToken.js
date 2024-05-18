const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");

router.use(cookieParser());

const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  console.log("cookie aus token", token);
  if (!token) {
    return res.sendStatus(401);
  }
  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log("verifizierte Daten", data);
    req.auth = data;
    next();
  } catch (error) {
    console.error("token verifizierung fehlgeschlagen", error);
    res.sendStatus(403);
  }
};
exports.verifyToken = verifyToken;
