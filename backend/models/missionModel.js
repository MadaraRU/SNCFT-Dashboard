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
      min: "2020-01-01",
      max: "2030-01-01",
      required: true,
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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
