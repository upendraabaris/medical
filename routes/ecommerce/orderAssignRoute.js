const router = require("express").Router();

const {
  listAssignOrderByPickupPoints,
  listAllAssignOrder,
  assignOrderById,
  createOrderAssign,
  allAssignOrder,
  getOrderListByStatusTransactionPickupPoint,
} = require("../controller/orderAssignCtrl");

const { authMiddleware } = require("../middlewares/authMiddleware"); 

router.get("/pickupPoints", authMiddleware, listAssignOrderByPickupPoints);
router.get("/", allAssignOrder);
router.get(
  "/orderStatus/:id&:pick",
  getOrderListByStatusTransactionPickupPoint
);
router.get("/:id", assignOrderById);
router.post("/create", authMiddleware, createOrderAssign);
module.exports = router;
