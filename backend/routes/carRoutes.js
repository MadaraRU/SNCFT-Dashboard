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
  getVoituresById,
} = require("../controllers/carController");
const { protect } = require("../middleware/authMiddleware");
const { historyMiddleware } = require("../middleware/historyMiddleware");
const router = express.Router();

router.route("/").get(protect, getVoitures).post(getCarIdByMatricule);
router
  .route("/:id")
  .get(protect, getVoituresById)
  .delete(protect, deleteVoiture);
router
  .route("/:id/papers")
  .get(protect, getcarPapersCar)
  .post(protect, addCarPapers);
router.route("/:id/broken").put(protect, updateCarToBroken);
router.route("/:id/unbroken").put(protect, updateCarToUnbroken);
router.route("/:id/available").put(protect, updateCarToAvailable);
router.route("/:id/unavailable").put(protect, updateCarToUnavailable);

module.exports = router;
