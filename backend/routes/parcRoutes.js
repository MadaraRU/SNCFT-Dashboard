const express = require("express");
const router = express.Router();
const {
  getParc,
  setParc,
  updateParc,
  deleteParc,
  getParcCars,
  addParcCars,
  getParcById,
  getMission,
  addMission,
  updateParcsCarTobroken,
  getCarburantParc,
  addCarburantToParc,
} = require("../controllers/parcController");
const { admin, protect } = require("../middleware/authMiddleware");
const { historyMiddleware } = require("../middleware/historyMiddleware");

router
  .route("/")
  .get(protect, getParc)
  .post(protect, historyMiddleware, setParc);
router
  .route("/:id")
  .put(protect, updateParc)
  .delete(protect, deleteParc)
  .get(protect, getParcById);
router
  .route("/:id/cars")
  .get(protect, getParcCars)
  .post(protect, historyMiddleware, addParcCars);
router
  .route("/:id/mission")
  .get(protect, getMission)
  .post(protect, historyMiddleware, addMission);
router
  .route("/:id/carburant")
  .get(protect, getCarburantParc)
  .post(addCarburantToParc);

// router.route("/:id/cars/:id/broken").put(protect, updateParcsCarTobroken);
// router.get("/", getParc);
// router.post("/", setParc);
// router.put("/:id", updateParc);
// router.delete("/:id", deleteParc);

module.exports = router;
