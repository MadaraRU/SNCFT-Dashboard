const express = require("express");
const { getAllHistory } = require("../controllers/archiveController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").get(protect, getAllHistory);

module.exports = router;
