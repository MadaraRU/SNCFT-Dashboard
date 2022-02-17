const express = require("express");
const router = express.Router();
const {
  getParc,
  setParc,
  updateParc,
  deleteParc,
} = require("../controllers/parcController");
const { admin, protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, admin, getParc).post(protect, admin, setParc);
router
  .route("/:id")
  .put(protect, admin, updateParc)
  .delete(protect, admin, deleteParc);

// router.get("/", getParc);
// router.post("/", setParc);
// router.put("/:id", updateParc);
// router.delete("/:id", deleteParc);

module.exports = router;
