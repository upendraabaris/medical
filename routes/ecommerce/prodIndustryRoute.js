const express = require("express");
const {
  createIndustry,
  updateIndustry,
  deleteIndustry,
  getIndustry,
  getallIndustry,
  parentIndustryList,
  childIndustryList,
  singleFilterIndustryList,
  industryCount,
  updateIndustryStatus,
  publicCategories,
  getIndustryListByLangCateg,
  filterIndustryWithProduct,
  featuredOnlyCat,
  industryDetailPublic
} = require("../../controllers/ecommerce/prodIndustryCtrl");

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

router.get("/admin", authMiddleware, getallIndustry);
router.get("/parent", checkDomain, parentIndustryList);

router.get("/child/:id", checkDomain, childIndustryList);
router.get("/admin/child/:id", isAdmin, childIndustryList);

router.get("/filter", checkDomain, singleFilterIndustryList);
router.get("/public", checkDomain, publicCategories);
router.get("/featured", checkDomain, featuredOnlyCat);

router.get("/filter/categ", checkDomain, filterIndustryWithProduct);

router.post("/child", isAdmin, getIndustryListByLangCateg);
router.post("/public/child", checkDomain, getIndustryListByLangCateg);

router.post(
  "/add_category",
  checkDomain,
  isAdmin,
  upload.fields([{ name: "image" }, { name: "image1" }]),
  createIndustry
);
router.put("/updateStatus/:id", checkDomain, isAdmin, updateIndustryStatus);

router.put(
  "/:id",
  isAdmin,
  upload.fields([{ name: "image" }, { name: "image1" }]),
  updateIndustry
);

router.delete("/:id", isAdmin, deleteIndustry);

router.get("/:id", checkDomain, industryDetailPublic);

router.get("/admin/:id", isAdmin, getIndustry);
router.get("/", checkDomain, getallIndustry);

module.exports = router;
