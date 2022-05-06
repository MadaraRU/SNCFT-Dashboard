const mongoose = require("mongoose");
const { carburantSchema } = require("../models/caruburantModel");

const parcSchema = mongoose.Schema(
  {
    reference: {
      type: String,
      required: true,
      unique: true,
    },
    localisation: {
      type: String,
      required: true,
    },
    departement: {
      type: String,
    },
    voiture: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
      },
    ],
    mission: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mission",
      },
    ],
    carburant: [
      {
        type: carburantSchema,
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Parc", parcSchema);
