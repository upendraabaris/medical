const router = require("express").Router();
const {
  searchdeliveryBoy,
  getAlldeliveryBoy,
  getAlldeliveryBoyByPickupPoint,
  getdeliveryBoyById,
  updatedeliveryBoy,
  deletedeliveryBoy,
  createdeliveryBoy,
  deliveryBoyLogin,
  deliveryBoyCount,
} = require("../controller/deliveryBoyCtrl");

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

const { isAdmin } = require("../middlewares/authMiddleware");

router.get("/", isAdmin, getAlldeliveryBoy);
router.get("/dashBoard/:id", deliveryBoyCount);
router.get("/pickupPoint", isAdmin, getAlldeliveryBoyByPickupPoint);
router.get("/:id", isAdmin, getdeliveryBoyById);
router.post("/login",  deliveryBoyLogin);
router.put(
  "/update_deliveryBoy/:id",
  isAdmin,
  upload.single("image"),
  updatedeliveryBoy
);
router.delete("/delete_deliveryBoy/:id", isAdmin, deletedeliveryBoy);
router.post("/add_deliveryBoy", isAdmin, upload.single("image"), createdeliveryBoy);

module.exports = router;
