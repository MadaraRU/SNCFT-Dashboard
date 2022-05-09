const asynchandler = require("express-async-handler");
const Personnel = require("../models/personnelModel");
const { CarteCarburant } = require("../models/carteCarburantModel");
const { Carburant } = require("../models/caruburantModel");

const getPeronnel = asynchandler(async (req, res) => {
  const personnel = await Personnel.find();

  res.status(200).json(personnel);
});

// const addCarteCarburantToPersonnel = asynchandler(async (req, res) => {
//   const carteCarburant = await CarteCarburant.findById(req.body.carbId);

//   // Create a new carburant
//   const newCarteCarburant = new CarteCarburant({
//     quantite: 0,
//     bonDeCommande: carteCarburant.bonDeCommande,
//     prix: carteCarburant.prix,
//   });

//   await carteCarburant.save();

//   // Get Personel
//   const personnel = await Personnel.findById(req.params.id);
//   personnel.carteCarburant.push(newCarteCarburant);

//   await personnel.save();
//   // console.log(req);

//   res.status(201).json(newCarteCarburant);
// });
const addCarteCarburantToPersonnel = asynchandler(async (req, res) => {
  // Create a new carburant
  const newCarteCarburant = new CarteCarburant({
    quantite: +"0",
    bonDeCommande: req.body.bonDeCommande,
    prix: req.body.prix,
  });

  await newCarteCarburant.save();

  // Get Personel
  const personnel = await Personnel.findById(req.params.id);
  personnel.carteCarburant.push(newCarteCarburant);

  await personnel.save();
  // console.log(req);

  res.status(201).json(newCarteCarburant);
});

const updateCarteCarburantQuantity = asynchandler(async (req, res) => {
  const personnel = await Personnel.findById(req.params.id);
  const cd = personnel.carteCarburant.id(req.body.carbId);

  personnel.carteCarburant.id(req.body.carbId).quantite = req.body.quantite;
  personnel.carteCarburant.id(req.body.carbId).dateDeRecharge =
    new Date().toLocaleString("US");

  await personnel.save();

  res.status(200).json(personnel.CarteCarburant);
});

// @desc    add carburant to existed personnel
// @route   POST /api/personnels/:id/carburant
// @access  Private

const addCarburantToPersonnel = asynchandler(async (req, res) => {
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
    bonDeCommande: carburant.bonDeCommande,
    nature: carburant.nature,
    prix: carburant.prix,
  });

  carburant.quantite -= quantite;

  await carburant.save();

  // Get Personnel
  const personnel = await Personnel.findById(req.params.id);

  let check = true;

  for (let carb of personnel.carburant) {
    if (carb.type === carburant.type) {
      carb.quantite += quantite;
      check = false;
      break;
    }
  }
  if (check) {
    personnel.carburant.push(newCarburant);
  }

  // save the carburant
  // await newCarburant.save();

  // save the personnel
  await personnel.save();

  // await Carburant.findOneAndDelete({ quantite: 0 });

  // console.log(req);

  res.status(201).json(newCarburant);
});

module.exports = {
  getPeronnel,
  addCarteCarburantToPersonnel,
  updateCarteCarburantQuantity,
  addCarburantToPersonnel,
};
