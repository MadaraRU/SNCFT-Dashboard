const mongoose = require("mongoose");

const archiveSchema = mongoose.Schema(
  {
    action: { type: String, required: true },
    category: { type: String, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Archive", archiveSchema);
