const express = require("express");
const router = express.Router();
const {
  getParc,
  setParc,
  updateParc,
  deleteParc,
} = require("../controllers/parcController");

router.route("/").get(getParc).post(setParc);
router.route("/:id").put(updateParc).delete(deleteParc);

// router.get("/", getParc);
// router.post("/", setParc);
// router.put("/:id", updateParc);
// router.delete("/:id", deleteParc);

module.exports = router;
