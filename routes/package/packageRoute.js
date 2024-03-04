const router = require("express").Router();

const {
  createPackage,
  updatePackage,
  getByIdPackage,
  deletePackage,
  getPackageList,
} = require("../controller/packageCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, getPackageList);
router.get("/admin", isAdmin, getPackageList);
router.get("/:id", authMiddleware, getByIdPackage);
router.post("/add_Package", isAdmin, createPackage);
router.put("/update_Package/:id", isAdmin, updatePackage);
router.delete("/delete_Package/:id", isAdmin, deletePackage);

module.exports = router;
