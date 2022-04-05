const express = require("express");
const {
  getVoitures,
  deleteVoiture,
  updateCarToBroken,
  updateCarToUnbroken,
} = require("../controllers/carController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").get(protect, getVoitures);
router.route("/:id").delete(protect, deleteVoiture);
router.route("/:id/broken").put(updateCarToBroken);
router.route("/:id/unbroken").put(updateCarToUnbroken);

module.exports = router;
