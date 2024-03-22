const router = require("express").Router();

const {
  getFaqsList,
  getFaqsListByLang,
  getFaqsByCategory,
  getByIdFaqs,
  createFaqs,
  updateFaqs,
  deleteFaqs,
} = require("../controller/faqsCtrl");

const { checkDomain, isAdmin } = require("../middlewares/authMiddleware");

router.get("/", checkDomain, getFaqsList);
router.get("/admin", isAdmin, getFaqsList);
router.get("/categ/:id", checkDomain, getFaqsByCategory);
router.get("/getFaqsListByLang", checkDomain, getFaqsListByLang);
router.get("/:id", isAdmin, getByIdFaqs);
router.post("/add_faq", isAdmin, createFaqs);
router.put("/update_faqs/:id", isAdmin, updateFaqs);
router.delete("/delete_faqs/:id",  isAdmin,deleteFaqs);

module.exports = router;
