const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  image: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Case", caseSchema);
