const router = require("express").Router()

const {getUserRole, getUserRoleById, addUserRole, updateUserRole, deleteUserRole} = require("../../controllers/user/userRoleCtrl")

const {responseSend} = require("../../utils/response")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware} = require("../../middleware/authMiddleware")

router.get('/', staffMiddleware, getUserRole, responseSend)

router.get('/:id', staffMiddleware, getUserRoleById, responseSend)

router.post('/addUserRole', staffMiddleware, addUserRole, responseSend)

router.put('/updateUserRole/:id', staffMiddleware, updateUserRole, responseSend)

router.delete('/deleteUserRole/:id', staffMiddleware, deleteUserRole, responseSend)

// router.get('/page/:page&:count', pagination, responseSend)

module.exports = router