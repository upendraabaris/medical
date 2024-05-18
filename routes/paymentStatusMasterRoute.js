const router = require("express").Router();

const {
  getPaymentStatusMasterList,
  createPaymentStatusMasters,
  updatePaymentStatusMasters,
  deletePaymentStatusMasters,
  getPaymentStatusMastersById,
  getSearchPaymentStatusMasters,
} = require("../controller/paymentStatusMasterCtrl");

router.get("/", getPaymentStatusMasterList);
router.post("/add_PaymentStatusMaster", createPaymentStatusMasters);
router.put("/update_PaymentStatusMaster/:id", updatePaymentStatusMasters);
router.delete("/delete_PaymentStatusMaster/:id", deletePaymentStatusMasters);
router.get("/:id", getPaymentStatusMastersById);
router.get("/search_PaymentStatusMaster/:search", getSearchPaymentStatusMasters);

module.exports = router;
