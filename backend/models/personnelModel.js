const mongoose = require("mongoose");
const { carteCarburantSchema } = require("./carteCarburantModel");
const { carburantSchema } = require("./caruburantModel");

const peronnelSchema = mongoose.Schema(
  {
    nom: {
      type: String,
    },
    prenom: {
      type: String,
    },
    matricule: {
      type: String,
      unique: true,
    },
    carburant: [
      {
        type: carburantSchema,
      },
    ],
    carteCarburant: [
      {
        type: carteCarburantSchema,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Personnel", peronnelSchema);
