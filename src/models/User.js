const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, unique: true },
});

UserSchema.plugin(uniqueValidator);

UserSchema.methods.checkPassword = function (password, done) {
  if (bcrypt.compareSync(password, this.password)) {
    return true;
  } else {
    return false;
  }
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
