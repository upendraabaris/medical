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
  getSingleSellerDetails,
  getSellerDetailsByTypes,
  getDoctorSellerListBySearch,
  getDoctorSellerList1,
  getStarDoctorSellerList,
  getSellerListByTypes,
  getSellerListByParentId,
  getSellerListByCityAndPostal,
  getSellerListByCityAndPostalAndInstitution,
  getDoctorSellerListByParentId
} = require("../../controllers/ecommerce/sellerCtrl");

const {responseSend} = require("../../utils/response")

// const {staffMiddleware} = require("../../middleware/authMiddleware")
// const path = require("path");
// const multer = require("multer");

// var storage = multer.diskStorage({
//   destination: (req, file, callBack) => {
//     callBack(null, "./uploads/");
//   },
//   filename: (req, file, callBack) => {
//     callBack(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

// var upload = multer({
//   storage: storage,
// });
const { addImage1, downloadDoc} = require("../../controllers/cloudinaryCtrl")

const multer = require("multer");
const path = require("path");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/gif": "gif"
};

var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    // const isValid = MIME_TYPE_MAP[file.mimetype];
    // var error = new Error("Invalid mime type");
    // if (isValid) {
    //   error = null;
    // }
    // callBack(error, "./uploads/");
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


const { checkDomain, isAdmin, /* isSeller */ verifyToken, staffMiddleware } = require("../../middleware/authMiddleware");

router.get("/", checkDomain, getSellerList);
router.get("/admin", isAdmin, getSellerList);
router.get("/page/:id", checkDomain, getSellerPaginationList);
router.get("/count", isAdmin, sellerCount);
router.get("/public", checkDomain, publicSellerList);
router.post("/login", checkDomain, sellerLogin);

router.post("/add_Sellers", /* checkDomain, */  upload.single("image"),staffMiddleware, createSeller);
router.post("/add_Seller", isAdmin, upload.single("image"), createSeller);
router.put("/sellerApprovalStatus/:id", checkDomain, sellerApprovalStatus);
router.put(
  "/update_Sellers/:id",
  checkDomain,
  upload.single("image"),
  updateSeller
);

router.put('/profile/:id', /* isSeller, */ updateSellerProfile);

// router.put(
  //   "/update_profile_seller/:id",
  //   checkDomain,
  //   upload.single("image"),
  //   updatedSeller
  // );
  router.get('/getSellerListByInstitution/get/:sellerType', getSellerListByCityAndPostalAndInstitution, responseSend)
  router.get('/getSellerListByCityAndPostal/get/:sellerType', getSellerListByCityAndPostal, responseSend)
  router.get('/getSellerListByParentId/:parent_id', getSellerListByParentId, responseSend)
router.get('/getStarDoctorSellerList', getStarDoctorSellerList, responseSend)
router.delete("/delete_Sellers/:id", isAdmin, deleteSeller);
router.get("/admin/:id", isAdmin, getSearchById);
router.get('/getDoctorSellerList', getDoctorSellerList, responseSend)
router.post('/getDoctorSellerListBySearch', getDoctorSellerListBySearch, responseSend)
router.get('/getHospitalSellerList', getHospitalSellerList, responseSend)
router.get('/getDoctorSellerList/public', /* verifyToken, */ getDoctorSellerList, responseSend)
router.get('/getHospitalSellerList/public', /* verifyToken, */ getHospitalSellerList, responseSend)
router.get('/getFavoriteHospitalSellerList', getFavoriteHospitalSellerList)
router.get('/getFavoriteDoctorSellerList', getFavoriteDoctorSellerList)
router.get('/getFavoriteHospitalSellerList/public', getFavoriteHospitalSellerList)
router.get('/getFavoriteDoctorSellerList/public', getFavoriteDoctorSellerList)
router.post('/toggleFavoriteStatus', toggleFavoriteStatus)
router.post('/toggleFavoriteStatus/public', toggleFavoriteStatus)
router.get('/getSingleSellerDetails/public/:usertypeid/:sellerId', getSingleSellerDetails, responseSend)
router.get('/getSingleSellerDetails/:sellerId', getSingleSellerDetails, responseSend)
router.get('/getSellerDetailsByTypes/:usertypeid', getSellerDetailsByTypes, responseSend)
router.get("/:id", checkDomain, getSearchById, responseSend);
router.get("/search/:search", checkDomain, getSearchSeller);
router.post("/filter", checkDomain, sortSeller);

router.post("/addImage1", upload.single("image"), addImage1)
router.get("/downloadDoc/:filename", /* upload.single("image"), */ downloadDoc)

// router.get('/type/:sellerType', getSellerListByTypes, responseSend)
router.get('/type/get', getSellerListByTypes, responseSend)

router.get('/getDoctorSellerListByParentId/:id', getDoctorSellerListByParentId, responseSend)




module.exports = router;
