const router = require("express").Router();

const {
  createOrderTransaction,
  createPurchaseTransaction,
  createInvoicePurchaseTransaction,
  orderTransactionDelete,
  orderTransactionList,
  orderTransactionUpdate,
  getOrderTransactionById,
} = require("../../controllers/ecommerce/orderTransactionCtrl");

router.get("/:id", getOrderTransactionById);
router.get("/list/:id", orderTransactionList);

router.post("/order", createOrderTransaction);
router.post("/purchase", createPurchaseTransaction);
router.post("/invoice", createInvoicePurchaseTransaction);

router.put("/update_Transaction/:id", orderTransactionUpdate);
router.delete("/delete_Transaction/:id", orderTransactionDelete);

module.exports = router;
