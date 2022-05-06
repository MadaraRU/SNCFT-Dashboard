const mongoose = require("mongoose");

const missionSchema = mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
    },
    nomAgent: {
      type: String,
      required: true,
    },
    matricule: {
      type: String,
      required: true,
    },
    dateDeMission: {
      type: Date,
      min: "2022-01-01",
      max: "2032-01-01",
      required: true,
    },
    dateFin: {
      type: Date,
      default: "",
    },
    destination: {
      type: String,
      required: true,
    },
    missionStatus: {
      type: String,
      required: true,
      default: "en cours",
    },
    description: {
      type: String,
      default: "",
    },
    typeDeCarburant: {
      type: String,
    },
    quantite: {
      type: Number,
    },
    user: {
      type: String,
    },
    parc: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parc",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Mission", missionSchema);
