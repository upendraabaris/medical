const router = require("express").Router();

const {
  updateStatus,
  createReasonCancel,
  updateReasonCancel,
  deleteReasonCancel,
  getReasonCancelById,
  listReasonCancel,
} = require("../../controllers/ecommerce/cancleReasonCtrl");

router.get("/", listReasonCancel);
router.get("/:id", getReasonCancelById);
router.post("/addReasonCancel", createReasonCancel);
router.put("/updateReasonCancel/:id", updateReasonCancel);
router.delete("/deleteReasonCancel/:id", deleteReasonCancel);
router.put("/updateStatus/:id", updateStatus);

module.exports = router;
