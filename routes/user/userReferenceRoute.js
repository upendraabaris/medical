const router = require("express").Router()

const {getUserReference, getUserReferenceById, addUserReference, updateUserReference, deleteUserReference} = require("../../controllers/user/userReferenceCtrl")

const {responseSend} = require("../../utils/response")

router.get('/', getUserReference, responseSend)

router.get('/:id', getUserReferenceById, responseSend)

router.post('/addUserReference', addUserReference, responseSend)

router.put('/updateUserReference/:id', updateUserReference, responseSend)

router.delete('/deleteUserReference/:id', deleteUserReference, responseSend)

module.exports = router