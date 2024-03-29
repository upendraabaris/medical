const router = require("express").Router()

const {getUser, getUserById, addUser, updateUser, deleteUser, pagination, addToFavorites, addFamilyMember, getFamilyMembers, deleteFamilyMember} = require("../../controllers/user/userCtrl")

const {responseSend} = require("../../utils/response")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware, verifyToken} = require("../../middleware/authMiddleware")

router.get('/', /* staffMiddleware, */ getUser, responseSend)

// router.get('/getFamilyMembers', verifyToken, getFamilyMembers, responseSend)

router.get('/:id',staffMiddleware, getUserById, responseSend)

router.post('/adduser', staffMiddleware, addUser, responseSend)

router.post('/adduser', staffMiddleware, addUser, responseSend)

router.post('/adduser/public', addUser, responseSend)

router.put('/updateuser/:id', staffMiddleware, updateUser, responseSend)

router.delete('/deleteuser/:id', staffMiddleware, deleteUser, responseSend)

router.get('/page/:page&:count', pagination, responseSend)

// router.post('/addToFavorites', staffMiddleware, addToFavorites, responseSend)
router.post('/addToFavorites', verifyToken, addToFavorites, responseSend)

router.post('/addfamily/public', verifyToken, addFamilyMember)

router.get('/getFamilyMembers/:parentId', verifyToken, getFamilyMembers)

router.delete('/deleteFamilyMember/:memberId', verifyToken, deleteFamilyMember)

module.exports = router