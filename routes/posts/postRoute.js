const router = require("express").Router();

const {     
    createPost,
    updatePost,
    getPostByUser,
    deletePostByUser
} = require("../../controllers/posts/postCtrl");

const { authMiddleware } = require("../../middleware/authMiddleware");

const multer = require("multer");
const path = require("path");

var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./uploads/");
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({
  storage: storage,
});


router.get("/user", authMiddleware, getPostByUser);
router.post("/add_Post", authMiddleware, createPost);
router.put("/update_Post/:id", authMiddleware, upload.array("image"), updatePost);
router.delete("/delete_post/:id", authMiddleware, deletePostByUser);

module.exports = router;