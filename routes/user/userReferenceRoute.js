const router = require("express").Router()

const {getUserReference, getUserReferenceById, addUserReference, updateUserReference, deleteUserReference} = require("../../controllers/user/userReferenceCtrl")

const {responseSend} = require("../../utils/response")

const {verifyToken} = require("../../middleware/authMiddleware")

router.get('/', verifyToken, getUserReference, responseSend)

router.get('/:id', verifyToken, getUserReferenceById, responseSend)

router.post('/addUserReference', verifyToken, addUserReference, responseSend)

router.put('/updateUserReference/:id', verifyToken, updateUserReference, responseSend)

router.delete('/deleteUserReference/:id', verifyToken, deleteUserReference, responseSend)

module.exports = router