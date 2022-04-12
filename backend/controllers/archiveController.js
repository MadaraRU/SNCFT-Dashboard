const asyncHandler = require("express-async-handler");
const Archive = require("../models/archiveModel");

// @desc    get all history
// @route   GET /api/archive/
// @access  Private

const getAllHistory = asyncHandler(async (req, res) => {
  const archive = await Archive.find();

  res.status(200).json(archive);
});

module.exports = {
  getAllHistory,
};
