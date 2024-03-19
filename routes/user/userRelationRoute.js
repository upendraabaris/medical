const router = require("express").Router()

const {getUserRelation, getUserRelationById, addUserRelation, updateUserRelation, deleteUserRelation} = require("../../controllers/user/userRelationCtrl")

const {responseSend} = require("../../utils/response")

const {verifyToken} = require("../../middleware/authMiddleware")

router.get('/', verifyToken, getUserRelation, responseSend)

router.get('/:id', verifyToken, getUserRelationById, responseSend)

router.post('/addUserRelation', verifyToken, addUserRelation, responseSend)

router.put('/updateUserRelation/:id', verifyToken, updateUserRelation, responseSend)

router.delete('/deleteUserRelation/:id', verifyToken, deleteUserRelation, responseSend)

module.exports = router