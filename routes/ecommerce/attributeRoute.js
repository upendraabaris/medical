const router = require("express").Router();

const {
  getattributeList,
  getattributeListByLang,
  createattribute,
  updateattribute,
  deleteattribute,
  getSearchattribute,
  getattributeById,
  attributeCount,
} = require("../../controllers/ecommerce/attributeCtrl");

const { checkDomain, isAdmin, authMiddleware } = require("../../middleware/authMiddleware");

router.get("/", checkDomain, getattributeList);
router.get("/admin", authMiddleware, getattributeList);
router.get("/lang/:id", isAdmin, getattributeListByLang);
router.get("/count", checkDomain, attributeCount);
router.post("/add_attributes", isAdmin, createattribute);
router.put("/update_attributes/:id", isAdmin, updateattribute);
router.delete("/delete_attributes/:id", checkDomain, deleteattribute);
router.get("/:id", isAdmin, getattributeById);
router.get("/search_attribute/:search", checkDomain, getSearchattribute);

module.exports = router;
