const router = require("express").Router()

const {getUserRelation, getUserRelationById, addUserRelation, updateUserRelation, deleteUserRelation} = require("../../controllers/user/userRelationCtrl")

const {responseSend} = require("../../utils/response")

router.get('/', getUserRelation, responseSend)

router.get('/:id', getUserRelationById, responseSend)

router.post('/addUserRelation', addUserRelation, responseSend)

router.put('/updateUserRelation/:id', updateUserRelation, responseSend)

router.delete('/deleteUserRelation/:id', deleteUserRelation, responseSend)

module.exports = router