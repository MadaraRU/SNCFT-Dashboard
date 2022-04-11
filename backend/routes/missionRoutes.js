const express = require("express");
const {
  getMission,
  addMission,
  getMissionById,
  updateMissionToFini,
  updateMissionToAnnuller,
} = require("../controllers/missionController");
const { protect } = require("../middleware/authMiddleware");
const { historyMiddleware } = require("../middleware/historyMiddleware");
const router = express.Router();

router
  .route("/")
  .get(protect, getMission)
  .post(protect, historyMiddleware, addMission);
router.route("/:id").get(protect, getMissionById);
router.route("/:id/fini").put(protect, historyMiddleware, updateMissionToFini);
router
  .route("/:id/annuller")
  .put(protect, historyMiddleware, updateMissionToAnnuller);
module.exports = router;
