const express = require("express");
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getallCategory,
  getSearchCategory,
  parentCategoryList,
  childCategoryList,
  singleFilterCategoryList,
  categoryCount,
  updateCategoryStatus,
  publicCategories,
  getCategoryListByLangCateg,
  filterCategoryWithProduct,
  featuredOnlyCat,
  categoryDetailPublic
} = require("../../controllers/ecommerce/prodcategoryCtrl");

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

router.get("/admin", authMiddleware, getallCategory);
router.get("/parent", checkDomain, parentCategoryList);

router.get("/child/:id", checkDomain, childCategoryList);
router.get("/admin/child/:id", isAdmin, childCategoryList);

router.get("/filter", checkDomain, singleFilterCategoryList);
router.get("/count", isAdmin, categoryCount);
router.get("/public", checkDomain, publicCategories);
router.get("/featured", checkDomain, featuredOnlyCat);

router.get("/filter/categ", checkDomain, filterCategoryWithProduct);

router.post("/child", isAdmin, getCategoryListByLangCateg);
router.post("/public/child", checkDomain, getCategoryListByLangCateg);

router.post(
  "/add_category",
  checkDomain,
  isAdmin,
  upload.fields([{ name: "image" }, { name: "image1" }]),
  createCategory
);
router.put("/updateStatus/:id", checkDomain, isAdmin, updateCategoryStatus);

router.put(
  "/:id",
  isAdmin,
  upload.fields([{ name: "image" }, { name: "image1" }]),
  updateCategory
);

router.delete("/:id", isAdmin, deleteCategory);

router.get("/:id", checkDomain, categoryDetailPublic);

router.get("/admin/:id", isAdmin, getCategory);
router.get("/", checkDomain, getallCategory);
router.get("/search/:search", checkDomain, getSearchCategory);

module.exports = router;
