const router = require("express").Router()

const {getUser, getUserById, addUser, updateUser, deleteUser} = require("../../controllers/user/userCtrl")

router.get('/', getUser)

router.get('/:id', getUserById)

router.post('/adduser', addUser)

router.put('/updateuser/:id', updateUser)

router.delete('/deleteuser/:id', deleteUser)

module.exports = router