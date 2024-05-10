const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, unique: true },
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", UserSchema);
