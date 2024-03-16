const router = require("express").Router();

const {
  getBlogs,
  createBlogs,
  updateBlogs,
  deleteBlogs,
  getSearchBlogs,
  getallBlogs,
  getBlogsByCateg,
  getBlogPublic
} = require("../../controllers/ecommerce/blogsCtrl");

const { isAdmin, checkDomain }  = require("../../middleware/authMiddleware");

router.get("/", checkDomain, getallBlogs);
router.get("/admin", isAdmin, getallBlogs);
router.get("/categ/:id", checkDomain, getBlogsByCateg);
router.post("/add_Blogs", isAdmin, createBlogs);
router.put("/update_Blogs/:id", isAdmin, updateBlogs);
router.delete("/delete_Blogs/:id", isAdmin, deleteBlogs);
router.get("/:id", checkDomain, getBlogPublic);
router.get("/admin/:id", isAdmin, getBlogs);
router.get("/search/:search", getSearchBlogs);

module.exports = router;
