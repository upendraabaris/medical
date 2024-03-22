const router = require("express").Router();

const {
  getSellerList,
  createSeller,
  updateSeller,
  deleteSeller,
  getSearchById,
  getSearchSeller,
  getSellerPaginationList,
  sellerLogin,
  updatedSeller,
  sellerCount,
  sellerApprovalStatus,
  publicSellerList,
  sortSeller,
  updateSellerProfile
} = require("../controller/sellerCtrl");

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

const { checkDomain, isAdmin, isSeller } = require("../middlewares/authMiddleware");

router.get("/", checkDomain, getSellerList);
router.get("/admin", isAdmin, getSellerList);
router.get("/page/:id", checkDomain, getSellerPaginationList);
router.get("/count", isAdmin, sellerCount);
router.get("/public", checkDomain, publicSellerList);
router.post("/login", checkDomain, sellerLogin);

router.post("/add_Sellers", checkDomain, upload.single("image"), createSeller);
router.post("/add_Seller", isAdmin, upload.single("image"), createSeller);
router.put("/sellerApprovalStatus/:id", checkDomain, sellerApprovalStatus);
router.put(
  "/update_Sellers/:id",
  checkDomain,
  upload.single("image"),
  updateSeller
);

router.put('/profile', isSeller, updateSellerProfile);

router.put(
  "/update_profile_seller",
  checkDomain,
  upload.single("image"),
  updatedSeller
);
router.delete("/delete_Sellers/:id", isAdmin, deleteSeller);
router.get("/admin/:id", isAdmin, getSearchById);
router.get("/:id", checkDomain, getSearchById);
router.get("/search/:search", checkDomain, getSearchSeller);
router.post("/filter", checkDomain, sortSeller);

module.exports = router;
