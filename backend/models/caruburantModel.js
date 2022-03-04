const mongoose = require("mongoose");

const carburantSchema = mongoose.Schema({
  quantite: {
    type: Number,
    required: true,
  },
  duree: {
    type: String,
    required: true,
  },
  marque: {
    type: String,
    required: true,
  },
  prix: {
    type: Number,
    required: true,
  },
  origine: {
    type: Number,
    required: true,
  },
  voiture: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
    required: true,
  },
});

module.exports = mongoose.Model("Carburant", carburantSchema);
