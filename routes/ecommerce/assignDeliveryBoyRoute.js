const router = require("express").Router();

const {
  listAssignOrderByDeliveryBoy,
  allAssignOrder,
  assignOrderById,
  createDeliveryBoyOrderAssign,
  allAssignOrderByStatus,
  allAssignOrderByStatusAdmin,
  assignDeliveryBoyDashboard
} = require("../controller/assignDeliveryBoyCtrl");

const { authMiddleware } = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, allAssignOrder);
router.get("/dashboard", authMiddleware, assignDeliveryBoyDashboard);
router.get("/deliveryBoy", authMiddleware, listAssignOrderByDeliveryBoy);
router.get("/:id", authMiddleware, assignOrderById);
router.get("/deliveryBoy/status/:status", authMiddleware, allAssignOrderByStatus);
router.get("/deliveryBoy/statusAll/:id", authMiddleware, allAssignOrderByStatusAdmin);
router.post("/add_AssignDeliveryBoy", authMiddleware, createDeliveryBoyOrderAssign);

module.exports = router;
