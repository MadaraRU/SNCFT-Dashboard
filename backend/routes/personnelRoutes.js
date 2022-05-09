const express = require("express");
const {
  getPeronnel,
  addCarteCarburantToPersonnel,
  updateCarteCarburantQuantity,
  addCarburantToPersonnel,
} = require("../controllers/personnelController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, getPeronnel);
router
  .route("/:id/carte")
  .post(addCarteCarburantToPersonnel)
  .put(updateCarteCarburantQuantity);
router.route("/:id/carburant").post(addCarburantToPersonnel);

module.exports = router;
