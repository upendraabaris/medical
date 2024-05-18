const express = require("express");
const {
  getOrders,
  updateOrderStatus,
  getAllOrders,
  getOrderById,
  getOrderByUserId,
  getAllOrders_Sellers,
  createOrder,
  createOrderMobile,
  createOrderSingle,
  createorder,
  deleteOrdersById,
  getAllOrderPickupPoints,
  orderFilter,
  orderPickupPointList,
  orderPickupPointListFilter,
  orderSellerListFilter,
  orderCount,
  getOrderReport,
  orderDeliveredCount,
  orderPendingCount,
  orderRejectedCount,
  orderCancelledCount,

  orderPickupRejectedCount,
  orderPickupDeliveredCount,
  orderPendingPickupCount,

  orderPendingPickupPointsCount,
  orderPickupPoiintsRejectedCount,
  orderPickupPointsDeliveredCount,

  orderPickupCancelledCount,
  orderPickupPointsCancelledCount,

  orderPaidPaymentCount,
  orderPartiallyPaidPaymentCount,
  orderPendingPaymentCount,

  orderPickupPaidPaymentCount,
  orderPickupPartiallyPaidPaymentCount,
  orderPickupPendingPaymentCount,

  orderPickupPointsPaidPaymentCount,
  orderPickupPointsPartiallyPaidPaymentCount,
  orderPickupPointsPendingPaymentCount,

  orderShippedCount,
  orderPickupShippedCount,
  orderPickuppointsShippedCount,
  orderPickupPointByIdCount,
  orderPickupPointsCount,

  orderAssign,
  orderInHousePickupPointList,
  getAllInHouseOrderPickupPoints,
  pickupCustomerCount,
  pickupCustomerRevenue,

  getOrderAdminById,
  getAllOrdersFilter,
  getAllOrdersByType
} = require("../../controllers/ecommerce/orderCtrl");

const { checkDomain, authMiddleware, isAdmin, verifyToken, /* isSeller, */ authMiddlewareNotCompulsory } = require("../../middleware/authMiddleware");

const { addMedicalOrder, addMedicalOrderByAdmin, totalExpenses } = require("../../controllers/ecommerce/MedicalOrderCtrl")
const {responseSend} = require("../../utils/response")
const router = express.Router();

router.post("/add_Order", checkDomain, createorder);
router.post("/temp_cart", authMiddlewareNotCompulsory, checkDomain, createOrder);
router.post("/temp_checkout", createOrderMobile);
router.post("/temp_single", createOrderSingle);
router.post("/order_Assign/:id", orderAssign);

router.post("/filter", isAdmin, getAllOrdersFilter);

router.get("/get", getOrders);
router.post("/getallorders", isAdmin, getAllOrders);
router.get("/getOrderPickup", orderInHousePickupPointList);
router.get("/getAllOrderPickup", orderPickupPointList);

router.post("/getallorders/type", isAdmin, getAllOrdersByType);

router.get("/count", isAdmin, orderCount);
router.get("/allPickupPoints/count", isAdmin, orderPickupPointsCount);
router.get("/pickup/count/:id", isAdmin, orderPickupPointByIdCount);

router.get("/delivered/count", isAdmin, orderDeliveredCount);
router.get("/rejected/count", isAdmin, orderRejectedCount);
router.get("/cancel/count", isAdmin, orderCancelledCount);
router.get("/pending/count", isAdmin, orderPendingCount);
router.get("/shipped/count", isAdmin, orderShippedCount);

router.get("/pickupPoint/delivered/count/:id", isAdmin, orderPickupDeliveredCount);
router.get("/pickupPoint/rejected/count/:id", isAdmin, orderPickupRejectedCount);
router.get("/pickupPoint/cancel/count/:id", isAdmin, orderPickupCancelledCount);
router.get("/pickupPoint/pending/count/:id", isAdmin, orderPendingPickupCount);
router.get("/pickupPoint/shipped/count/:id", isAdmin, orderPickupShippedCount);

router.get("/AllPickupPoints/delivered/count", isAdmin, orderPickupPointsDeliveredCount);
router.get("/AllPickupPoints/rejected/count", isAdmin, orderPickupPoiintsRejectedCount);
router.get("/AllPickupPoints/cancel/count", isAdmin, orderPickupPointsCancelledCount);
router.get("/AllPickupPoints/pending/count", isAdmin, orderPendingPickupPointsCount);
router.get("/AllPickupPoints/shipped/count", isAdmin, orderPickuppointsShippedCount);

router.get("/all/paidPayment", isAdmin, orderPaidPaymentCount);
router.get("/all/partiallyPaidPayment", isAdmin, orderPartiallyPaidPaymentCount);
router.get("/all/pendingPayment", isAdmin, orderPendingPaymentCount);

router.get("/allPickup/paidPayment", isAdmin, orderPickupPointsPaidPaymentCount);
router.get(
  "/allPickup/partiallyPaidPayment", isAdmin,
  orderPickupPointsPartiallyPaidPaymentCount
);
router.get("/allPickup/pendingPayment", isAdmin, orderPickupPointsPendingPaymentCount);

router.get("/pickup/paidPayment/:id", isAdmin, orderPickupPaidPaymentCount);
router.get(
  "/pickup/partiallyPaidPayment/:id", isAdmin,
  orderPickupPartiallyPaidPaymentCount
);
router.get("/pickup/pendingPayment/:id", isAdmin, orderPickupPendingPaymentCount);

router.get("/report/:id", getOrderReport);

router.post("/orderSellerListFilter", orderSellerListFilter);
router.post("/orderPickupPointList/filter", orderPickupPointListFilter);

// router.get("/seller_list", isSeller, getAllOrders_Sellers);
router.get("/admin_list", getAllOrders_Sellers);

router.get("/getOrderById/:id", authMiddleware, checkDomain, getOrderById);
router.get("/getOrderById/admin/:id", authMiddleware, getOrderAdminById);
router.get("/getOrderPickup/:id", getAllInHouseOrderPickupPoints);
router.get("/getAllOrderPickup/:id", getAllOrderPickupPoints);

router.get("/getAllOrderPickup/:id", getAllInHouseOrderPickupPoints);
router.get("/getAllOrderPickup/all/:id", getAllOrderPickupPoints);

router.get("/getorderbyuser", authMiddleware, checkDomain, getOrderByUserId);
router.get("/pickupCustomer/count/:id", pickupCustomerCount);
router.get("/pickupCustomer/revenue/:id", pickupCustomerRevenue);
router.put("/order/update-order/:id", updateOrderStatus);
router.delete("/delete_Order/:id", deleteOrdersById);

router.post("/order_filter", orderFilter);

router.post('/medicalorder', /* verifyToken, */ addMedicalOrder, responseSend)
router.post('/medicalorder/admin', /* verifyToken, */ addMedicalOrderByAdmin, responseSend)

router.get('/total-expenses', verifyToken, totalExpenses, responseSend)

module.exports = router;
