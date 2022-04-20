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
      default_language: "ar",
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
    papers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CarPapers",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Car", carSchema);
// CarModel.createIndexes({ matricule: "text" }, { default_language: "arabic" });

//  = CarModel;
