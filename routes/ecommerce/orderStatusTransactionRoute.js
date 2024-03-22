const router = require("express").Router();

const {
  getOrderStatusList,
  getOrderStatusById,
  getSearchOrderStatus,
  createOrderStatus,
  updateOrderStatus,
  deleteOrderStatus,
  createPurchaseStatus,
  getOrderListByStatusTransaction,
  getOrderListByStatusTransactionPickupPoint,
  getOrderAssignListByStatusTransactionPickupPoint,
  getOrderFilterByUser,
} = require("../controller/orderStatusTransactionCtrl");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router.get("/", getOrderStatusList);

router.get("/filter/user/:id", authMiddleware, getOrderFilterByUser);

router.get(
  "/orderStatus/:id&:pick",
  getOrderListByStatusTransactionPickupPoint
);
router.get(
  "/orderAssignStatus/:id&:pick",
  getOrderAssignListByStatusTransactionPickupPoint
);

router.get("/orderStatus/:id", isAdmin, getOrderListByStatusTransaction);

router.post("/add_OrderStatusTrans", authMiddleware, createOrderStatus);
router.post("/add_PurchaseStatus", createPurchaseStatus);
router.put("/update_OrderStatusTrans/:id", updateOrderStatus);
router.delete("/delete_OrderStatusTrans/:id", deleteOrderStatus);
router.get("/:id", getOrderStatusById);
router.get("/search/:search", getSearchOrderStatus);

module.exports = router;
