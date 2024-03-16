const router = require("express").Router()

const {getUserType, getUserTypeById, addUserType, updateUserType, deleteUserType, pagination} = require("../../controllers/user/userTypeCtrl")

const {responseSend} = require("../../utils/response")

router.get('/', getUserType, responseSend)

router.get('/:id', getUserTypeById, responseSend)

router.post('/addUserType', addUserType, responseSend)

router.put('/updateUserType/:id', updateUserType, responseSend)

router.delete('/deleteUserType/:id', deleteUserType, responseSend)

router.get('/page/:page&:count', pagination, responseSend)

module.exports = router