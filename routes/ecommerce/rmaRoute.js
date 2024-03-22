const router = require("express").Router();

const {
  updateStatus,
  createRMA,
  updateRMA,
  deleteRMA,
  getRMAById,
  listRMA,
  listByUser,
} = require("../controller/rmaCtrl");

const { authMiddleware, isAdmin, checkDomain } = require("../middlewares/authMiddleware");
 
router.get("/", isAdmin, listRMA);
router.get("/user", authMiddleware, checkDomain, listByUser);
router.get("/:id", authMiddleware, getRMAById);

router.post("/requestRMA", authMiddleware, createRMA);
router.put("/updateRMA/:id", authMiddleware, updateRMA);
router.delete("/deleteRMA/:id", authMiddleware, deleteRMA);
router.put("/updateStatus/:id", authMiddleware, updateStatus);

module.exports = router;
