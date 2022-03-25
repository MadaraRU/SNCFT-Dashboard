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
} = require("../controllers/parcController");
const { admin, protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getParc).post(protect, setParc);
router
  .route("/:id")
  .put(protect, updateParc)
  .delete(protect, deleteParc)
  .get(protect, getParcById);
router.route("/:id/cars").get(protect, getParcCars).post(protect, addParcCars);
router.route("/:id/mission").get(protect, getMission).post(protect, addMission);

// router.get("/", getParc);
// router.post("/", setParc);
// router.put("/:id", updateParc);
// router.delete("/:id", deleteParc);

module.exports = router;
