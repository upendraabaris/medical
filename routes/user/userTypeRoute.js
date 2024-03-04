const router = require("express").Router()

const {getUserType, getUserTypeById, addUserType, updateUserType, deleteUserType} = require("../../controllers/user/userTypeCtrl")

router.get('/', getUserType)

router.get('/:id', getUserTypeById)

router.post('/addUserType', addUserType)

router.put('/updateUserType/:id', updateUserType)

router.delete('/deleteUserType/:id', deleteUserType)

module.exports = router