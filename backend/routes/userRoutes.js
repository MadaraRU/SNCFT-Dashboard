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
} = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");

router.route("/").get(protect, admin, getUsers).post(registerUser);
router.post("/login", loginUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById);
router.get("/me", protect, getMe);

module.exports = router;
