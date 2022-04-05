const express = require("express");
const {
  getMission,
  addMission,
  getMissionById,
  updateMissionToFini,
  updateMissionToAnnuller,
} = require("../controllers/missionController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").get(protect, getMission).post(protect, addMission);
router.route("/:id").get(protect, getMissionById);
router.route("/:id/fini").put(updateMissionToFini);
router.route("/:id/annuller").put(updateMissionToAnnuller);
module.exports = router;
