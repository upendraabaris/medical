const router = require("express").Router()

const {getUser, getUserById, addUser, updateUser, deleteUser, pagination, addToFavorites} = require("../../controllers/user/userCtrl")

const {responseSend} = require("../../utils/response")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware} = require("../../middleware/authMiddleware")

router.get('/', staffMiddleware, getUser, responseSend)

router.get('/:id',staffMiddleware, getUserById, responseSend)

router.post('/adduser', staffMiddleware, addUser, responseSend)

router.put('/updateuser/:id', staffMiddleware, updateUser, responseSend)

router.delete('/deleteuser/:id', staffMiddleware, deleteUser, responseSend)

router.get('/page/:page&:count', pagination, responseSend)

router.post('/addToFavorites', staffMiddleware, addToFavorites, responseSend)

module.exports = router