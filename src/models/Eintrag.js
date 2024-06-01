// Paket Aufruf
const mongoose = require("mongoose");
// Schema eines Eintrags
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
  // user = Name im Schema, {} Definition des Userfeldes, objektId = standartwert in mongoDB
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

// Export
module.exports = mongoose.model("Eintrag", EintragSchema);
