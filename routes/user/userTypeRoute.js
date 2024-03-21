const router = require("express").Router()

const {getUserType, getUserTypeById, addUserType, updateUserType, deleteUserType, pagination} = require("../../controllers/user/userTypeCtrl")

const {responseSend} = require("../../utils/response")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware} = require("../../middleware/authMiddleware")

router.get('/', staffMiddleware, getUserType, responseSend)

router.get('/:id', staffMiddleware, getUserTypeById, responseSend)

router.post('/addUserType', staffMiddleware, addUserType, responseSend)

router.put('/updateUserType/:id', staffMiddleware, updateUserType, responseSend)

router.delete('/deleteUserType/:id', staffMiddleware, deleteUserType, responseSend)

router.get('/page/:page&:count', pagination, responseSend)

module.exports = router