const asyncHandler = require("express-async-handler");
const Car = require("../models/carModel");

// @desc  Get all cars
// @route GET /api/voiture
// @access Private

const getVoitures = asyncHandler(async (req, res) => {
  const voiture = await Car.find();

  res.status(200).json(voiture);
});

// @desc    DELETE car
// @route   DELETE /api/voiture/:id
// @access  Private
const deleteVoiture = asyncHandler(async (req, res) => {
  const voiture = await Car.findById(req.params.id);
  if (voiture) {
    await voiture.remove();
    res.json({ message: "Car removed" });
  } else {
    res.status(404);
    throw new Error("Car not found");
  }
});

// @desc    Update car to broken
// @route   PUT /api/voiture/:id/broken
// @access  Private
const updateCarToBroken = asyncHandler(async (req, res) => {
  const voiture = await Car.findById(req.params.id);

  if (voiture) {
    voiture.etat = "en panne";
    const updatedState = await voiture.save();
    res.json(updatedState);
  } else {
    res.status(404);
    throw new Error("Car not found");
  }
});
// @desc    Update car to unbroken
// @route   PUT /api/voiture/:id/unbroken
// @access  Private
const updateCarToUnbroken = asyncHandler(async (req, res) => {
  const voiture = await Car.findById(req.params.id);

  if (voiture) {
    voiture.etat = "marche";
    const updatedState = await voiture.save();
    res.json(updatedState);
  } else {
    res.status(404);
    throw new Error("Car not found");
  }
});

// @desc    Update car to Unavailable
// @route   PUT /api/voiture/:id/Unavailable
// @access  Private
const updateCarToUnavailable = asyncHandler(async (req, res) => {
  const voiture = await Car.findById(req.params.id);

  if (voiture) {
    voiture.status = "en mission";
    const updatedStatus = await voiture.save();
    res.json(updatedStatus);
  } else {
    res.status(404);
    throw new Error("Car not found");
  }
});

// @desc    Update car to available
// @route   PUT /api/voiture/:id/available
// @access  Private
const updateCarToAvailable = asyncHandler(async (req, res) => {
  const voiture = await Car.findById(req.params.id);

  if (voiture) {
    voiture.status = "disponible";
    const updatedStatus = await voiture.save();
    res.json(updatedStatus);
  } else {
    res.status(404);
    throw new Error("Car not found");
  }
});

// // @desc    get card Id by matricule
// @route   post /api/voiture/:
// @access  Private

const getCarIdByMatricule = asyncHandler(async (req, res) => {
  const selectedCar = await Car.findOne({ matricule: req.body.matricule });

  if (selectedCar) {
    res.json(selectedCar._id);
  }
});

module.exports = {
  getVoitures,
  deleteVoiture,
  updateCarToBroken,
  updateCarToUnbroken,
  updateCarToAvailable,
  updateCarToUnavailable,
  getCarIdByMatricule,
};
