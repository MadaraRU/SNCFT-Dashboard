const asynchandler = require("express-async-handler");
const { Carburant } = require("../models/caruburantModel");

const getCarburant = asynchandler(async (req, res) => {
  const carburant = await Carburant.find();

  res.status(200).json(carburant);
});

const setCarburant = asynchandler(async (req, res) => {
  const carburant = await Carburant.create({
    quantite: req.body.quantite,
    type: req.body.type,
    nature: req.body.nature,
    prix: req.body.prix,
    fournisseur: req.body.fournisseur,
  });

  const savedCarburant = await carburant.save();

  res.status(201).json(savedCarburant);
});

module.exports = {
  getCarburant,
  setCarburant,
};
