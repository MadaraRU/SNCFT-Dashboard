const asyncHandler = require("express-async-handler");

// @desc  Get Parc
// @route GET /api/goals
// @access Private
const getParc = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get Parc" });
});

// @desc  Set Parc
// @route POST /api/goals
// @access Private
const setParc = asyncHandler(async (req, res) => {
  if (!req.body.localisation) {
    res.status(400);
    throw new Error("Please add a localisation field");
  }

  res.status(200).json({ message: "Set Parc" });
});

// @desc  Update Parc
// @route UPDATE /api/goals/:id
// @access Private
const updateParc = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update Parc ${req.params.id}` });
});

// @desc  Delete Parc
// @route DELETE /api/goals/:id
// @access Private
const deleteParc = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete Parc ${req.params.id}` });
});

module.exports = {
  getParc,
  setParc,
  updateParc,
  deleteParc,
};
