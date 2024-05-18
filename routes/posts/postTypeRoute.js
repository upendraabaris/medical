const router = require("express").Router()

const {getPostType, getPostTypeById, addPostType, updatePostType, deletePostType} = require("../../controllers/posts/postTypeCtrl")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware} = require("../../middleware/authMiddleware")

router.get('/', staffMiddleware, getPostType)

router.get('/:id', staffMiddleware, getPostTypeById)

router.post('/addPostType', staffMiddleware, addPostType)

router.put('/updatePostType/:id', staffMiddleware, updatePostType)

router.delete('/deletePostType/:id', staffMiddleware,  deletePostType)

module.exports = router