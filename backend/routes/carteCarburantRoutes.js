const express = require("express");
const {
  getCarteCarburant,
  setCarteCarburant,
} = require("../controllers/carteCarburantController");
const router = express.Router();

router.route("/").get(getCarteCarburant).post(setCarteCarburant);

module.exports = router;
