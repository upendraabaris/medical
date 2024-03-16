const router = require("express").Router();

const {createComment,
    updateComment,
    getComment,
    childComment,
    commentListByUser,
    commentListByUserIdByAdmin,
} = require("../../controllers/posts/commentCtrl");

const { authMiddleware, isAdmin } = require("../../middleware/authMiddleware");

router.get("/post/:id&:page&:count", authMiddleware, getComment);
router.get("/post/child/:postId&:commentId&:page&:count", authMiddleware, childComment);

router.get("/user", authMiddleware, commentListByUser);
router.get("/admin/user/:id", isAdmin, commentListByUserIdByAdmin);

router.post("/add_Comment", authMiddleware, createComment);
router.put("/update_Comment/:id", authMiddleware, updateComment);

module.exports = router;