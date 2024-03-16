const router = require("express").Router();

const {
  updateStatus,
  createReasonOrder,
  updateReasonOrder,
  deleteReasonOrder,
  getReasonOrderById,
  listReasonOrder,
  listReasonOrderByUser,
} = require("../../controllers/ecommerce/cancelOrderCtrl");

const { authMiddleware, isAdmin } = require("../../middleware/authMiddleware");

router.get("/", isAdmin, listReasonOrder);
router.get("/customer", authMiddleware, listReasonOrderByUser);
router.get("/:id", authMiddleware, getReasonOrderById);
router.post("/addReasonOrder", authMiddleware, createReasonOrder);
router.put("/updateReasonOrder/:id", authMiddleware, updateReasonOrder);
router.delete("/deleteReasonOrder/:id", authMiddleware, deleteReasonOrder);
router.put("/updateStatus/:id", authMiddleware, updateStatus);

module.exports = router;
