const router = require("express").Router();

const {
  createPackagePayment,
  updatePackagePayment,
  getPackageById,
  getPackagePaymentList,
  deletePackagePayment,
  packagePaymentListByUser,
  getPackageByIdAdmin,
  packageStatusUpdate,
  packagePaymentListByUserId
} = require("../controller/packagePaymentCtrl");

const path = require("path");
const multer = require("multer");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./uploads/");
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({
  storage: storage,
});

router.get("/", isAdmin, getPackagePaymentList);
router.get("/public", authMiddleware, packagePaymentListByUser);
router.get("/user/:id", isAdmin, packagePaymentListByUserId);
router.get("/admin/:id", isAdmin, getPackageByIdAdmin);
router.get("/:id", isAdmin, getPackageById);
router.post(
  "/add_PackagePayment",
  authMiddleware,
  upload.single("image"),
  createPackagePayment
);
router.put("/update_PackageStatus/:id", isAdmin, packageStatusUpdate);
router.put("/update_Package/:id", isAdmin, updatePackagePayment);
router.delete("/delete_Package/:id", isAdmin, deletePackagePayment);

module.exports = router;
