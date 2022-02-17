const mongoose = require("mongoose");

// const typeSchema = mongoose.Schema(
//   {
//     Reference: {
//       type: String,
//       required: true,
//     },
//     Name: {
//       type: String,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

const parcSchema = mongoose.Schema(
  {
    reference: {
      type: String,
      required: true,
    },
    // Type: [typeSchema],
    type: {
      type: String,
      required: true,
    },
    localisation: {
      type: String,
      required: true,
    },
    capacite: {
      type: Number,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Parc", parcSchema);
