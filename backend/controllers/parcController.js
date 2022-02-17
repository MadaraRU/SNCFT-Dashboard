const asyncHandler = require("express-async-handler");
const Parc = require("../models/parcModel");

// @desc  Get Parc
// @route GET /api/goals
// @access Private
const getParc = asyncHandler(async (req, res) => {
  const parc = await Parc.find();

  res.status(200).json(parc);
});

// @desc  Set Parc
// @route POST /api/goals
// @access Private
const setParc = asyncHandler(async (req, res) => {
  if (!req.body.reference) {
    res.status(400);
    throw new Error("Please add a reference field");
  }
  if (!req.body.type) {
    res.status(400);
    throw new Error("Please add a type field");
  }
  if (!req.body.localisation) {
    res.status(400);
    throw new Error("Please add a localisation field");
  }
  if (!req.body.capacite) {
    res.status(400);
    throw new Error("Please add a capacite field");
  }

  const parc = await Parc.create({
    reference: req.body.reference,
    type: req.body.type,
    localisation: req.body.localisation,
    capacite: req.body.capacite,
  });

  res.status(200).json(parc);
});

// @desc  Update Parc
// @route UPDATE /api/goals/:id
// @access Private
const updateParc = asyncHandler(async (req, res) => {
  const parc = await Parc.findById(req.params.id);

  if (!parc) {
    res.status(400);
    throw new Error("Parc not found");
  }

  const updatedParc = await Parc.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedParc);
});

// @desc  Delete Parc
// @route DELETE /api/goals/:id
// @access Private
const deleteParc = asyncHandler(async (req, res) => {
  const parc = await Parc.findById(req.params.id);

  if (!parc) {
    res.status(400);
    throw new Error("Parc not found");
  }

  await parc.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getParc,
  setParc,
  updateParc,
  deleteParc,
};
