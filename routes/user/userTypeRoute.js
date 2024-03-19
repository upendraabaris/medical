const router = require("express").Router()

const {getUserType, getUserTypeById, addUserType, updateUserType, deleteUserType, pagination} = require("../../controllers/user/userTypeCtrl")

const {responseSend} = require("../../utils/response")

const {verifyToken} = require("../../middleware/authMiddleware")

router.get('/', verifyToken, getUserType, responseSend)

router.get('/:id', verifyToken, getUserTypeById, responseSend)

router.post('/addUserType', verifyToken, addUserType, responseSend)

router.put('/updateUserType/:id', verifyToken, updateUserType, responseSend)

router.delete('/deleteUserType/:id', verifyToken, deleteUserType, responseSend)

router.get('/page/:page&:count', pagination, responseSend)

module.exports = router