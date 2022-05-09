const asynchandler = require("express-async-handler");
const { CarteCarburant } = require("../models/carteCarburantModel");

const getCarteCarburant = asynchandler(async (req, res) => {
  const carteCarburant = await CarteCarburant.find();

  res.status(200).json(carteCarburant);
});

const setCarteCarburant = asynchandler(async (req, res) => {
  const carteCarburant = await CarteCarburant.create({
    quantite: req.body.quantite,
    prix: req.body.prix,
    bonDeCommande: req.body.bonDeCommande,
  });

  const savedCarburant = await carteCarburant.save();

  res.status(201).json(savedCarburant);
});

module.exports = {
  getCarteCarburant,
  setCarteCarburant,
};
