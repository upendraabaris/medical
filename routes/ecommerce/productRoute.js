const express = require("express");
const {
  createProduct,
  createProductDiamond,
  updateProduct,
  getProduct,
  getAllProduct,
  deleteProduct,
  getaFeaturedProduct,
  searchProduct,
  getFilterProduct,
  getAllProductAdmin,
  getSellerProductList,
  getFilterProductByCat,
  getFilterProductByBrand,
  updateProductFeature,
  updateSellerProductFeature,
  getAllProductPagination,
  addProductVariationForm,
  trendingSearches,
  getAllSellerProductList,
  getProductAdmin,
  flashDealsList,
  productCount,
  updateActiveStatus,
  sortProducts,
  sortProductsByCategory,
  getProductPrice,
  variationPriceUpdate,
  productUnderPrice,
  jewelProduct,
  jewelProductGetById,
  updateProductDiamond,
  productDiamonFilter,
  isProductNameExist,
  isProductSlugExist,
  diamondProductDelete,
  jewelProductFilterAdmin,
  getProductJewelPublic
} = require("../../controllers/ecommerce/productCtrl");

const {
  checkDomain,
  isAdmin,
  authMiddlewareNotCompulsory,
  authMiddleware,
} = require("../../middleware/authMiddleware");
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

router.get("/underPrice", checkDomain, productUnderPrice);

router.get("/jewel/admin", isAdmin, jewelProduct);

router.get("/jewel/admin/:id", isAdmin, jewelProductGetById);
router.delete("/jewel/admin/delete/:id", isAdmin, diamondProductDelete)

router.get("/checkName/:name", authMiddleware, isProductNameExist);
router.get("/checkSku/:name", authMiddleware, isProductNameExist);
router.get("/checkSlug/:name", authMiddleware, isProductSlugExist);

router.get("/jewel/public/:id", checkDomain, getProductJewelPublic);

router.post("/jewel/filter", checkDomain, productDiamonFilter)
router.post("/jewel/admin/filter", checkDomain, jewelProductFilterAdmin)

router.post("/form_variation", addProductVariationForm);
router.post("/variation_cost", variationPriceUpdate);

router.post("/addDiamondProduct", isAdmin, createProductDiamond);

router.post(
  "/add_product",
  authMiddleware,
  upload.fields([{ name: "thumbnail_image" }, { name: "gallery_image" }]),
  createProduct
);

router.put("/approveStatus/:id", isAdmin, updateActiveStatus);

router.put(
  "/:id",
  authMiddleware,
  upload.fields([{ name: "thumbnail_image" }, { name: "gallery_image" }]),
  updateProduct
);

router.put("/updateDiamondProduct/:id", isAdmin, updateProductDiamond);

router.delete("/:id", isAdmin, deleteProduct);
router.post("/filter", checkDomain,getFilterProduct);

router.get("/trendingSearches", checkDomain, trendingSearches);
router.get("/page/:id&:count", checkDomain, getAllProductPagination);
router.get("/", checkDomain, getAllProduct);
router.get("/admin", authMiddleware, getAllProductAdmin);
router.get("/search/:search", checkDomain, searchProduct);
router.get("/admin/search/:search", isAdmin, searchProduct);
router.get("/featured", checkDomain, getaFeaturedProduct);
router.get("/seller_products", checkDomain, getAllSellerProductList);
router.get("/seller_products/:id", checkDomain, getSellerProductList);
router.get("/category/:id", checkDomain, getFilterProductByCat);
router.get("/admin/category/:id", isAdmin, getFilterProductByCat);
router.get("/brand/:id", checkDomain, getFilterProductByBrand);
router.get("/count", isAdmin, productCount);
router.get(
  "/productprice/:id&:variant&:sku&:seller&:qty",
  checkDomain,
  getProductPrice
);

router.get("/sort/category/:id&:categ", checkDomain, sortProductsByCategory);

router.get("/sort/:id", checkDomain, sortProducts);

router.get("/public/:id",   authMiddlewareNotCompulsory, checkDomain, getProduct);

router.get("/flashDeals", checkDomain, flashDealsList);

router.get("/:id", authMiddleware, getProductAdmin);

router.put("/featured/:id", checkDomain, updateProductFeature);
router.put("/featured-seller/:id", checkDomain, updateSellerProductFeature);

module.exports = router;
