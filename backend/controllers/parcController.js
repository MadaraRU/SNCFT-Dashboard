const asyncHandler = require("express-async-handler");
const Parc = require("../models/parcModel");
const Car = require("../models/carModel");
const Mission = require("../models/missionModel");
const { Carburant } = require("../models/caruburantModel");

// @desc  Get Parc
// @route GET /api/parc
// @access Private
const getParc = asyncHandler(async (req, res) => {
  const parc = await Parc.find();
  // console.log(req);

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
  const parcExists = await Parc.findOne({ reference: req.body.reference });

  if (parcExists) {
    res.status(400);
    throw new Error("Parc existe déjà");
  }

  if (!req.body.reference) {
    res.status(400);
    throw new Error("Please add a reference field");
  }
  if (!req.body.localisation) {
    res.status(400);
    throw new Error("Please add a localisation field");
  }
  if (!req.body.departement) {
    res.status(400);
    throw new Error("Please add a departement field");
  }

  const parc = await Parc.create({
    reference: req.body.reference,
    localisation: req.body.localisation,
    departement: req.body.departement,
  });

  // console.log(req);

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

// @desc    DELETE parc
// @route   PUT /api/parc/:id
// @access  Private/Admin
const desactivateParc = asyncHandler(async (req, res) => {
  const parc = await Parc.findById(req.params.id);
  if (parc) {
    parc.isDeleted = true;
    const desactivateParc = parc.save();
    res.json(desactivateParc);
  } else {
    res.status(404);
    throw new Error("Parc not found");
  }
});

const getParcCars = asyncHandler(async (req, res) => {
  const parc = await Parc.findById(req.params.id).populate("voiture");
  res.status(200).json(parc.voiture);
});

const updateParcsCarTobroken = asyncHandler(async (req, res) => {
  const parc = await Parc.findById(req.params.id).populate("voiture");
  if (parc.voiture) {
    parc.voiture.etat = "en panne";
    const updatedState = await Parc.save();
    res.json(updatedState);
  } else {
    res.status(404);
    throw new Error("Car not found");
  }
});

const addParcCars = asyncHandler(async (req, res) => {
  // Create a new car
  const newCar = new Car(req.body);

  const existedCar = await Car.findOne({ matricule: req.body.matricule });

  if (existedCar) {
    res.status(400);
    throw new Error("Voiture existe déjà");
  }

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

const getMission = asyncHandler(async (req, res) => {
  const parc = await Parc.findById(req.params.id).populate("mission");
  res.status(200).json(parc.mission);
});

// @desc    add mission
// @route   POST /api/parcs/:id/mission
// @access  Private

const addMission = asyncHandler(async (req, res) => {
  if (!req.body.nom) {
    res.status(400);
    throw new Error("Please add a nom field");
  }
  if (!req.body.nomAgent) {
    res.status(400);
    throw new Error("Please add a nomAgent field");
  }
  if (!req.body.matricule) {
    res.status(400);
    throw new Error("Please add a matricule field");
  }
  if (!req.body.dateDeMission) {
    res.status(400);
    throw new Error("Please add a dateDeMission field");
  }
  if (!req.body.destination) {
    res.status(400);
    throw new Error("Please add a destination field");
  }
  // Create a new mission
  const newMission = new Mission(req.body);

  // Get parc
  const parc = await Parc.findById(req.params.id);

  // Assing a parc as a mission parc
  newMission.parc = parc;

  // save the mission
  await newMission.save();

  // Add mission to the parc's mission array
  parc.mission.push(newMission);

  // save the parc
  await parc.save();

  // console.log(req);

  res.status(201).json(newMission);
});

// @desc  update Mission to fini
// @route PUT /api/parc/:id/mission/fini
// @access Private

const updateMissionToFini = asyncHandler(async (req, res) => {
  const mission = await Mission.findById(req.params.id).populate("parc");

  if (mission) {
    mission.missionStatus = "fini";
    const updatedMission = await mission.save();
    res.json(updatedMission);
  } else {
    res.status(404);
    throw new Error("Mission not found");
  }
});

// @desc    add carburant to existed parc
// @route   POST /api/parcs/:id/carburant
// @access  Private

const addCarburantToParc = asyncHandler(async (req, res) => {
  if (req.body.quantite < 0) {
    res.status(400);
    throw new Error("Quantite negative");
  }

  const quantite = +req.body.quantite;
  const carburant = await Carburant.findById(req.body.carbId);

  if (carburant.quantite - quantite < 0) {
    res.status(400);
    throw new Error("Quantite negative");
  }

  // Create a new carburant
  const newCarburant = new Carburant({
    quantite: quantite,
    type: carburant.type,
    nature: carburant.nature,
    prix: carburant.prix,
  });

  carburant.quantite -= quantite;

  await carburant.save();

  // Get parc
  const parc = await Parc.findById(req.params.id);

  let check = true;

  for (let carb of parc.carburant) {
    if (carb.type === carburant.type) {
      carb.quantite += quantite;
      check = false;
      break;
    }
  }
  if (check) {
    parc.carburant.push(newCarburant);
  }

  // save the carburant
  // await newCarburant.save();

  // Add carburant to the parc's carburant array

  // save the parc
  await parc.save();

  // console.log(req);

  res.status(201).json(newCarburant);
});

// @desc    get carburant's parc
// @route   GET /api/parcs/:id/carburant
// @access  Private

const getCarburantParc = asyncHandler(async (req, res) => {
  const parc = await Parc.findById(req.params.id);
  if (!parc) {
    res.status(404);
    throw new Error("Parc not found");
  }
  res.status(200).json(parc.carburant);
});

// @desc    update carburant's parc quantity
// @route   PUT /api/parcs/:id/carburant
// @access  Private

const updateCarburantParcQuantity = asyncHandler(async (req, res) => {
  const parc = await Parc.findById(req.params.id);

  if (parc.carburant.id(req.body.carbId).quantite < req.body.quantite) {
    res.status(400);
    throw new Error("Carburant negative");
  }
  parc.carburant.id(req.body.carbId).quantite -= req.body.quantite;

  await parc.save();

  res.status(200).json(parc.carburant);
});

module.exports = {
  getParc,
  getParcById,
  setParc,
  updateParc,
  deleteParc,
  addParcCars,
  getParcCars,
  getMission,
  addMission,
  updateMissionToFini,
  updateParcsCarTobroken,
  addCarburantToParc,
  getCarburantParc,
  updateCarburantParcQuantity,
  desactivateParc,
};
