const router = require("express").Router();

const {
  createPaymentCheckSum,
  test,
  checkout,
  transactionInitialize
} = require("../controllers/paymentGateway");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/payment", verifyToken, createPaymentCheckSum);
router.post("/checkout", checkout);
router.put("/checkout", checkout);
router.post('/transactionInitialize', transactionInitialize)

module.exports = router;
