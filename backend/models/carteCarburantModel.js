const mongoose = require("mongoose");

const carteCarburantSchema = mongoose.Schema(
  {
    quantite: {
      type: Number,
      required: true,
      default: 0,
    },
    prix: {
      type: Number,
      required: true,
    },
    bonDeCommande: {
      type: String,
      required: true,
    },
    dateDeRecharge: {
      type: String,
      default: "Pas encore recharger",
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

const CarteCarburant = mongoose.model("CarteCarburant", carteCarburantSchema);

module.exports = {
  CarteCarburant,
  carteCarburantSchema,
};
