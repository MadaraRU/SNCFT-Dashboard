const mongoose = require("mongoose");

const archiveSchema = mongoose.Schema(
  {
    action: { type: String, required: true },
    category: { type: String, required: true },
    message: { type: String, required: true },
    createdBy: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Archive", archiveSchema);
