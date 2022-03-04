const mongoose = require("mongoose");

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
    capacite: {
      type: Number,
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
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Parc", parcSchema);
