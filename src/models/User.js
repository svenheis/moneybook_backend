// Paket Aufrufe
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

// Schema eines Users das in gespeichert wird
const UserSchema = new Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, unique: true },
});

// uniqueValidator stellt sicher, das keine >unique: true< einträge doppelt vorhanden sind
UserSchema.plugin(uniqueValidator);

// wird die methode checkPassword hinzugefügt die das Passwort mit dem gehashten Password
UserSchema.methods.checkPassword = function (password, done) {
  if (bcrypt.compareSync(password, this.password)) {
    return true;
  } else {
    return false;
  }
};

const User = mongoose.model("User", UserSchema);

// Export
module.exports = User;
