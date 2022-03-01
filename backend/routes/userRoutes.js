const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  getUsers,
  deleteUser,
} = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");

router.route("/").get(protect, admin, getUsers).post(registerUser);
router.route("/:id").delete(protect, admin, deleteUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

module.exports = router;
