const router = require("express").Router();

const {
  createPaymentCheckSum,
  test,
  checkout,
  transactionInitialize,
  MedicalConsultantCheckout
} = require("../controllers/paymentGateway");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/payment", verifyToken, createPaymentCheckSum);
router.post("/checkout", checkout);
router.put("/checkout", checkout);
router.post('/medicalorder/checkout', MedicalConsultantCheckout)
router.post('/transactionInitialize', transactionInitialize)

module.exports = router;
