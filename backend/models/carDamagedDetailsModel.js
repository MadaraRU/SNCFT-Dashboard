const mongoose = require("mongoose");

const carDamagedDetailsSchema = mongoose.Schema(
  {
    date: {
      type: Date,
    },
    location: {
      type: String,
    },
    nomAgent: {
      type: String,
    },
    prixDeReparation: {
      type: Number,
    },
    typeDeDommage: {
      type: String,
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

module.exports = mongoose.model("DamagedCarDetails", carDamagedDetailsSchema);
