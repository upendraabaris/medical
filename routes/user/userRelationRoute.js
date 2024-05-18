const router = require("express").Router()

const {getUserRelation, getUserRelationById, addUserRelation, updateUserRelation, deleteUserRelation} = require("../../controllers/user/userRelationCtrl")

const {responseSend} = require("../../utils/response")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware, verifyToken} = require("../../middleware/authMiddleware")

router.get('/', staffMiddleware, getUserRelation, responseSend)

router.get('/public', /* verifyToken, */ getUserRelation, responseSend)

router.get('/:id', staffMiddleware, getUserRelationById, responseSend)

router.post('/addUserRelation', /* staffMiddleware, */ addUserRelation, responseSend)

router.put('/updateUserRelation/:id', staffMiddleware, updateUserRelation, responseSend)

router.delete('/deleteUserRelation/:id', staffMiddleware, deleteUserRelation, responseSend)

module.exports = router