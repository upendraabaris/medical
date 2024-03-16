const router = require("express").Router();

const {
  updateStatus,
  createReasonDeliveryBoyOrder,
  updateReasonDeliveryBoyOrder,
  deleteReasonDeliveryBoyOrder,
  getReasonDeliveryBoyOrderById,
  listReasonDeliveryBoyOrder,
  listReasonDeliveryBoyOrderByUser,
} = require("../../controllers/ecommerce/cancelDeliveryCtrl");

router.get("/", listReasonDeliveryBoyOrder);
router.get("/customer/:id", listReasonDeliveryBoyOrderByUser);
router.get("/:id", getReasonDeliveryBoyOrderById);
router.post("/addReasonDeliveryBoyOrder", createReasonDeliveryBoyOrder);
router.put("/updateReasonDeliveryBoyOrder/:id", updateReasonDeliveryBoyOrder);
router.delete("/deleteReasonDeliveryBoyOrder/:id", deleteReasonDeliveryBoyOrder);
router.put("/updateStatus/:id", updateStatus);

module.exports = router;
