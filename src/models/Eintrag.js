const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EintragSchema = new Schema({
  typ: {
    type: String,
    required: true,
  },
  titel: {
    type: String,
    required: true,
  },
  betrag: {
    type: Number,
    required: true,
  },
  datum: {
    type: Date,
    default: Date.now,
  },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Eintrag", EintragSchema);
