const router = require("express").Router();

const {
  createdeliveryConfigs,
  updatedeliveryConfigs,
  deletedeliveryConfigs,
  getdeliveryConfigList,
  getdeliveryConfigsById,
  getSearchdeliveryConfig,
  getNotificationdeliveryConfigsById,
  updateNotificationdeliveryConfigsById,
  getPaymentdeliveryConfigsById,
  updatePaymentdeliveryConfigsById,
  getPickupdeliveryConfigsById,
  updatePickupdeliveryConfigsById,
} = require("../controller/deliveryConfigCtrl");

router.get("/", getdeliveryConfigList);
router.get("/notification", getNotificationdeliveryConfigsById);
router.put("/notification", updateNotificationdeliveryConfigsById);
router.get("/payment", getPaymentdeliveryConfigsById);
router.put("/payment", updatePaymentdeliveryConfigsById);
router.get("/pickup", getPickupdeliveryConfigsById);
router.put("/pickup", updatePickupdeliveryConfigsById);

router.post("/add_deliveryConfig", createdeliveryConfigs);
router.put("/update_deliveryConfig", updatedeliveryConfigs);

module.exports = router;
