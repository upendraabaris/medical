const router = require("express").Router()

const {getUserReference, getUserReferenceById, addUserReference, updateUserReference, deleteUserReference} = require("../../controllers/user/userReferenceCtrl")

const {responseSend} = require("../../utils/response")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware} = require("../../middleware/authMiddleware")

router.get('/', staffMiddleware, getUserReference, responseSend)

router.get('/:id', staffMiddleware, getUserReferenceById, responseSend)

router.post('/addUserReference', staffMiddleware, addUserReference, responseSend)

router.put('/updateUserReference/:id', staffMiddleware, updateUserReference, responseSend)

router.delete('/deleteUserReference/:id', staffMiddleware, deleteUserReference, responseSend)

module.exports = router