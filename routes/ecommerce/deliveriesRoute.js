const router = require("express").Router();

const {
  createDeliverys,
  updateDeliverys,
  deleteDeliverys,
  getDeliveryList,
  getDeliverysById,
  getSearchDelivery,
  getDeliveryByOrderId,
  findByAwbOrReferenceNo,
} = require("../controller/deliveriesCtrl");

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

router.get("/", getDeliveryList);
router.get("/order/:id", getDeliveryByOrderId);
router.post("/add_Delivery", upload.single("image"), createDeliverys);
router.put("/update_Delivery/:id", upload.single("image"), updateDeliverys);
router.delete("/delete_Delivery/:id", deleteDeliverys);
router.get("/:id", getDeliverysById);
router.get("/search_Delivery/:search", getSearchDelivery);
router.post("/searchById", findByAwbOrReferenceNo);

module.exports = router;
