const {
  getBrandSellersList,
  getBrandSellersById,
  createBrandSellers,
  updateBrandSellers,
  deleteBrandSellers,
  updateBrandSellerApproval,
  getBrandSellerListBySeller,
} = require("../controller/brandSellerCtrl");
const router = require("express").Router();

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

router.get("/", getBrandSellersList);
router.get("/seller/:id", getBrandSellerListBySeller);
router.get("/:id", getBrandSellersById);
router.post(
  "/add_Request",
  upload.fields([{ name: "logo" }, { name: "attachments" }]),
  createBrandSellers
);
router.put(
  "/update_Request/:id",
  upload.fields([{ name: "logo" }, { name: "attachments" }]),
  updateBrandSellers
);
router.put("/updateApproval/:id", updateBrandSellerApproval);
router.delete("/delete_Request/:id", deleteBrandSellers);

module.exports = router;
