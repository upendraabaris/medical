const router = require("express").Router();
const {
  getAlldeliveryBoyTransaction,
  getdeliveryBoyTransactionById,
  updatedeliveryBoyTransaction,
  deletedeliveryBoyTransaction,
  createdeliveryBoyTransaction,
} = require("../controller/deliveryBoyTransactionCtrl");

router.get("/", getAlldeliveryBoyTransaction);
router.get("/:id", getdeliveryBoyTransactionById);
router.put("/update_deliveryBoyTransaction/:id", updatedeliveryBoyTransaction);
router.delete(
  "/delete_deliveryBoyTransaction/:id",
  deletedeliveryBoyTransaction
);
router.post("/add_deliveryBoyTransaction", createdeliveryBoyTransaction);

module.exports = router;
