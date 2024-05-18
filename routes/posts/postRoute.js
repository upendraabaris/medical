const router = require("express").Router();

const {     
    createPost,
    updatePost,
    getPostByUser,
    // deletePostByUser,
    getPost,
    deletePost,
    countPostView
} = require("../../controllers/posts/postCtrl");

const { authMiddleware, staffMiddleware, verifyToken } = require("../../middleware/authMiddleware");

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
router.put("/updatePost/:id", staffMiddleware, upload.array("image"), updatePost);
router.delete("/deletePost/:id", staffMiddleware, deletePost);

router.post("/addPost", staffMiddleware, createPost);
router.get("/getPost", staffMiddleware, getPost);

router.get("/public/getPost", verifyToken, getPost);
router.get("/public/views/:postId", /* verifyToken, */ countPostView)
module.exports = router;