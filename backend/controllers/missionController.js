const asyncHandler = require("express-async-handler");
const Mission = require("../models/missionModel");
const moment = require("moment");

// @desc  Get Mission
// @route GET /api/mission
// @access Private

const getMission = asyncHandler(async (req, res) => {
  const mission = await Mission.find();

  res.status(200).json(mission);
});

// @desc  Get Mission by Id
// @route GET /api/mission/:id
// @access Private

const getMissionById = asyncHandler(async (req, res) => {
  const mission = await Mission.findById(req.params.id);
  if (!mission) {
    res.status(404);
    throw new Error("Mission not found");
  }

  res.status(200).json(mission);
});

// @desc  add Mission
// @route POST /api/mission
// @access Private

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

  const mission = await Mission.create({
    nom: req.body.nom,
    nomAgent: req.body.nomAgent,
    matricule: req.body.matricule,
    dateDeMission: req.body.dateDeMission,
    destination: req.body.destination,
  });

  res.status(200).json(mission);
});

// @desc  update Mission to fini
// @route PUT /api/mission/:id/fini
// @access Private

const updateMissionToFini = asyncHandler(async (req, res) => {
  const mission = await Mission.findById(req.params.id);

  if (mission) {
    mission.missionStatus = "fini";
    const updatedMission = await mission.save();
    res.json(updatedMission);
  } else {
    res.status(404);
    throw new Error("Mission not found");
  }
});

module.exports = {
  getMission,
  addMission,
  getMissionById,
  updateMissionToFini,
};
