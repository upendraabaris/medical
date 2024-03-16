const router = require("express").Router();

const { createLike } = require("../../controllers/posts/likeCtrl");

const { authMiddleware } = require("../../middleware/authMiddleware");

router.post("/", authMiddleware, createLike);

module.exports = router;