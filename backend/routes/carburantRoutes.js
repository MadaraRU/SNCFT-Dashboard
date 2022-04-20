const express = require("express");
const {
  getCarburant,
  setCarburant,
} = require("../controllers/carburantController");
const router = express.Router();

router.route("/").get(getCarburant).post(setCarburant);

module.exports = router;
