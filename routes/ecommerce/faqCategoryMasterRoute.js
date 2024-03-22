const router = require("express").Router();

const {
  getFaqList,
  getFaqListByLang,
  getByIdFaq,
  createFaq,
  updateFaq,
  deleteFaq,
} = require("../controller/faqCatMasterCtrl");

const { checkDomain, isAdmin } = require("../middlewares/authMiddleware");

router.get("/", checkDomain, getFaqList);
router.get("/admin", isAdmin, getFaqList);
router.get("/getFaqListByLang", checkDomain, getFaqListByLang);
router.get("/:id", isAdmin, getByIdFaq);
router.post("/add_faq", isAdmin, createFaq);
router.put("/update_faq/:id", isAdmin, updateFaq);
router.delete("/delete_faq/:id",  isAdmin,deleteFaq);

module.exports = router;
