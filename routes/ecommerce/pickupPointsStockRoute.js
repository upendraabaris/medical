const router = require("express").Router();

const {
  createPickupPointsStock,
  updatePickupPointsStock,
  deletePickupPointsStock,
  getByIdPickupPointsStock,
  getPickupPointsStock,
  getPickupPointsBySellerId,
  getPickupPointsByStaffId,
  productWiseFiltering,
  productWisePickupPointsList,
  productReport,
  damageControlStock,
  transferProductStock,
  transferCreditProductStock,
  transferDebitProductStock,
  damageProductStockReport,
} = require("../controller/pickupPoint_stockCtrl");

router.get("/", getPickupPointsStock);
router.get("/seller/:id", getPickupPointsBySellerId);
router.get("/staff/:id", getPickupPointsByStaffId);

router.get("/Product_Report", productReport);
router.get("/transferCreditStock/:from&:to", transferCreditProductStock);
router.get("/transferDebitStock/:from&:to", transferDebitProductStock);
router.get("/damageProductStock/:from&:to", damageProductStockReport);

router.post("/product", productWiseFiltering);
router.post("/product/stock", productWisePickupPointsList);

router.post("/transfer", transferProductStock);

router.post("/damage_stock", damageControlStock);

router.get("/:id", getByIdPickupPointsStock);
router.post("/add_PickupStock", createPickupPointsStock);
router.put("/update_PickupStock/:id", updatePickupPointsStock);
router.delete("/delete_PickupStock/:id", deletePickupPointsStock);

module.exports = router;
