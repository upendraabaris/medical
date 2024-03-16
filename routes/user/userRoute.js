const router = require("express").Router()

const {getUser, getUserById, addUser, updateUser, deleteUser, pagination, addToFavorites} = require("../../controllers/user/userCtrl")

const {responseSend} = require("../../utils/response")

const {verifyToken} = require("../../middleware/authMiddleware")

router.get('/', verifyToken, getUser, responseSend)

router.get('/:id',verifyToken, getUserById, responseSend)

router.post('/adduser', verifyToken, addUser, responseSend)

router.put('/updateuser/:id', verifyToken, updateUser, responseSend)

router.delete('/deleteuser/:id', verifyToken, deleteUser, responseSend)

router.get('/page/:page&:count', pagination, responseSend)

router.post('/addToFavorites', verifyToken, addToFavorites, responseSend)

module.exports = router