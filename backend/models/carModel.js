const mongoose = require("mongoose");

const carSchema = mongoose.Schema(
  {
    marque: {
      type: String,
      required: true,
    },
    modele: {
      type: String,
      required: true,
    },
    matricule: {
      type: String,
      required: true,
      unique: true,
    },
    carburant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Carburant",
    },
    parc: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parc",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Car", carSchema);
