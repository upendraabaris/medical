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
  updateSellerProfile,
  getDoctorSellerList,
  getHospitalSellerList,
  getFavoriteHospitalSellerList,
  getFavoriteDoctorSellerList,
  toggleFavoriteStatus,
  getSingleSellerDetails
} = require("../../controllers/ecommerce/sellerCtrl");

const {responseSend} = require("../../utils/response")
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

const { checkDomain, isAdmin, /* isSeller */ verifyToken } = require("../../middleware/authMiddleware");

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

router.put('/profile', /* isSeller, */ updateSellerProfile);

router.put(
  "/update_profile_seller",
  checkDomain,
  upload.single("image"),
  updatedSeller
);
router.delete("/delete_Sellers/:id", isAdmin, deleteSeller);
router.get("/admin/:id", isAdmin, getSearchById);
router.get('/getDoctorSellerList', getDoctorSellerList, responseSend)
router.get('/getHospitalSellerList', getHospitalSellerList, responseSend)
router.get('/getDoctorSellerList/public', /* verifyToken, */ getDoctorSellerList, responseSend)
router.get('/getHospitalSellerList/public', /* verifyToken, */ getHospitalSellerList, responseSend)
router.get('/getFavoriteHospitalSellerList', getFavoriteHospitalSellerList)
router.get('/getFavoriteDoctorSellerList', getFavoriteDoctorSellerList)
router.get('/getFavoriteHospitalSellerList/public', getFavoriteHospitalSellerList)
router.get('/getFavoriteDoctorSellerList/public', getFavoriteDoctorSellerList)
router.post('/toggleFavoriteStatus', toggleFavoriteStatus)
router.post('/toggleFavoriteStatus/public', toggleFavoriteStatus)
router.get('/getSingleSellerDetails/public/:usertypeid/:sellerId', getSingleSellerDetails)
router.get('/getSingleSellerDetails/:usertypeid/:sellerId', getSingleSellerDetails)
router.get("/:id", checkDomain, getSearchById);
router.get("/search/:search", checkDomain, getSearchSeller);
router.post("/filter", checkDomain, sortSeller);




module.exports = router;
