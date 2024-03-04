const express = require("express");
const {
  createBanner,
  updateBanner,
  getBanner,
  getAllBanner,
  deleteBanner,
  getaFeaturedBanner,
  publicBannerList,
  updateBannerStatus,
} = require("../../controllers/ecommerce/bannerCtrl");

const { checkDomain, isAdmin } = require("../../middleware/authMiddleware");

const path = require("path");
const multer = require("multer");

const router = express.Router();

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

router.post("/add", isAdmin, upload.single("image"), createBanner);
router.put("/updateStatus/:id", isAdmin, updateBannerStatus);
router.put("/update/:id", isAdmin, upload.single("image"), updateBanner);
router.delete("/:id", isAdmin, deleteBanner);

router.get("/", checkDomain, getAllBanner);
router.get("/admin", isAdmin, getAllBanner);

router.get("/public", checkDomain, publicBannerList);
router.get("/:id", isAdmin, getBanner);
router.get("/feature", checkDomain, getaFeaturedBanner);

module.exports = router;