const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  getUsers,
} = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");

router.route("/").get(protect, admin, getUsers).post(registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

module.exports = router;
