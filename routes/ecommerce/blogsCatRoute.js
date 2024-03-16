const router = require("express").Router();

const {
  createblogsCat,
  updateblogsCat,
  deleteblogsCat,
  getblogsCat,
  getallblogsCat,
  getallblogsCatByLang,
  getSearchblogsCat,
  blogsCatCount,
  getblogsCatPublicList,
  blogsCatUpdateStatus,
} = require("../../controllers/ecommerce/blogsCatCtrl");

const  { authMiddleware, isAdmin, checkDomain } = require("../../middleware/authMiddleware");

router.get("/", checkDomain, getallblogsCat);
router.post("/add_blogCat", isAdmin, createblogsCat);
router.put("/update_blogCat/:id", isAdmin, updateblogsCat);
router.delete("/delete_blogCat/:id", authMiddleware, deleteblogsCat);
router.get("/:id", isAdmin, getblogsCat);
router.get("/search_blogCat/:search", isAdmin, getSearchblogsCat);

module.exports = router;
