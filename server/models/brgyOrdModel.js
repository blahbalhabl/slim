const mongoose = require("mongoose");

const brgySchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
    unique: true,
  },
  series: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
  mimetype: {
    type: String,
    required: true,
  },
  accessLevel: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: null,
  },
});

brgySchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model("Barangay-Ordinances", brgySchema);
