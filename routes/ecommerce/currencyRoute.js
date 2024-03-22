const router = require("express").Router();

const {
  createcurrencys,
  updatecurrencys,
  deletecurrencys,
  getcurrencyList,
  getcurrencysById,
  getSearchCurrency,
} = require("../controller/currencyCtrl");

const { checkDomain, isAdmin, authMiddleware } = require("../middlewares/authMiddleware");

router.get("/", checkDomain, getcurrencyList);

router.get("/admin", authMiddleware, getcurrencyList);

router.post("/add_Currency", isAdmin, createcurrencys);
router.post("/update_Currency/:id", isAdmin, updatecurrencys);
router.put("/update_Currency/:id", isAdmin, updatecurrencys);
router.delete("/delete_Currency/:id", isAdmin, deletecurrencys);
router.get("/:id", checkDomain, getcurrencysById);
router.get("/search_currency/:search", checkDomain, getSearchCurrency);

module.exports = router;
