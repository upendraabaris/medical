const express = require("express");
const {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrand,
  getallBrand,
  getallBrandByLang,
  getSearchBrand,
  brandCount,
  getBrandPublicList,
  brandUpdateStatus,
} = require("../../controllers/ecommerce/brandCtrl");
const { checkDomain, isAdmin, authMiddleware } = require("../../middleware/authMiddleware");
const router = express.Router();

const multer = require("multer");
const path = require("path");

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

router.post("/addbrand", /* checkDomain, isAdmin, */ upload.single("image"), createBrand);
router.put("/:id", checkDomain, isAdmin, upload.single("image"), updateBrand);
router.put("/activeStatus/:id", isAdmin, checkDomain, brandUpdateStatus);

router.delete("/deletebrand/:id", /* checkDomain, isAdmin, */ deleteBrand);
router.get("/count", checkDomain, brandCount);

router.get("/public", checkDomain, getBrandPublicList);
router.get("/admin", authMiddleware, getallBrand);
router.get("/lang/:id", isAdmin, getallBrandByLang);
router.get("/:id", checkDomain, getBrand);
router.get("/admin/:id", isAdmin, getBrand);
router.get("/", /* checkDomain, */ getallBrand);
router.get("/search/:search", checkDomain, getSearchBrand);

module.exports = router;
