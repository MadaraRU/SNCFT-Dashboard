const mongoose = require("mongoose");

const carburantSchema = mongoose.Schema(
  {
    quantite: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    nature: {
      type: String,
      required: true,
    },
    prix: {
      type: Number,
      required: true,
    },
    bonDeCommande: {
      type: String,
    },
    parc: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parc",
    },
    personnel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Personnel",
    },
  },
  {
    timestamps: true,
  }
);

const Carburant = mongoose.model("Carburant", carburantSchema);

module.exports = {
  Carburant,
  carburantSchema,
};
