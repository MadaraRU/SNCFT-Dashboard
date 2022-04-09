const mongoose = require("mongoose");

const carPapersSchema = mongoose.Schema(
  {
    assurance: {
      type: Date,
      required: true,
    },
    visite: {
      type: Date,
      required: true,
    },
    vigniette: {
      type: Date,
      required: true,
    },
    prixAssurance: {
      type: Number,
      required: true,
    },
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CarPapers", carPapersSchema);
