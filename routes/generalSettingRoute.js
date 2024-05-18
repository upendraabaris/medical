const router = require("express").Router();

const {
  creategeneralSettings,
  updategeneralSettings,
  deletegeneralSettings,
  getGeneralSettingList,
  getgeneralSettingsById,
  getPrefixgeneralSettingsById,
  updatePrefixgeneralSettingsById,
  getProductgeneralSettingsById,
  updateProductgeneralSettingsById,
  getMoneyAndNumberFormatgeneralSettingsById,
  updateMoneyAndNumberFormatgeneralSettingsById,
  getSitConfiggeneralSettingsById,
  updateSitConfiggeneralSettingsById,
  getSalegeneralSettingsById,
  updateSalegeneralSettingsById,
  getAwardPointsgeneralSettingsById,
  updateAwardPointsgeneralSettingsById,
  getEmailgeneralSettingsById,
  updateEmailgeneralSettingsById,
  getWeightSalegeneralSettingsById,
  updateWeightSalegeneralSettingsById,
} = require("../controllers/generalSettingCtrl");

const { isAdmin } = require("../middleware/authMiddleware");

router.get("/", getGeneralSettingList);

router.get("/award", isAdmin, getAwardPointsgeneralSettingsById);
router.put("/award", isAdmin, updateAwardPointsgeneralSettingsById);

router.get("/email", isAdmin, getEmailgeneralSettingsById);
router.put("/email", isAdmin, updateEmailgeneralSettingsById);


router.get("/weight", isAdmin, getWeightSalegeneralSettingsById);
router.put("/weight", isAdmin, updateWeightSalegeneralSettingsById);

router.get("/prefix", isAdmin, getPrefixgeneralSettingsById);
router.put("/prefix", isAdmin, updatePrefixgeneralSettingsById);

router.get("/product", isAdmin, getProductgeneralSettingsById);
router.put("/product", isAdmin, updateProductgeneralSettingsById);

router.get("/moneyAndNumberFormat", isAdmin, getMoneyAndNumberFormatgeneralSettingsById);
router.put(
  "/moneyAndNumberFormat", isAdmin,
  updateMoneyAndNumberFormatgeneralSettingsById
);

router.get("/siteConfig", isAdmin, getSitConfiggeneralSettingsById);
router.put("/siteConfig", isAdmin, updateSitConfiggeneralSettingsById);

router.get("/sales", isAdmin, getSalegeneralSettingsById);
router.put("/sales", isAdmin, updateSalegeneralSettingsById);

router.post("/add_generalSetting", /* isAdmin, */ creategeneralSettings);
router.put("/update_generalSetting/:id", isAdmin, updategeneralSettings);
router.delete("/delete_generalSetting/:id", isAdmin, deletegeneralSettings);
router.get("/:id", isAdmin, getgeneralSettingsById);

module.exports = router;
