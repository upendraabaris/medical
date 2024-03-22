const router = require("express").Router();

const {
  getCouponList,
  createCoupons,
  updateCoupons,
  deleteCoupons,
  getCouponsById,
  getSearchCoupons,
  getCouponListForUser,
  getCouponCount,
  getActiveCouponCount,
  getActiveCouponList
} = require("../controller/couponsCtrl");

const { isAdmin, checkDomain } = require("../middlewares/authMiddleware");

const path = require("path");
const multer = require("multer");

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



router.get("/", isAdmin, getCouponList);
router.get("/public", checkDomain, getActiveCouponList);
router.get("/user", getCouponListForUser);
router.get("/count", isAdmin,getCouponCount);
router.get("/active/count", isAdmin, getActiveCouponCount);
router.post("/add_Coupons", isAdmin, upload.single('image'), createCoupons);
router.put("/update_Coupons/:id", isAdmin, updateCoupons);
router.delete("/delete_Coupons/:id", isAdmin, deleteCoupons);
router.get("/:id", isAdmin, getCouponsById);
router.get("/search/:search", isAdmin, getSearchCoupons);

module.exports = router;
