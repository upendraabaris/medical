const router = require("express").Router();

const {
  getorderStatusMasterList,
  getorderStatusMasterById,
  getorderStatusMasterListForDeliveryBoy,
  updateorderDeliveryStatusMaster,
  getSearchorderStatusMaster,
  createorderStatusMaster,
  updateorderStatusMaster,
  deleteorderStatusMaster,
} = require("../../controllers/ecommerce/orderStatusMasterCtrl");

router.get("/", getorderStatusMasterList);
router.get("/delivery", getorderStatusMasterListForDeliveryBoy);
router.post("/add_orderStatusMaster", createorderStatusMaster);
router.put("/update_orderStatusMaster/:id", updateorderStatusMaster);
router.put(
  "/update_deliveryOrderStatusMaster/:id",
  updateorderDeliveryStatusMaster
);
router.delete("/delete_orderStatusMaster/:id", deleteorderStatusMaster);
router.get("/:id", getorderStatusMasterById);
router.get("/search/:search", getSearchorderStatusMaster);

module.exports = router;
