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
    etat: {
      type: String,
      required: true,
      default: "marche",
    },
    status: {
      type: String,
      default: "disponible",
    },
    description: {
      type: String,
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
