const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  getUsers,
  deleteUser,
  getUserById,
  getUserProfile,
  updateUserProfile,
  getMission,
  addMission,
  deactivateUser,
} = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");
const { historyMiddleware } = require("../middleware/historyMiddleware");

router
  .route("/")
  .get(protect, admin, getUsers)
  .post(historyMiddleware, registerUser);
router.post("/login", loginUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, admin, historyMiddleware, deleteUser)
  .put(protect, historyMiddleware, deactivateUser)
  .get(protect, admin, getUserById);
router.route("/:id/mission").get(protect, getMission).post(protect, addMission);
router.get("/me", protect, getMe);

module.exports = router;
