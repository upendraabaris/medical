const router = require("express").Router();

const {
  updateStatus,
  createReasonRMA,
  updateReasonRMA,
  deleteReasonRMA,
  getReasonRMAById,
  listReasonRMA,
} = require("../controller/reasonRMACtrl");

router.get("/", listReasonRMA);
router.get("/:id", getReasonRMAById);
router.post("/addReasonRMA", createReasonRMA);
router.put("/updateReasonRMA/:id", updateReasonRMA);
router.delete("/deleteReasonRMA/:id", deleteReasonRMA);
router.put("/updateStatus/:id", updateStatus);

module.exports = router;
