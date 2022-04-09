const express = require("express");
const {
  getVoitures,
  deleteVoiture,
  updateCarToBroken,
  updateCarToUnbroken,
  updateCarToAvailable,
  updateCarToUnavailable,
  getCarIdByMatricule,
  getcarPapersCar,
  addCarPapers,
} = require("../controllers/carController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").get(protect, getVoitures).post(getCarIdByMatricule);
router.route("/:id").delete(protect, deleteVoiture);
router
  .route("/:id/papers")
  .get(protect, getcarPapersCar)
  .post(protect, addCarPapers);
router.route("/:id/broken").put(updateCarToBroken);
router.route("/:id/unbroken").put(updateCarToUnbroken);
router.route("/:id/available").put(updateCarToAvailable);
router.route("/:id/unavailable").put(updateCarToUnavailable);

module.exports = router;
