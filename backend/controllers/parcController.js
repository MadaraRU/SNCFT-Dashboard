const asyncHandler = require("express-async-handler");
const Parc = require("../models/parcModel");
const Car = require("../models/carModel");

// @desc  Get Parc
// @route GET /api/parc
// @access Private
const getParc = asyncHandler(async (req, res) => {
  const parc = await Parc.find();

  res.status(200).json(parc);
});

// @desc  Get Parc by id
// @route GET /api/parc/:id
// @access Private
const getParcById = asyncHandler(async (req, res) => {
  const parc = await Parc.findById(req.params.id);

  if (!parc) {
    res.status(404);
    throw new Error("Parc not found");
  }

  res.status(200).json(parc);
});

// @desc  Set Parc
// @route POST /api/parc
// @access Private
const setParc = asyncHandler(async (req, res) => {
  if (!req.body.reference) {
    res.status(400);
    throw new Error("Please add a reference field");
  }
  if (!req.body.localisation) {
    res.status(400);
    throw new Error("Please add a localisation field");
  }
  if (!req.body.capacite) {
    res.status(400);
    throw new Error("Please add a capacite field");
  }
  if (!req.body.departement) {
    res.status(400);
    throw new Error("Please add a departement field");
  }

  const parc = await Parc.create({
    reference: req.body.reference,
    localisation: req.body.localisation,
    capacite: req.body.capacite,
    departement: req.body.departement,
  });

  res.status(200).json(parc);
});

// @desc  Update Parc
// @route UPDATE /api/parc/:id
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
// @route DELETE /api/parc/:id
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

const getParcCars = asyncHandler(async (req, res) => {
  const parc = await Parc.findById(req.params.id).populate("voiture");
  res.status(200).json(parc.voiture);
});

const addParcCars = asyncHandler(async (req, res) => {
  // Create a new car
  const newCar = new Car(req.body);

  // Get parc
  const parc = await Parc.findById(req.params.id);

  // Assing a parc as a cars parc
  newCar.parc = parc;

  // save the car
  await newCar.save();

  // Add car to the parc's voiture array
  parc.voiture.push(newCar);

  // save the parc
  await parc.save();

  res.status(201).json(newCar);
});

module.exports = {
  getParc,
  getParcById,
  setParc,
  updateParc,
  deleteParc,
  addParcCars,
  getParcCars,
};
