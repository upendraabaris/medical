const router = require("express").Router();

const {
  createorderConfigs,
  updateorderConfigs,
  deleteorderConfigs,
  getorderConfigList,
  getorderConfigsById,
} = require("../controller/orderConfigCtrl");

router.get("/", getorderConfigList);
router.post("/add_OrderConfig", createorderConfigs);
router.put("/update_OrderConfig/:id", updateorderConfigs);
router.delete("/delete_OrderConfig/:id", deleteorderConfigs);
router.get("/:id", getorderConfigsById);

module.exports = router;
