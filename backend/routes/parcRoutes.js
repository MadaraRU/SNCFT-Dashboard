const express = require("express");
const router = express.Router();
const {
  getParc,
  setParc,
  updateParc,
  deleteParc,
} = require("../controllers/parcController");
const { admin, protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getParc).post(protect, setParc);
router.route("/:id").put(protect, updateParc).delete(protect, deleteParc);

// router.get("/", getParc);
// router.post("/", setParc);
// router.put("/:id", updateParc);
// router.delete("/:id", deleteParc);

module.exports = router;
