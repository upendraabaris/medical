const router = require("express").Router();

const {
  getattributeSetMasterList,
  getattributeSetMasterListByLang,
  createattributeSetMaster,
  updateattributeSetMaster,
  deleteattributeSetMaster,
  getSearchattributeSetMaster,
  getattributeSetMasterById,
  attributeSetMasterCount,
  attributeSetMasterSelectByCateg,
} = require("../../controllers/ecommerce/attributeSetMasterCtrl");

const { checkDomain, isAdmin, authMiddleware } = require("../../middleware/authMiddleware");

router.get("/", isAdmin, getattributeSetMasterList);
router.get("/admin", authMiddleware, getattributeSetMasterList);
router.get("/lang/:id", isAdmin, getattributeSetMasterListByLang);
router.get("/count", checkDomain, attributeSetMasterCount);
router.post("/categ/get", checkDomain, attributeSetMasterSelectByCateg);
router.post("/add_attributeSetMasters", isAdmin, createattributeSetMaster);
router.put(
  "/update_attributeSetMasters/:id",
  isAdmin,
  updateattributeSetMaster
);
router.delete(
  "/delete_attributeSetMasters/:id",
  isAdmin,
  deleteattributeSetMaster
);
router.get("/:id", isAdmin, getattributeSetMasterById);
router.get(
  "/search_attributeSetMaster/:search",
  checkDomain,
  getSearchattributeSetMaster
);

module.exports = router;
